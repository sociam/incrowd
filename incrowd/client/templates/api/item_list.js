var testData = [
  {
    "source": "twitter",
    "language": {
      "code": "en"
    },
    "geo": {
      "locationIdentifiers": {
        "authorLocationName": "Nairobi, Kenya",
        "authorTimeZone": null
      },
      "coordinates": null
    },
    "content": "Three killed in an accident along Narok-Mai Mahiu Highway #NarokNorthDistrictHospitalMortuary #Kenya http://t.co/IQROp0sdWK",
    "lifespan": "temporary",
    "publishedAt": "Sat Feb 22 2014 12:25:30 GMT-0600 (CST)",
    "remoteID": "437226684211662848"
  },
  {
    "source": "twitter",
    "language": {
      "code": "en"
    },
    "geo": {
      "locationIdentifiers": {
        "authorLocationName": "Nairobi, Kenya",
        "authorTimeZone": null
      },
      "coordinates": null
    },
    "content": "Three killed in an accident along Narok-Mai Mahiu Highway #NarokNorthDistrictHospitalMortuary #Kenya http://t.co/IQROp0sdWK",
    "lifespan": "temporary",
    "publishedAt": "Sat Feb 22 2014 12:25:30 GMT-0600 (CST)",
    "remoteID": "437226684211662848"
  }
];

Template.itemList.helpers({

  items: function(){

    if( Session.get('data') != undefined ){
      return Session.get('data')
    } else {
      return testData;
    }
  }

});