Template.posts.helpers({

  isLang: function(){

    if(this.language == undefined){
      return false
    } else {
      return true;
    }

  },

  setLang: function(){

  },

  //languageSelect: function(){
  //
  //  var langs = [
  //    { "code": "en", "name": "English"},
  //    { "code": "ar", "name": "Arabic"},
  //    { "code": "es", "name": "Spanish"},
  //    { "code": "fr", "name": "French"},
  //    { "code": "de", "name": "German"}
  //  ];
  //
  //  return langs;
  //
  //},

  postItems: function(){

    var s = Session.get('filter.time');

    if(s != undefined){
      console.log(s, "is undefined")
      var x = Posts.find({"createdAt" : {
        $lte: moment(Session.get('filter.time')).add('1','d').format("YYYY-MM-DD"),
        $gt: moment(Session.get('filter.time')).subtract('1','d').format("YYYY-MM-DD")
      }}).fetch();

      Session.set('dataset', x);

    } else {

      var x = Posts.find({},{ limit: 50 }).fetch();

      Session.set('dataset', x);

    }

    return x;

  },

  isTextSelected: function(){

    var x = Session.get('text.selection');

    if( x != undefined){

      if (x.id == this._id){
        return true;
      }

    } else {

      return false;

    }

  },

  selectedText: function(){

    return Session.get('text.selection');
  }

});

Template.posts.events({

  'click .setLang': function(e){
    console.log('clicked setLang', e, arguments)
  },

  'click .langDropDown': function(e, template){
    //e.preventDefault();
    console.log('button clicked', this, e.target.id);

    var d = { $set : { "language.code" : e.target.id } };

    Meteor.call('updatePost', this, d, function(err,res){
     console.log('call updatePost', err,res);
    })

  },

  'click #postContent': function(e, t) {

    console.log ('mouseup' , this);

    var text = "";

    if (window.getSelection().toString().length > 0) {
      text = window.getSelection().toString();
      Session.set('text.selection', { text: text, id: this._id } );
    } else {
      Session.set('text.selection', undefined );
    }
  },

  'click .entityDropDownForm': function(e){
    e.stopPropagation();
  },

  'submit form': function(e){

    e.preventDefault();

    var entity = {
      name: $(e.target).find('[name=name]').val(),
      description: $(e.target).find('[name=description]').val(),
      categories: []
    };

    _.map(e.target, function(e){ e.type=='checkbox' && e.checked ? entity.categories.push(e.value) : "false" });

    console.log(entity);

    if(entity.name != ""){
      Meteor.call("insertEntity", entity, function(err,res){
          $('#entityDropDownForm').dropdown('toggle');
      });

    } else {
      console.error('Cannot submit new Entity without a NAME')
    }

  } // submit form

});