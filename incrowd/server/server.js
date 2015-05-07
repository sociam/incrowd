var natural = Meteor.npmRequire('natural'),
    tokenizer = new natural.WordTokenizer(),

  // csv
    toCsv = Meteor.npmRequire('to-csv');

  //language detectors
var languageDetect = Meteor.npmRequire('languagedetect'),
    lngDetect = new languageDetect();

var franc = Meteor.npmRequire('franc');

var pos = Meteor.npmRequire('pos');

var nlp = Meteor.npmRequire('nlp_compromise');

Meteor.methods({

  getFiles: function(){
    // gets a file from the private folder
    return Assets.getText('haiti_text.txt');
  },

  tokenize: function(text){
    // tokenise a string of @text

    var x = [];
    var obj= tokenizer.tokenize(text);

    for (var i = 0 ; i < obj.length ; i++) {
      x.push(obj[i].toLowerCase());
    }
    return x;

  },

  removeStopWords: function(lang, tokens){
    // returns an array of @tokens with the stopwords of @lang removed
    return _.difference(tokens, stopwords[lang]);
  },

  wordFreq: function(array){

    var frequency = {};

    array.forEach(function(value) { frequency[value] = 0; });

    var uniques = array.filter(function(value) {
      return ++frequency[value] == 1;
    });

    return frequency;

  },

  toCsv: function(data){

    var a = [];

    for(i in data){
      a.push({
        name: i,
        count: data[i]
      });
    }

    return toCsv(a);

  },

  langScore: function(data){

    var n = []

    for(d in data){
      var x = stopwords.score( data[d].DESCRIPTION );
      data[d].lang = x[0];
      data[d].langScore = x[1];

      n[d] = { lang: x[0] , langScore : x[1] }
    }

    return toCsv(n);


  },

  importCsv: function(csv){

    for(d in csv){
      Haiti.insert({
        approved: csv[d].APPROVED,
        category: csv[d].CATEGORY,
        description: csv[d].DESCRIPTION,
        date: csv[d]['INCIDENT DATE'],
        title: csv[d]['INCIDENT TITLE'],
        latitude: csv[d].latitude,
        longitude: csv[d].longitude,
        serial: csv[d].Serial,
        verified: csv[d].VERIFIED,
        location: csv[d].LOCATION
      })

    }

    return "inserted " + Haiti.find().count()

  },

  detectLanguage: function(str){

    var data = Haiti.find({}).fetch();

    data.forEach(function(d){
      Haiti.update({_id: d._id }, {$set : { "language": franc(d.description) } })

    })

  },

  pos: function(data){

    var data = Haiti.find({}).fetch();

    data.forEach(function(d){

      var words = new pos.Lexer().lex(d.description);
      var taggedWords = new pos.Tagger().tag(words);
      for (i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        console.log(tag);
        switch(tag){
          case "NN":
            console.log("nn found")
            Nouns.update(
              { "pos" : "nn" },
              {
                $inc : {"count" : 1} ,
                $addToSet : { "words" : word},
                $set : { "description": "Noun, sing. or mass" }
              },
              {upsert: true}
            );
            Nouns.update(
              { "word" : word },
              {
                $inc : {"count" : 1},
                $set : {"pos_type": "nn"}
              },
              {upsert: true}
            );
            break;
          case "NNP":
            Nouns.update(
              { "pos" : "nnp" },
              {
                $inc : {"count" : 1} ,
                $addToSet : { "words" : word},
                $set : { "description": "Proper noun, sing." }
              },
              {upsert: true}
            );
            Nouns.update(
              { "word" : word },
              {
                $inc : {"count" : 1},
                $set : {"pos_type": "nnp"}
              },
              {upsert: true}
            );
            break;
          case "NNPS":
            Nouns.update(
              { "pos" : "nnps" },
              {
                $inc : {"count" : 1} ,
                $addToSet : { "words" : word},
                $set : { "description": "Proper noun, plural " }
              },
              {upsert: true}
            );
            Nouns.update(
              { "word" : word },
              {
                $inc : {"count" : 1},
                $set : {"pos_type": "nnps"}
              },
              {upsert: true}
            );
            break;
          case "NNS":
            Nouns.update(
              { "pos" : "nns" },
              {
                $inc : {"count" : 1} ,
                $addToSet : { "words" : word},
                $set : { "description": "Noun, plural" }
              },
              {upsert: true}
            );
            Nouns.update(
              { "word" : word },
              {
                $inc : {"count" : 1},
                $set : {"pos_type": "nns"}
              },
              {upsert: true}
            );
            break;
          case "FW":
            Nouns.update(
              { "pos" : "fw" },
              {
                $inc : {"count" : 1} ,
                $addToSet : { "words" : word},
                $set : { "description": "Foreign Word" }
              },
              {upsert: true}
            );
            Nouns.update(
              { "word" : word },
              {
                $inc : {"count" : 1},
                $set : {"pos_type": "FW"}
              },
              {upsert: true}
            );
            break;
          default:
            console.log('not a noun', word, tag);
            break;

        } // switch

      } // i in tagged words


    });

  },

  findEntities: function(str){
    console.log(nlp.spot("I live in portsmouth"))

  },

  insertEntity: function(e){
    console.log('e:',e)
    Entity.upsert({'name' : e.name}, e, function(err, res){
     console.log(err,res);
      return res;
    });

  }, // insertEntity

  dbSearch: function(db, term){
    var matchContent = [],
        matchSummary = [];

    var data = db.find({}).fetch(); // get the db

    data.forEach(function(d){
      d.content.search(term) >= 0 ? matchContent.push(d._id) : false;
      d.summary.search(term) >= 0 ? matchSummary.push(d._id) : false;
    });

    return { matchContent: matchContent , matchSummary: matchSummary, content: matchContent.length, summary: matchSummary.length };
  }, // dbSearch

  entitySearch: function(db, entities){
    var matchContent = [],
        matchSummary = [],
        entList = [];

    // get the db
    var data = Haiti.find({}).fetch();

    // get list of entities
    entities.forEach(function(e){
      entList.push(e.name);
    });

    // check each in the db for entities
    data.forEach(function(d){
      for(ent in entList){
        d.content.search(entList[ent]) >= 0 ? matchContent.push({ id: d._id, entity: entList[ent]}) : false;
        d.summary.search(entList[ent]) >= 0 ? matchSummary.push({ id: d._id, entity: entList[ent]}) : false;
      }
    });

    return { matchContent: matchContent , matchSummary: matchSummary, content: matchContent.length, summary: matchSummary.length };

  }, // entitySearch

  entityTextSearch: function(data){
    // searches @data for all entities in the entity collection

    var matchContent = [],
        matchSummary = [],
        entList = [];

    var entities = Entity.find({}).fetch();

    // get the db
    var data = data;

    // get list of entities
    entities.forEach(function(e){
      entList.push(e.name); // create an array of all entity names
    });

    // for each post
    data.forEach(function(d){
      // search through the entity list for matches
      for(ent in entList){

        // search the post content, -1 is false, >= 0 means something is found
        // check if entity is in post
        if(d.content.search(entList[ent]) >= 0){

          // true: now check if entity is already saved
          if(_.where(matchContent, { entity : entList[ent]}).length > 0){

            // throw an error log if multiples are found
            if(_.where(matchContent, { entity : entList[ent]}) > 1 ){
              console.error("Multiple posts matched, expected only 1 max.", _.where(matchContent, { entity : entList[ent]}));
            }

            var matchedPost = _.where(matchContent, { entity : entList[ent]}); // this should only every be 1 (see error log above)

            // add 1 to the count and push the current post ID (d.id) into the postIDs array
            // for the matched post
            matchedPost.forEach(function(mp){
              mp.count += 1;
              mp.postIds.push(d.id);
            });

          } else { // not already in the list, so add it with a count of 1
            matchContent.push({
              entity: entList[ent],
              count: 1,
              postsIds: [ d._id ]
            })
          }

        }
        // same again for summary text
        if(d.summary.search(entList[ent]) >= 0){

          // true: now check if entity is already saved
          if(_.where(matchSummary, { entity : entList[ent]}).length > 0){

            // throw an error log if multiple summary matches are found
            if(_.where(matchSummary, { entity : entList[ent]}) > 1 ){
              console.error("Multiple summaries matched, expected only 1 max.", _.where(matchSummary, { entity : entList[ent]}));
            }

            var matchedPost = _.where(matchSummary, { entity : entList[ent]}); // this should only every be 1 (see error log above)

            // add 1 to the count and push the current post ID (d.id) into the postIDs array
            // for the matched post
            matchedPost.forEach(function(mp){
              mp.count += 1;
              mp.postIds.push(d.id);
            });

          } else { // not already in the list, so add it with a count of 1
            matchSummary.push({
              entity: entList[ent],
              count: 1,
              postsIds: [ d._id ]
            })
          }

        }
      }
    });

    // check each in the db for entities
    //data.forEach(function(d){
    //  for(ent in entList){
    //    var a = Haiti.find({$text:{$search: entList[ent] }}).fetch();
    //    if(a.length > 0) { matchContent.push(a) }
    //  }
    //});

    //return { matchContent: matchContent , matchSummary: matchSummary, content: matchContent.length, summary: matchSummary.length };

    return { data: data , matchContent: matchContent, matchSummary: matchSummary } ;

  } // entityTextSearch

});