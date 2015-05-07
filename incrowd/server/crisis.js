Meteor.methods({

  updatePost: function(post, d){

    Haiti.upsert({ _id: post._id }, d, function(err,res){
      console.log(err,res,d);
    })

  }

});