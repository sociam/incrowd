Template.searchBar.events({

  'click button': function(e){
    e.preventDefault();
    //console.log("Form submitted");
    console.log($('#searchBar').val(), $('#searchBar').val() == "" );

    Meteor.call('apiSearch', function(err, res){
      console.log('err', err);
      console.log('res',res);

      Session.set('data', res.data);

      //Meteor.call('saveData', Session.get('data', function(err, res){
      //  console.log('saveData', err, res);
      //}))
    });



  }

});