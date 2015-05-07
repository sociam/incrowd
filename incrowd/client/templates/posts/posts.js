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

  languageSelect: function(){

    var langs = [
      { "code": "en", "name": "English"},
      { "code": "ar", "name": "Arabic"},
      { "code": "es", "name": "Spanish"},
      { "code": "fr", "name": "French"},
      { "code": "de", "name": "German"}
    ];

    return langs;

  },

  posts: function(){

    var s = Session.get('filter.time');

    if(s != undefined){
      console.log(s, "is undefined")
      var x = Haiti.find({"createdAt" : {
        $lte: moment(Session.get('filter.time')).add('1','d').format("YYYY-MM-DD"),
        $gt: moment(Session.get('filter.time')).subtract('1','d').format("YYYY-MM-DD")
      }}).fetch();

      Session.set('dataset', x);

    } else {

      var x = Haiti.find().fetch();

      Session.set('dataset', x);

    }

    return x;

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

  }

});