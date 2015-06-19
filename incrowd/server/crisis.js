Meteor.methods({

  updatePost: function(post, d){

    // upsert Post using mongoDB _id field
    // @d should be a complete post data object

    Posts.upsert({ _id: post._id }, d, function(err,res){
      console.log('post updated',err , res, d);
    })

  },

  updateTranslationLanguage: function(transObj, language){

    // Upsert new Post object translation data
    // works better (or easier at least) to find the Post first
    // then make changes locally and upsert the new object
    // to the Post collection

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

    // changes the status of a tranlsation to be editable or not
    // all empty / newly created translations are editable.
    // Saving translations to the collection sets editable to FALSE

    var post = Posts.find({ "translations._id": trans._id }).fetch()[0];

    post.translations.forEach(function(t){
      if(t._id = trans._id){
        t.editable = value ;
      }
    });

    Posts.upsert({ _id: post._id }, post, function(err,res){
      console.log('post updated',err , res);
    });

    return post.translations; // returns the translations to allow client-side confirmation

  },

  saveTranslation: function(trans, text){

    // update the translation text
    // this could be refactored with the updateTranslationLanguage method above

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