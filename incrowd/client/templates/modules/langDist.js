Meteor.subscribe('Haiti');

Template.langDist.helpers({

  languages: function(){

    var data = Session.get('dataset');

    //clear out all the language filters
    Session.set('filter.language', undefined);

    var result = [];

    var d = _.filter(data, function(obj) {
        return _.has(obj, 'language') ? obj['langCode'] = obj.language.code : obj['langCode'] = 'none';
    });

    var e = _.chain(data).countBy(function(d){ return d.langCode} ).value();

    for (k in e){
        result.push({ name: k , value: e[k]})
    }

    return result;

  },

  filterToggle: function(){

    var langs = Session.get('filter.language');

    return !_.contains(langs, this.name);

  },

  topGenresChart : function(){

    var data = Session.get('dataset');

    var result = [];

    var d = _.filter(data, function(obj) {
      return _.has(obj, 'language') ? obj['langCode'] = obj.language.code : obj['langCode'] = 'none';
    });

    var e = _.chain(data).countBy(function(d){ return d.langCode} ).value();

    for (k in e){
      result.push({ name: k , y: e[k]}) // highcharts expects a 'y' key and a 'name' key
    }

    //console.log('language data',result);

    return {
      chart: {
        type: 'bar',
        height: (result.length * 100) / 1.5
      },

      xAxis: {
        categories: function(){ return result.forEach(function(d){d.name;})},
        labels: {
          style: {
            fontSize: '11px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },

      series: [{
        data: result
      }],
      dataLabels: {
        enabled: true,
        //rotation: -90,
        color: '#000',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    };  //return


  } // chart function

});

Template.langDist.events({

  'click .filter-language': function(e){
    e.preventDefault();

    if(Session.get('filter.language') != undefined){

      var langs = Session.get('filter.language');

      // if the filter is on
      if(_.contains(langs, this.name)){

        // switch the filter off
        console.log('removing', this.name, _.without(langs, this.name));
        Session.set('filter.language',_.without(langs, this.name));
        //return _.without(langs, this.name);

      } else {
        langs.push(this.name);
        Session.set('filter.language', langs); // add to session var filters
      }

    } else {

      var arr = [this.name];

      Session.set('filter.language' , arr);

    }


  }

});