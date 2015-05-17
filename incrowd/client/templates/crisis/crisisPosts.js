Template.crisisPosts.helpers({

  timeFilter: function(){

    return Session.get('filter.time');

  },

  isLang: function(){

    if(this.language == undefined){
      return false
    } else {
      return true;
    }

  },

  setLang: function(){

  },

  limit: function(){
    return Session.get('limit');
  },

  postItems: function(){

    // Config is an obj with all the setting params
    // for this crisis
    var config = Session.get('crisisConfig');

    // setup reactive vars for time filter
    // and for dataset
    var s = Session.get('filter.time');
    var d = Session.get('dataset');

    // data set var
    var x = undefined;

    // set the default post limit @10
    Session.set('limit', 10);

    // if there is a time filter
    if(s != undefined){

      // tell me
      console.log(s, "is not undefined")

      // filter the posts by that time filter
      // which is a single point in time
      // so add one and substact one or this MongoDB
      // time filtering approach (there maybe a better way??)
      // doesn't work very well.
      x = Posts.find({"createdAt" : {
        $lte: moment(Session.get('filter.time')).add(1,'d').format("YYYY-MM-DD"),
        $gt: moment(Session.get('filter.time')).subtract(1,'d').format("YYYY-MM-DD")
      }}, { limit :100 }).fetch();

      Session.set('dataset', x);

    } else {

      // create the time filter from the crisis config variable
      // when time is not filtered from a point on a graph
      x = Posts.find({"createdAt" : {
        $lte: moment(config.end_date).format("YYYY-MM-DD"),
        $gt: moment(config.start_date).format("YYYY-MM-DD")
      }}, { limit :100 }).fetch();

      var data = [];

      for (var i = 0 ; i < Session.get('limit') ; i++) {
        data.push(x[i]);
      }

      //console.log(data,p);
      Session.set('dataset',x);

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

  //translations: function(){
  //
  //  return this.translations;
  //
  //}

});

Template.crisisPosts.events({

  'click #clearAllFilters': function(){

    Session.set('filter.time', undefined);

  },

  'click .setLang': function(e){
    console.log('clicked setLang', e, arguments)
  },

  'click .setLimit': function(e){
    console.log(e.target.value, [e.target])
  },

  'click .langDropDown': function(e, template){
    //e.preventDefault();
    console.log('button clicked', this, e.target.id);

    var d = { $set : { "language.code" : e.target.id } };

    Meteor.call('updatePost', this, d, function(err,res){
      console.log('call updatePost', err,res);
    })

  },

  //'click .translateLangDropDown': function(e, template){
  //  //e.preventDefault();
  //  console.log('button clicked', this, e.target.id);
  //
  //  Meteor.call('updateTranslationLanguage', this, e.target.id, function(err,res){
  //    console.log('call update translation language', err,res);
  //  })
  //
  //},

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

  'click #addTranslation': function(e){
    e.stopPropagation();

    console.log('add translation', e.target, this);

    Meteor.call('addEmptyTranslation', this._id, this.userId, function(err,res){

      console.log(err,res);

    });

  },

  'click #deletePost': function(){
    console.log(this._id);
    Meteor.call('deletePost', this, function(err, res){
      console.error('deleteing post', this._id, err, res);
    });

  },


  'submit #entityForm': function(e){

    e.preventDefault();

    console.log('entity form submitted');

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