Meteor.methods({

  apiSearch: function(input){

    /* @input is optional
    *  fn calls a fixed api address using the apiCredentials file in the
    *  private folder.
    *  Returns the API response obj and data object to be reused as the @input
    *  if the fn is called more than once, this allows for repeated calls
    *  to be made as the counts are updated in the data obj
    */

    // Data object, returned from the fn
    // allows fn to loop, holds the counts for the current and previous API calls
    // by updating the rolling offset value.
    // Fn will continue until the ALL POSTS in the Crisis.net API are crawled.

    var data = {}; // setup new data obj

    // check and use any property that exists in the input obj
    data.duplicateCount = input != undefined ? input.duplicateCount : 0,
    data.newCount = input != undefined ? input.newCount : 0,
    data.total = input != undefined ? input.total : 0,
    data.counter = input != undefined ? input.counter : 0,
    data.limit = 250;

    // setup of API parameters.
    data['options'] = input != undefined ? input.options : {

      // For more parameters see the Crisis.net documentation
      params: {
        //'placeName': "syria",
        'limit': 250,
        offset: 0
      }

    };

    // Pulls API key from file.
    // Could be a parsing issue with on fresh installs??
    var config = JSON.parse(Assets.getText('apiCredentials.json')) ;

    //console.log(config);

    // API call
    var url = 'http://api.crisis.net/item?apikey=' + config.key;

    var req = HTTP.get(url, data.options);

    // response
    var res = JSON.parse(req.content);

    // add the total number of posts (given by Crisis.net in the response (res))
    // used to calculate how many more calls are necessary
    data.total = res.total;

    data['content'] = [];
    data['headers'] = req.headers;
    data['statusCode'] = req.statCode;
    data.counter += res.data.length;

    // add total count of posts so far to the current offset
    // var in the data object
    data.options.params.offset += data.options.params.limit ;

    //console.log(data.counter, data.options.params.offset );

    // check for existing Posts in the Posts Collection
    for (var i = 0 ; i < res.data.length ; i++) {
      if( Posts.find({ id : res.data[i].id }).count() > 0){

        // duplicates found
        //console.log('duplicate found')
        data.duplicateCount += 1; // increase the duplicate count

      } else { // no duplicates found

        // add the new posts to the data object for reference
        data.content.push(res.data[i]);
        data.newCount += 1; // increase count of new posts found on crisis.net

        // save new Posts to the DB
        Meteor.call('saveData', [res.data[i]], function(err,res){
          if(err){
            //console.log('err', err)
          } else {
            //console.log('res', res);
          }
        });
      }
    }

    return [data,res]; // return the data object and the latest API response

  },

  //freqCount: function(obj){
  //
  //  // not being used
  //
  //  //if(obj == 'language'){
  //  //
  //  // var data = Haiti.find({});
  //  //
  //  // return data;
  //  //
  //  // var result = [];
  //  //
  //  // var d = _.filter(data, function(obj) {
  //  //    return _.has(obj, 'language') ? obj['langCode'] = obj.language.code : obj['langCode'] = 'none';
  //  // });
  //  //
  //  // var e = _.chain(data).countBy(function(d){ return d.langCode} ).value();
  //  //
  //  // for ( k in e){
  //  //    result.push({ name: k , value: e[k]})
  //  // }
  //  //
  //  // return result;
  //  //
  //  //
  //  //}
  //
  //  return Posts.find({language: { code : "en" }})
  //
  //},

  saveData: function(data){

    // Method to save an object array of Posts to the Post Collection
    // UPSERT not insert (will only update non-existent posts, or change
    // existing vars

    data.forEach(function(d){
      //console.log(d);
      Posts.upsert( {id: d.id}, d );
    })
  }

});