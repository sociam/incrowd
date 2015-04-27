Template.entity.helpers({


});


Template.entity.events({

  'submit form': function(e){

    e.preventDefault();

    var entity = {
      name: $(e.target).find('[name=name]').val(),
      description: $(e.target).find('[name=description]').val(),
      categories: []
    };

    function getCategories(){
      _.map(e.target, function(e){ e.type=='checkbox' && e.checked ? entity.categories.push(e.value) : "false" });
    }

    getCategories();

    if(entity.name != ""){
      Meteor.call("insertEntity", entity, function(err,res){
       console.log(arguments)
      });

    } else {
      console.error('Cannot submit new Entity without a NAME')
    }

  }, // submit form

  'click #entity-search': function(){

    var entities = Entity.find({}).fetch();
    console.log(entities);

    Meteor.call('entitySearch', 'Haiti', entities, function(err,res){
      console.log('entitySearch',err,res);
    })

  }


});