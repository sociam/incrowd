
Template.entityBlock.helpers({

  contentMatch: function(){
    return Session.get('contentEntityMatch');
  }

});


Template.entityBlock.events({

  'click #entity-search': function(){

    //var entities = Entity.find({}).fetch();
    //console.log(entities);

    //Meteor.call('entitySearch', 'Haiti', entities, function(err,res){
    //  console.log('entitySearch',err,res);
    //  Session.set('contentEntityMatch', res.matchContent);
    //  Session.set('summaryEntityMatch', res.matchSummary);
    //})

    Meteor.call('entityTextSearch', Session.get('dataset'), function(err,res){
      console.log('entitySearch',err,res);
      Session.set('contentEntityMatch', res.matchContent);
      Session.set('summaryEntityMatch', res.matchSummary);
    })
  }
});