Meteor.methods({

  addEmptyTranslation: function(postId, userId){

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
    Posts.remove({ _id: post._id });
  }

});