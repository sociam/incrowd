Template.entityBlockIcons.helpers({

  entityIcons: function(){

    // unfinished: this is the basis for showing icons
    // on each Entity for Person, Place, NGO
    // Look at theNounProject website for CC license images
    // that are free to use / attribution etc.

    console.log('ent icons this',this);
    var x  = _.contains(this.categories, "place");

    //console.log(this, x)
  }


});