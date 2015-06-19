Template.layout.helpers({

  crisis: function(){
    return Crisis.find({});
  },

  activeIfTemplateIs: function(template){

    var currentRoute = Router.current().route.getName();

    //console.log(currentRoute);

    return currentRoute &&
      template === currentRoute ? 'active' : '';

  }

});