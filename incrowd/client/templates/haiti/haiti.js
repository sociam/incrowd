
Template.haiti.helpers({

  posts: function(){

    var s = Session.get('filter.time');

    if(s != undefined){
      console.log(s, "is undefined")
      var x = Haiti.find({"createdAt" : {
        $lte: moment(Session.get('filter.time')).add('1','d').format("YYYY-MM-DD"),
        $gt: moment(Session.get('filter.time')).subtract('1','d').format("YYYY-MM-DD")
      }}).fetch();

      Session.set('dataset', x);

    } else {

      var x = Haiti.find().fetch();

      Session.set('dataset', x);

    }

    return x;

  },

   timeColumnChart : function(){

    var chartData = [];

    var haiti = Haiti.find({}).fetch();

    var grouped = _.chain(haiti)
      .countBy(function(d){return moment(d.createdAt).format("YYYY-MM-DD hh")})
      .value();

    //console.log(grouped);

    var a = Object.keys(grouped).forEach(function(key){
      chartData.push([parseInt(moment(key).unix() * 1000), grouped[key]]);
    });
    //console.log(chartData[0]);

    var data = _.sortBy(chartData, function(n){ return n[0] });
    //console.log(data[0]);

    return {
      chart: {
        //width: 3,
        height: 150,
        type: 'column'
      },
      tooltip: {
        pointFormat: "Value: {point.y:,.1f}"
      },
      title: {
        text: null //'Posts by Volume and Time'
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
        type:'column',
        cursor: 'pointer',
        point: {
          events: {
            click: function (e) {
              Session.set('filter.time', moment(this.x).format('YYYY-MM-DD') );
              console.log(this, this.x, this.y);
            }
          }
        }
      }]
    };  //return

  } // rendered function

});

Template.haiti.events({
  'click #getLanguages': function(){

    Meteor.call('detectLanguage', function(err, res){
      console.log(err,res)
    });
  },

  'click #pos': function(){
    Meteor.call('pos', this.description)
  },


  //'click': function(e){
  //  console.log('clicked timeColumnChart', e, arguments)
  //}

});
