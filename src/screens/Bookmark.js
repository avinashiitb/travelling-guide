import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Linking } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import { List, Divider, Badge, Button } from 'react-native-paper';
import { Fontisto, FontAwesome, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';


const GOOGLE_PLACES_API_KEY = 'AIzaSyDrIC6rsoT9UnzH8N-3ZJJvEsyBAvxGle8';

const BookmarkScreen = () => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });
  const [currentMarker, setCurrentMarker] = useState({});
  const [bookmark, setBookmark] = useState([]);

  const refRBSheet = useRef();
  const contactInfo = {
    fbLink :"https://www.facebook.com/ritzcarltonnycentralpark/",
    phone:"+1 212-308-9100",
    website:"https://www.ritzcarlton.com/en/hotels/new-york/central-park"
  }

  const onPress = (data, details) => {
    fetchAllNearbyPOI(details.geometry.location.lat, details.geometry.location.lng);
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
  };
  const [nearbyPOI, setNearbyPOI] = useState([]);

  const fetchAllNearbyPOI = async (lat, lng) => {
    const response = await axios.get(
      `http://placesapi-env-1.eba-g2hb9s5e.us-east-1.elasticbeanstalk.com/api/places/getAllNearByPOI?lat=${lat}&long=${lng}`
    );
    setNearbyPOI(response.data);
  };
  console.log(nearbyPOI);
  const _OnClick = (marker) => {
    setCurrentMarker(marker);
    refRBSheet.current.open()
  }
  const _Bookmark = (data) => {
    bookmark.push(data);
    setBookmark(bookmark);
  }
  const ratingStar = [];
  let ratingValue = currentMarker.rating;
  for (let i = 0; i < 5; i++) {
    if (ratingValue - i >= 1) {
      ratingStar.push(<FontAwesome key={i} name="star" size={17} color={'#d4af37'} />);
    } else if (ratingValue - i < 1 && ratingValue - i > 0) {
      ratingStar.push(<FontAwesome name="star-half" size={17} color={'re#d4af37'} />);
    } else {
      ratingStar.push(<FontAwesome name="star-o" size={17} color={'#d4af37'} />);
    }

  }
  return (
    <View style={styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  thumbnail: {
    // flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'cover'
  },
});

export default BookmarkScreen;
