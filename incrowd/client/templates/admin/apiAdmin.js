Template.apiAdmin.helpers({

  switch: function(){
    return Session.get('state');
  },

  postCount: function(){
    return Posts.find({}).count();
  },

  resData: function(){
    return Session.get('data');
  },

  res: function(){

    var data = function(){
      return Session.get('data');
    };

    if(data() != undefined){

      if (data().counter < data().total && Session.get('state') == true) {

      console.log(Session.get('data').options.params.limit, Session.get('data').counter);

      Session.get('data').options.params.offset += Session.get('data').counter;

      Meteor.call('apiSearch', Session.get('data'), function(err, res){
        Session.set('data', res[0]);
      });

      console.log(data());

      } else {

        console.error('Max. limit reached or API calls are switched off.');
      }
    }

    return true;

  }

});



Template.apiAdmin.events({

  'click #crisisnet-api-stateTrue': function(e){

    e.preventDefault();

    Meteor.call('apiSearch', function(err, res){

      console.log('call apiSearch', err,res);

      Session.set('state', true); // switch on the api method call.

      Session.set('data', res[0]);

    });

  },

  'click #crisisnet-api-stateFalse': function(e){

    e.preventDefault();

    Session.set('state', false); // switch on the api method call.

  }

});

Template.apiAdmin.rendered = function(){





};