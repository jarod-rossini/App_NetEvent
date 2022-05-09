import { StyleSheet, Button, View, Text } from 'react-native';
import React from 'react';

function HomeScreen({ navigation }) {
  return (
    <View>
        <Text>HomeScreen</Text>
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Detail')}
        />
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({})