/*
  THIS IS THE APP FILE THAT HOLDS THE ENTIRE APPLICATION.
  HERE WE FIND THE HIGHER ABSTRACT LAYER OF THE APP.
  -------------------------------------------------------
  STRUCTURE: 
    1) SCREENS - TAB.NAVIGATION
      i)    HOME_SCREEN - START 
      ii)   SETTINGS
      iii)  SENSORS - UTILS
      iv)   MAP
    2) ANIMATIONS
  --------------------------------------------------------

  Unpublished Work © 2023 Minas Kosmidis
*/

import React from 'react';
import { StyleSheet,} from 'react-native';

// Sensors
import PDRApp from './components/PDR/pedestrianDeadReckoning'; 

export default function App() {
  return(
    <PDRApp />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "50%",
    height: 100
  },
  navigationIcons: {
    height: 23
  },
  container: {
    alignItems: 'center'
  },
  externalContainer: {
    flex: 1,
    backgroundColor: "#081f41"
  }
});