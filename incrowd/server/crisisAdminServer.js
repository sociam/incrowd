
Meteor.methods({

  addNewCrisis: function(c){

    console.log(c);

    Crisis.insert(c, function(err,res){
      console.log(err,res)
    });

    return c;

  },

  deleteCrisis: function(c){
    Crisis.remove({_id: c._id});
  }

});