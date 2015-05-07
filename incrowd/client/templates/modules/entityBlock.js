
Template.entityBlock.helpers({

  contentMatch: function(){
    return Session.get('contentEntityMatch');
  },

  entityHighlightToggle: function(){

    var highEnts = Session.get('highlight.entity');

    //console.log(highEnts, this);

    return !_.contains(highEnts, this.entity); // returns true or false
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
      //console.log('entitySearch',err,res);
      Session.set('contentEntityMatch', res.matchContent);
      Session.set('summaryEntityMatch', res.matchSummary);
    })
  },

  'click .highlight-entity': function(e){
    e.preventDefault();

    if(Session.get('highlight.entity') != undefined){ // check for existing highlights

      var ents = Session.get('highlight.entity'); // get session vars

      // if the filter is on
      if(_.contains(ents, this.entity)){

        // switch the filter off
        //console.log('removing', this.name, _.without(ents, this.entity));
        Session.set('highlight.entity',_.without(ents, this.entity));
        //return _.without(langs, this.name);

        // and turn off the highlight
        $('p').unhighlight(this.entity);

      } else { // push it to the session var
        ents.push(this.entity);
        Session.set('highlight.entity', ents);

        // and highlight the text
        $('p').highlight(this.entity);
      }

    } else {

      var arr = [this.entity];

      Session.set('highlight.entity' , arr);

    }


  }
});