//Meteor.publish('Haiti', function(){
//  return Haiti.find({});
//});

Meteor.publish('Posts', function(){
  return Posts.find({});
});

Meteor.publish('Entity', function(){
  return Entity.find({});
});

Meteor.publish('Crisis', function(){
  return Crisis.find({});
});