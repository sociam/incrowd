
Template.apiSearch.helpers({

});

Template.apiSearch.events({

  'submit form': function(e){
    e.preventDefault();
    console.log("Form submitted");
    console.log(e , $('#textInput').val);


  }

});

