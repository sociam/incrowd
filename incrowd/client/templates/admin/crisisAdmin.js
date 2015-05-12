Template.crisisAdmin.helpers({



});

Template.crisisAdmin.events({

  'submit form': function(e){

    e.preventDefault();

    console.log('form submitted', e, this);

  }


});

Template.crisisAdmin.rendered = function() {

  $('#crisis-startDate').datepicker({
    'orientation': 'top'
  });

  $('#crisis-endDate').datepicker({
    'orientation': 'top'
  });

};