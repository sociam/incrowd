Template.crisisAdmin.helpers({

  entity: function() {
    return Entity.find().fetch().map(function(it){ return { value: it.name, _id: it._id }; });
  },

  selected: function(event, suggestion, datasetName){

    Session.set('typeAhead', { _id: suggestion._id, value : suggestion.value });
    console.log(Session.get('typeAhead'))
  },

  entityArray: function(){
    var ents = function(){ return Session.get('entityArray')};
    var array =[];

    console.log(typeof ents());

    if(_.isArray(ents())){
      var x = ents();
      console.log(ents(), x)
      x.forEach(function(e){
        array.push(e.value)
      });

      return array;
    } else {
      return ents();
    }

  },

  crisis: function(){
    return Crisis.find({});
  }


});

Template.crisisAdmin.events({

  'click #addEntity': function(){

    var ent = Session.get('typeAhead');

    var arr = Session.get('entityArray');

    if(typeof arr != "string"){
      arr.push(ent);
    } else {
      arr = [ent];
    }

    Session.set('entityArray', arr);

  },

  'click #removeEntity': function(){

    var ent = Session.get('typeAhead');

    var arr = Session.get('entityArray');

    if(typeof arr != "string"){
      arr = _.reject(arr, function(v){ return v.value == ent.value });
    } else {
      arr = [ent];
    }

    Session.set('entityArray', arr);

  },

  'submit form': function(e){

    e.preventDefault();
    var t = e.target;

    console.log('form submitted', t, $('.languageCheckBox'), this);

    var langs = [];

    $(".languageCheckBox").each(function() {
      if(this.checked) { langs.push(this.value) };
    });

    //console.log(langs);

    var d = {
      name : t.name.value || "untitled",
      start_date: t.startDate.value || undefined,
      end_date: t.endDate.value || undefined,
      tags: t.tagList.value || [],
      languages: langs,
      entities: Session.get('entityArray')
    };

    Meteor.call('addNewCrisis', d, function(err,res){
      console.log('addNewCrisis', err,res);
    });

  },

  'click #deleteCrisis': function(){
    Meteor.call('deleteCrisis', this, function(err,res){
      console.log('delete crisis' , err,res);
    })
  }


});

Template.crisisAdmin.rendered = function() {

  $('#startDate').datepicker({
    'orientation': 'top',
    'format': 'yyyy-mm-dd'
  });

  $('#endDate').datepicker({
    'orientation': 'top',
    'format': 'yyyy-mm-dd'
  });

  Meteor.typeahead.inject();

  Session.set('entityArray', "search for entities and add or remove them below")

};