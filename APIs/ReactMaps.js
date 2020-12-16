YOUR_API_KEY = 'AIzaSyAnU7Zr8HxyX9pGfcc7hytRKdfQG9AXk5Q'

export default class ReactMaps {
    
    static getLocationByName = (nome, callback) => {
        var encodedName = nome.replace(/ /gi, '+')
        const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?input=' + encodedName + '&radius=10' + '&key=' + YOUR_API_KEY
        fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        var places = [] // This Array WIll contain locations received from google
        for(let googlePlace of res.results) {
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

          places.push(place);
        }
        callback(places)
      })
      .catch(error => {
        console.log(error);
      });
    
  }
 
    static getNearbyLocation = (latitude,longitude ,radius,callback) => {
      const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&key=' + YOUR_API_KEY
      fetch(url)
    .then(res => {
      return res.json()
    })
    .then(res => {
      var places = [] // This Array WIll contain locations received from google
      for(let googlePlace of res.results) {
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

        places.push(place);
      }
      callback(places)
    })
    .catch(error => {
      console.log(error);
    });

  }

    static getLocationByType = (type, callback) => {
      const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?type=' + type + '&radius=10' + '&key=' + YOUR_API_KEY
      fetch(url)
    .then(res => {
      return res.json()
    })
    .then(res => {
      var places = [] // This Array WIll contain locations received from google
      for(let googlePlace of res.results) {
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

        places.push(place);
      }
      callback(places)
    })
    .catch(error => {
      console.log(error);
    });

  }
}