
Template.haiti.helpers({

  posts: function(){
    if(!Meteor.userId()) return null;
    return Haiti.find({});
  },

  contentMatch: function(){
    return Session.get('contentEntityMatch');
  },

  test: function(){
    console.log('test helper called');
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
              Session.set('filter.time', moment(this.x).format() );
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

  'click #entity-search': function(){

    var entities = Entity.find({}).fetch();
    console.log(entities);

    Meteor.call('entitySearch', 'Haiti', entities, function(err,res){
      console.log('entitySearch',err,res);
      Session.set('contentEntityMatch', res.matchContent);
      Session.set('summaryEntityMatch', res.matchSummary);
    })

  },

  'click': function(e){
    console.log('clicked timeColumnChart', e, arguments)
  }

});
