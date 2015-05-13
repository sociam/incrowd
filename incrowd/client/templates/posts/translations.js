Template.translations.helpers({

  translations: function(){

    return this.translations;

  },

  isLang: function(){

    if(this.language == undefined){
      return false
    } else {
      return true;
    }

  },

  isEditable: function(){

    console.log('this.editable',this.editable);

    return this.editable;

  }

});




Template.translations.events({

  'click .translateLangDropDown': function(e, template){
    //e.preventDefault();
    //console.log('button clicked', this, e.target.id);

    Meteor.call('updateTranslationLanguage', this, e.target.id, function(err,res){
      console.log('call update translation language', err,res);
    })

  },

  'click #saveTranslation': function(){

    var trans = this;

    console.log('this', this);

    Meteor.call('saveTranslation', trans, $('#translationText').val(), function(err,res){

      console.log('called saveTranslation', err, res);

      Meteor.call('toggleEditable', trans, false, function(err,res){

        console.log('call toggleEditable', err, res);

      });

    });
  },

  'click #editTranslation': function(){

    Meteor.call('toggleEditable', this, true, function(err,res){

      console.log('call toggleEditable', err, res);

    });

  }


});