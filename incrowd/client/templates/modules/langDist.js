Meteor.subscribe('Haiti');

Template.langDist.helpers({

  languages: function(){

    var data = Haiti.find({}).fetch();

    var result = [];

    var d = _.filter(data, function(obj) {
        return _.has(obj, 'language') ? obj['langCode'] = obj.language.code : obj['langCode'] = 'none';
    });

    var e = _.chain(data).countBy(function(d){ return d.langCode} ).value();

    for ( k in e){
        result.push({ name: k , value: e[k]})
    }

    return result;

  },

  topGenresChart : function(){

    var chartData = [];

    var haiti = Haiti.find({}).fetch();

    var grouped = _.chain(haiti)
      .countBy(function(d){return moment(d.createdAt).format("YYYY-MM-DD hh")})
      .value();

    console.log(grouped);

    var a = Object.keys(grouped).forEach(function(key){
      chartData.push([parseInt(moment(key).unix() * 1000), grouped[key]]);
    });
    console.log(chartData[0]);

    var data = _.sortBy(chartData, function(n){ return n[0] });
    console.log(data[0]);

    return {
      chart: {
        width: 350,
        height: 100,
        type: 'areaspline'
      },
      tooltip: {
        pointFormat: "Value: {point.y:,.1f}"
      },
      title: {
        text: 'Posts by Volume and Time'
      },
      legend: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        labels:{
          format: '{value:%d/%m %H}',
          align: 'center'
        }
      },

      series: [{
        data: data,
        type:'column'
      }]
    };  //return


  } // rendered function

});

