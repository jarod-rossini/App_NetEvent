import React, { Component } from 'react';
import { StyleSheet, View, Platform, StatusBar, SafeAreaView } from 'react-native';

import InfoEvent from './src/molecules/InfoEvent/InfoEvent';
import Catégories from './src/molecules/Catégories/Catégorie';
import CreateEvent from './src/pages/CreateEvent';


const App = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {/* <InfoEvent/>
      <Catégories/> */}
      <CreateEvent/>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white'
  }
})

export default App;