Template.entity.helpers({

  entity: function(){
    // returns all entities in the collection
    // reactive so updates automatically when called in the
    // HTML template file
    return Entity.find({});
  }

});


Template.entity.events({

  'click #deleteEntity': function(){

    Meteor.call('deleteEntity', this, function(err,res){
      if(err){
        return err
      } else {
        return res
      }
    });

  },

  'submit form': function(e){

    // submit method for the entity form on the entity admin page

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
       console.log(err,res)
      });

      $('#entityForm').trigger("reset");

    } else {
      console.error('Cannot submit new Entity without a NAME')
    }

  }, // submit form end

  'click #entity-search': function(){

    var entities = Entity.find({}).fetch();
    console.log(entities);

    Meteor.call('entitySearch', 'Haiti', entities, function(err,res){
      console.log('entitySearch',err,res);
    })

  },

  'click #entityEdit': function(){

    // each entity in the list has an edit button next to the title
    // this method links to the edit button, resets the entity form
    // and inserts all the Entity data in the form to be edited

    $('#entityForm').trigger("reset");

    $('#entityName').val(this.name);
    $('#entityDescription').val(this.description);

    _.contains(this.categories, "place") ? document.getElementById('check-place').checked = true : document.getElementById('check-place').checked = false;
    _.contains(this.categories, "ngo") ? document.getElementById('check-ngo').checked = true : document.getElementById('check-place').checked = false;
    _.contains(this.categories, "person") ? document.getElementById('check-person').checked = true : document.getElementById('check-place').checked = false;

  }


});