Meteor.methods({

  addEmptyTranslation: function(postId, userId){

    // adds a new empty translation object to the post
    // @userID is not currently being passed into this fn when called
    // would be nice to have the inCrowd keep track of who changed what

    var x = new Mongo.ObjectID;

    var obj = {
      _id: x.valueOf(),
      translation: null,
      createdAt: new Date(),
      createdBy: userId || null,
      language: null,
      editable: true
    };

    Posts.upsert({ _id: postId }, { $addToSet : { "translations" : obj } } );

  },

  deletePost: function(post){

    // Deletes an entire POST. Everything. Gone forever. No take-backs.

    Posts.remove({ _id: post._id });
  }

});