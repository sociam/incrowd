Meteor.publish('Haiti', function(){
  return Haiti.find({});
});

Meteor.publish('Entity', function(){
  return Entity.find({});
});