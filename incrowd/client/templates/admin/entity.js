Template.entity.helpers({

  entity: function(){
    return Entity.find({});
  }

});


Template.entity.events({

  'submit form': function(e){

    e.preventDefault();

    var entity = {
      name: $(e.target).find('[name=name]').val(),
      description: $(e.target).find('[name=description]').val(),
      categories: []
    };

      _.map(e.target, function(e){ e.type=='checkbox' && e.checked ? entity.categories.push(e.value) : "false" });

    console.log(entity)

    if(entity.name != ""){
      Meteor.call("insertEntity", entity, function(err,res){
       console.log(err,res)
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

  },

  'click #entityEdit': function(){
    console.log(this, _.contains(this.categories, "place"));

    $('#entityForm').trigger("reset");

    $('#entityName').val(this.name);
    $('#entityDescription').val(this.description);

    _.contains(this.categories, "place") ? document.getElementById('check-place').checked = true : document.getElementById('check-place').checked = false;
    _.contains(this.categories, "ngo") ? document.getElementById('check-ngo').checked = true : document.getElementById('check-place').checked = false;
    _.contains(this.categories, "person") ? document.getElementById('check-person').checked = true : document.getElementById('check-place').checked = false;

  }


});