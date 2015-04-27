
Template.fs.helpers({

  files: function(){

    Meteor.call('getFiles', function(err, res){

    })

  },

  tokens: function(){
     return Session.get('tokens');
  }

});

Template.fs.events({

  'click #loadFile': function(){
    console.log('clicked')
    Meteor.call('getFiles', function(err, res){
      console.log(err);
      if(res){
        console.log('response received');

        Session.set("text", res);

        Meteor.call('tokenize', res, function(err, res){
          console.log('tokenize', err, res)
          if(res){
            Session.set("tokens", res);
          }
        })

      }
    })

  },

  'click #removeStopWords': function(e){
      console.log("language is ",e.currentTarget.dataset.lang);
      Meteor.call('removeStopWords', e.currentTarget.dataset.lang, Session.get('tokens'), function(err,res){
        console.log('MC removeStopWords', err, res);
        Session.set('tokens', res);
      });
  },

  'click #wordFreq': function(){

    Meteor.call('wordFreq', Session.get('tokens'), function(err,res){
      console.log('call wordFreq', err, res);
      Session.set('wordFreqs', res);
    })

  },

  'click #toCSV': function(){
      Meteor.call('toCsv', Session.get('wordFreqs'), function(err,res){
        console.log('call toCsv', err, res);
        Session.set('csv', res);
      });
  },

  'click #saveCsv': function(){
    //Meteor.call('saveCsv', Session.get('csv'), function(err,res){
    //  console.log('call saveCSV', err, res);
    //});

    //var blob = new Blob(Session.get('csv'), { type: 'text/csv;charset=utf-8' }); //Blob.js
    saveAs(new Blob([Session.get('csv')], { type: 'text/csv;charset=utf-8' }), "download.csv"); //FileSaver.js

  },

  'click #d3Csv': function(){
    d3.csv('/Haiti.csv', function(d){
      Session.set('d3csv', d);
    })

  },

  'click #langScore': function(){
    Meteor.call('langScore', Session.get('d3csv'), function(err,res){
      //Session.set('d3csv', res);
      console.log(res)
    });
  },

  'click #saveD3Csv': function(){

    saveAs(new Blob([Session.get('d3csv')], { type: 'text/csv;charset=utf-8' }), "languageFreq.csv"); //FileSaver.js

  },

  'click #importCsv': function(){
    Meteor.call('importCsv', Session.get('d3csv'), function(err, res){
      console.log('call importCsv', err, res)
    })
  },

  'click #findEntities': function(){
    Meteor.call('findEntities', function(err,res){
      console.log('find entities', err, res);
    });
  }


});