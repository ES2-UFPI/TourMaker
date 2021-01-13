import FirebaseFunctions from './Firebase';

export default class ReactMaps {

  static getLocationByName = (nome, callback) => {
    FirebaseFunctions.recoverKey(key => {
      this.getLocationByNameIntern(nome, key, callback)
    })
  }
  static getLocationByNameIntern = (nome, API_KEY, callback) => {
    var encodedName = nome.replace(/ /gi, '+')
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?input=' + encodedName + '&radius=10' + '&key=' + API_KEY
    fetch(url).then(res => {
      return res.json()
    }).then(res => {
      var places = [] // This Array WIll contain locations received from google
      for (let googlePlace of res.results) {
        var place = {}
        var lat = googlePlace.geometry.location.lat;
        var lng = googlePlace.geometry.location.lng;
        var coordinate = {
          latitude: lat,
          longitude: lng,
        }

        var gallery = []

        place['placeTypes'] = googlePlace.types
        place['coordinate'] = coordinate
        place['placeId'] = googlePlace.place_id
        place['placeName'] = googlePlace.name
        place['rating'] = googlePlace.rating
        place['formatted_address'] = googlePlace.formatted_address
        place['opening_hours'] = googlePlace.opening_hours
        places.push(place);
      }
      callback(places)
    }).catch(error => {
      console.log(error);
    });
  }

  static getNearbyLocation = (latitude, longitude, radius, callback) => {
    FirebaseFunctions.recoverKey(key => {
      this.getNearbyLocationIntern(latitude, longitude, radius, key, callback)
    })
  }
  static getNearbyLocationIntern = (latitude, longitude, radius, API_KEY, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&key=' + API_KEY
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        var places = [] // This Array WIll contain locations received from google
        for (let googlePlace of res.results) {
          var place = {}
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          }

          var gallery = []

          place['placeTypes'] = googlePlace.types
          place['coordinate'] = coordinate
          place['placeId'] = googlePlace.place_id
          place['placeName'] = googlePlace.name
          place['rating'] = googlePlace.rating
          place['formatted_address'] = googlePlace.formatted_address
          place['opening_hours'] = googlePlace.opening_hours
          places.push(place);
        }
        callback(places)
      })
      .catch(error => {
        console.log(error);
      });

  }

  static getLocationByType = (type, callback) => {
    FirebaseFunctions.recoverKey(key => {
      this.getLocationByTypeIntern(type, key, callback)
    })
  }
  static getLocationByTypeIntern = (type, API_KEY, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?type=' + type + '&radius=10' + '&key=' + API_KEY
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        var places = [] // This Array WIll contain locations received from google
        for (let googlePlace of res.results) {
          var place = {}
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          }

          var gallery = []

          place['placeTypes'] = googlePlace.types
          place['coordinate'] = coordinate
          place['placeId'] = googlePlace.place_id
          place['placeName'] = googlePlace.name
          place['rating'] = googlePlace.rating
          place['formatted_address'] = googlePlace.formatted_address
          place['opening_hours'] = googlePlace.opening_hours

          places.push(place);
        }
        callback(places)
      })
      .catch(error => {
        console.log(error);
      });
  }
}