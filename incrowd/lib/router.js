// IRON ROUTER for Meteor.js setup
// see Iron Router and Meteor docs before making changes

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('Posts');}
});

Router.route('/', { name: 'itemList'});

//Router.route('/fs', { name: 'fs'}); // nlp testing page, not required for current app

Router.route('/haiti', { name: 'haiti'});

Router.route('/all', { name: 'allPosts'});

Router.route('/crisis-api', { name: 'searchBar' });

Router.route('/admin/entity', { name: 'entity' });

Router.route('/admin/api/setup', { name: 'apiAdmin' });

Router.route('/admin/crisis/setup', { name: 'crisisAdmin' });

Router.route('/crisis/:_id', {
  name: 'crisisPage',
  data: function(){

    if(this.params._id){

      Session.set('crisisConfig', Crisis.findOne({ _id : this.params._id }) );

    }

  }
});