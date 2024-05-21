import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lati, setLatitude] = useState(null);
  const [longi, setLongitude] = useState(null);

 const bounds = {
  north: -22.9138,
  south: -22.9145,
  west: -47.0687,
  east: -47.0679,
};

  const fixedPoint1 = {
    latitude: -22.914099,  
    longitude: -47.068040,
  };

  const fixedPoint2 = {
    latitude: -22.914228,  
    longitude: -47.068679,
  };

  const banheiroMasc ={
    latitude: -22.914140,  
    longitude: -47.06862,
  };

  const banheiroFem = {
    latitude: -22.914166,  
    longitude: -47.068355,
  };

  const banheiroUnisex = {
    latitude: -22.914065,  
    longitude: -47.068299,
  };

  const salaMDI = {
    latitude: -22.914106,  
    longitude: -47.068242,
  };

  const coordPed = {
    latitude: -22.914154,
    longitude: -47.068331,
  };

  const calculatePosition = (latitude, longitude) => {
    if (!latitude || !longitude) return { top: '50%', left: '50%' };

    if (latitude < bounds.south || latitude > bounds.north || longitude < bounds.west || longitude > bounds.east) {
      return { top: '50%', left: '50%' };
    }

    const top = ((bounds.north - latitude) / (bounds.north - bounds.south)) * 100;
    const left = ((longitude - bounds.west) / (bounds.east - bounds.west)) * 100;

    return { top: `${top}%`, left: `${left}%` };
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 200,
        distanceInterval: 0.1,
      }, (newLocation) => {
        setLocation(newLocation.coords);
        setLatitude(newLocation.coords.latitude);
        setLongitude(newLocation.coords.longitude);
      });
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        {location && <View style={[styles.bolinha, calculatePosition(location.latitude, location.longitude)]} />}
        <View style={[styles.fixedPoint1, calculatePosition(fixedPoint1.latitude, fixedPoint1.longitude)]} />
        <View style={[styles.fixedPoint2, calculatePosition(fixedPoint2.latitude, fixedPoint2.longitude)]} />

        <View style={styles.container}>
      <View style={styles.map}>
        {location && (
          <View style={[styles.bolinha, calculatePosition(location.latitude, location.longitude)]} />
        )}
        <View style={[styles.fixedPoint1, calculatePosition(fixedPoint1.latitude, fixedPoint1.longitude)]} />
        <View style={[styles.fixedPoint2, calculatePosition(fixedPoint2.latitude, fixedPoint2.longitude)]} />
      </View>

      <Text style={styles.localizacao}>Minha Latitude: {lati}</Text>
      <Text style={styles.localizacao}>Minha Longitude: {longi}</Text>
      <Text style={styles.localizacao}>Minha temperatura: {longi}</Text>
      
      <View style={styles.legendaContainer}>
        <View style={styles.legenda1}></View>
        <Text>Escada de emergência A</Text>
      </View>
      
      <View style={styles.legendaContainer}>
        <View style={styles.legenda2}></View>
        <Text>Escada de emergência B</Text>
      </View>
    </View>
      <View style={[styles.banheiroMasc, calculatePosition(banheiroMasc.latitude, banheiroMasc.longitude)]} />
      <View style={[styles.banheiroFem, calculatePosition(banheiroFem.latitude, banheiroFem.longitude)]} />
      <View style={[styles.banheiroUnisex, calculatePosition(banheiroUnisex.latitude, banheiroUnisex.longitude)]} />
      <View style={[styles.salaMDI, calculatePosition(salaMDI.latitude, salaMDI.longitude)]} />
      </View>
      <Text>Latitude: {lati}</Text>
      <Text>Longitude: {longi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:20,
    padding: 20,
  },
  map: {
    position: 'relative',
    width: width - 40,
    height: height / 1.5,
    backgroundColor: '#e0e0e0', // Substitua pela sua imagem de mapa
    borderRadius: 10,
  },
  bolinha: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  localizacao:{
    top:10,
    fontWeight:'bold',
    textAlign:'center',
    alignItems:'center',
    justifyContent: 'center'
  },
  fixedPoint1: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], // Corrigido o deslocamento para o ponto fixo
  },
  fixedPoint2: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], // Corrigido o deslocamento para o ponto fixo
  },
  legenda1: {
    marginRight: 5,
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 1,
  },
  legenda2: {
    marginRight: 5,
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 1,
  },
  legendaContainer: {
    flexDirection: 'row',
    top: 30,
    alignItems: 'center',
    marginVertical: 5, 
  },

  banheiroMasc:{
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'purple',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  banheiroFem:{
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'pink',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  banheiroUnisex:{
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  salaMDI:{
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'brown',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  }

});