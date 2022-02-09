import React, { useState, useEffect, useRef } from 'react';
import { Appbar } from 'react-native-paper';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Linking } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import { List, Divider, Badge, Button } from 'react-native-paper';
import { Fontisto, FontAwesome, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import Background from '../components/Background';


const GOOGLE_PLACES_API_KEY = 'AIzaSyDrIC6rsoT9UnzH8N-3ZJJvEsyBAvxGle8';

const HomeScreen = () => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });
  const [currentMarker, setCurrentMarker] = useState({});
  const [bookmark, setBookmark] = useState([]);

  const refRBSheet = useRef();
  const contactInfo = {
    fbLink: "https://www.facebook.com/ritzcarltonnycentralpark/",
    phone: "+1 212-308-9100",
    website: "https://www.ritzcarlton.com/en/hotels/new-york/central-park"
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
    <>
      <Appbar.Header style={{ marginTop: 30 }} >
        {/* <Appbar.BackAction /> */}
        <Appbar.Action icon="gauge" />
        <Appbar.Content title="Conde Explorer" subtitle="" />
        <Appbar.Action icon={() => <FontAwesome name="bookmark-o" size={24} color="white" />} />
      </Appbar.Header>
      <Background styleProps={styles} >
        <View style={styles.background}>
          <MapView
            style={styles.map}
            region={{
              latitude: regionCoords.lat,
              longitude: regionCoords.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {nearbyPOI?.data?.map((marker, key) => (

              <MapView.Marker
                key={marker._id}
                coordinate={{ latitude: marker.location.coordinates[0], longitude: marker.location.coordinates[1] }}
                title={marker.name}
                onPress={() => _OnClick(marker)}
              // icon={require('./restaurant.webp')}
              >
                {
                  marker.category == "Restaurant" ? <Image source={require('./../assets/restaurant.webp')} style={{ height: 40, width: 35 }} />
                    : marker.category == "Hotel" ? <Image source={require('./../assets/hotel.png')} style={{ height: 40, width: 35 }} />
                      : <Image source={require('./../assets/store.png')} style={{ height: 50, width: 40 }} />
                }
                {/* <Image source={require('./restaurant.webp')} style={{height: 50, width:50 }} /> */}
              </MapView.Marker>
            ))}
          </MapView>

          <GooglePlacesAutocomplete
            styles={{
              textInputContainer: {
                width: "90%",
                top: 30,
                alignSelf: 'center'
              },
              textInput: {
                borderColor: '#1faadb',
                borderWidth: 1,
                borderRadius: 5,
                height: 48,
                paddingBottom: 8,
                color: '#000000',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            placeholder="Search"
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en', // language of the results
            }}
            GooglePlacesDetailsQuery={{
              fields: 'geometry',
            }}
            fetchDetails={true}
            onPress={onPress}
            onFail={(error) => console.error(error)}
            requestUrl={{
              url:
                'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
              useOnPlatform: 'web',
            }} // this in only required for use on the web. See https://git.io/JflFv more for details.
          />
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
              elevation: 15
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
          height={600}
        >
          {
            console.log(currentMarker.image)
          }
          {/* <Image source={{ uri: currentMarker.image }} style={styles.thumbnail} /> */}
          <Image
            style={styles.thumbnail}
            source={{
              uri: currentMarker.image
            }}
          />
          <List.Item
            title={currentMarker.name}
            description={currentMarker.type}
            left={props => <List.Icon {...props} icon={() =>
              currentMarker.category == "Hotel" ? <Fontisto name="hotel" size={24} color="black" /> :
                currentMarker.category == "Restaurant" ? <AntDesign name="rest" size={24} color="black" /> :
                  <MaterialIcons name="design-services" size={24} color="black" />
            } />}
          />
          <Text style={{ paddingLeft: 70, paddingBottom: 10 }}><Text style={{ paddingLeft: 40 }} >{currentMarker.rating} {ratingStar}</Text> </Text>
          <Divider />
          <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
            <Button style={{ paddingLeft: 10 }} icon={() => <Entypo name="facebook-with-circle" size={30} color="black" />} mode="text" onPress={() => Linking.openURL(contactInfo.fbLink)} />
            <Button style={{ paddingLeft: 10 }} icon={() => <Entypo name="network" size={30} color="black" />} mode="text" onPress={() => Linking.openURL(contactInfo.website)} />
            <Button style={{ paddingLeft: 10 }} icon={() => <FontAwesome name="phone" size={30} color="black" />} mode="text" onPress={() => Linking.openURL(`tel:${contactInfo.phone}`)} />
            <Button style={{ paddingLeft: 10 }} icon={() => <FontAwesome name="share-alt-square" size={30} color="black" />} mode="text" onPress={() => console.log('Pressed')} />
            <Button style={{ paddingLeft: 10 }} icon={() => <FontAwesome name="bookmark-o" size={24} color="black" />} mode="text" onPress={() => console.log('Pressed')} />
            {/* <Entypo name="facebook-with-circle" size={24} color="black" /> */}
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
            <Badge style={{ marginRight: 10 }}>AD</Badge>
            <Badge style={{ marginRight: 10 }}>50 % OFF</Badge>
            <Badge style={{ marginRight: 10 }}>Below $500</Badge>
          </View>
          <Divider />
          <List.Item
            title={currentMarker.address}
            left={props => <List.Icon style={{ marginLeft: -10, marginRight: -10 }} icon={() => <Entypo name="location-pin" size={24} color="black" />
            } />}
          />
          {/* <Text style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10, paddingLeft: 5 }}> <Entypo name="location-pin" size={24} color="black" /> {currentMarker.address} </Text> */}
          {/* <Text> {currentMarker?.price.currency} {currentMarker?.price.minprice} - {currentMarker?.price.maxprice} </Text> */}
        </RBSheet>

      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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

export default HomeScreen;
