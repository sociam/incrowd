Meteor.methods({

  apiSearch: function(input){

    options = {

      params: {
        //'placeName': "syria",
        'limit': 500
      }

    };

    console.log('search called');

    var url = 'http://api.crisis.net/item?apikey=' + apiCredentials.crisisnet.key;

    var data = HTTP.get(url, options);

    return data.data;

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

      Haiti.upsert({id: d.id}, d);

    })
  }

});