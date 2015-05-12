Meteor.methods({

  apiSearch: function(input){

    //console.log(input);

    var data = {};
    data.duplicateCount = input != undefined ? input.duplicateCount : 0,
    data.newCount = input != undefined ? input.newCount : 0,
    data.total = input != undefined ? input.total : 0,
    data.counter = input != undefined ? input.counter : 0,
    data.limit = 50;

    data['options'] = input != undefined ? input.options : {

      params: {
        //'placeName': "syria",
        'limit': 5,
        offset: 0
      }

    };

    console.log('search called');

    var config = JSON.parse(Assets.getText('apiCredentials.json')) ;

    var url = 'http://api.crisis.net/item?apikey=' + config.key;

    var req = HTTP.get(url, data.options);

    var res = JSON.parse(req.content);

    data.total = res.total;

    data['content'] = [];
    data['headers'] = req.headers;
    data['statusCode'] = req.statCode;
    data.counter += res.data.length;

    data.options.params.offset += data.options.params.limit ;

    console.log(data.counter, data.options.params.offset );

    // check for existing
    for (var i = 0 ; i < res.data.length ; i++) {
      if( Posts.find({ id : res.data[i].id }).count() > 0){
        console.log('duplicate found')
        data.duplicateCount += 1;

      } else {
        data.content.push(res.data[i]);
        data.newCount += 1;

        console.log(res.data[i]);
        Meteor.call('saveData', [res.data[i]], function(err,res){
          if(err){
            console.log('err', err)
          } else {
            console.log('res', res);
          }
        });
      }
    }

    return [data,res];

  },

  runSearches: function(){

    var config = JSON.parse(Assets.getText('crisisnetConfig.json')) ;

    console.log(config);

  },

  freqCount: function(obj){



    //if(obj == 'language'){
    //
    // var data = Haiti.find({});
    //
    // return data;
    //
    // var result = [];
    //
    // var d = _.filter(data, function(obj) {
    //    return _.has(obj, 'language') ? obj['langCode'] = obj.language.code : obj['langCode'] = 'none';
    // });
    //
    // var e = _.chain(data).countBy(function(d){ return d.langCode} ).value();
    //
    // for ( k in e){
    //    result.push({ name: k , value: e[k]})
    // }
    //
    // return result;
    //
    //
    //}

    return Haiti.find({language: { code : "en" }})

  },

  saveData: function(data){
    data.forEach(function(d){
      //console.log(d);
      Posts.upsert( {id: d.id}, d );
    })
  }

});