Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('Haiti');}
});

Router.route('/', { name: 'itemList'});

Router.route('/fs', { name: 'fs'});

Router.route('/haiti', { name: 'haiti'});

Router.route('/crisis-api', { name: 'searchBar' });

Router.route('/admin/entity', { name: 'entity' });