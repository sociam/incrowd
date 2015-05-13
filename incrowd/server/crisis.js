Meteor.methods({

  updatePost: function(post, d){

    Posts.upsert({ _id: post._id }, d, function(err,res){
      console.log('post updated',err , res, d);
    })

  },

  updateTranslationLanguage: function(transObj, language){

    var post = Posts.find({ "translations._id": transObj._id }).fetch()[0];

    post.translations.forEach(function(t){
      if(t._id = transObj._id){
        t.language = language;
      }
    });

    console.log(post);

    Posts.upsert({ _id: post._id }, post, function(err,res){
      console.log('post updated',err , res);
    })

  },

  toggleEditable: function(trans, value){

    var post = Posts.find({ "translations._id": trans._id }).fetch()[0];

    post.translations.forEach(function(t){
      if(t._id = trans._id){
        t.editable = value ;
      }
    });

    Posts.upsert({ _id: post._id }, post, function(err,res){
      console.log('post updated',err , res);
    });

    return post.translations;

  },

  saveTranslation: function(trans, text){

    var post = Posts.find({ "translations._id": trans._id }).fetch()[0];

    post.translations.forEach(function(t){
      if(t._id = trans._id){
        t.translation = text ;
      }
    });

    Posts.upsert({ _id: post._id }, post, function(err,res){
      console.log('post updated',err , res);
    });

    return post.translations;


  }

});