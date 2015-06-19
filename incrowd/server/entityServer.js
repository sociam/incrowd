Meteor.methods({

  deleteEntity: function(ent){

    Entity.remove({ _id: ent._id });

  }

});