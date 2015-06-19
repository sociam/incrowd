
Template.entityBlock.helpers({

  contentMatch: function(){
    return Session.get('contentEntityMatch');
  },

  entityHighlightToggle: function(){

    // reactive session vars triggered when
    // a user selects any text in a Post

    var highEnts = Session.get('highlight.entity');

    return !_.contains(highEnts, this.entity); // returns true or false
  }

});


Template.entityBlock.events({

  'click #entity-search': function(){

    // button to perform an entity search
    // This needs to be refactored to be
    // reactive

    Meteor.call('entityTextSearch', Session.get('dataset'), function(err,res){
      console.log('entitySearch',err,res);
      Session.set('contentEntityMatch', res.matchContent);
      Session.set('summaryEntityMatch', res.matchSummary);
    })
  },

  'click .highlight-entity': function(e){

    // fires when a user highlights text in a post

    e.preventDefault(); // stops the universe from collapsing in on itself

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

    } else { // but if no filter is on..

      var arr = [this.entity]; // grab it..

      Session.set('highlight.entity' , arr); // then add/replace the session var

    }


  }
});