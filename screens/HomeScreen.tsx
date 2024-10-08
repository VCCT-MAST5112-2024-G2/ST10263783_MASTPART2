// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>([]);

  useEffect(() => {
    // Check if newItem exists and is defined in route.params
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem as { dishName: string; description: string; course: string; price: number }]);
    }
  }, [route.params?.newItem]);
  

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
      <Text style={styles.title}>Christoffel's Diner</Text>
      <View style={styles.navlinks}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMenu')}>
          <Text style={styles.buttonText}>Add Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FilterMenu')}>
          <Text style={styles.buttonText}>Filtered Menu</Text>
        </TouchableOpacity>
      </View>
      
      <Text>Total Menu Items: {menuItems.length}</Text>

      <FlatList style={{ width: '100%' }}
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishNameandCourse}>{item.dishName} - {item.course}</Text>
            <Text style={styles.dishDescriptionText}>{item.description}</Text>
            <Text>R {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  navlinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  button: {
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  dishNameandCourse: {
    fontSize: 18,
    marginBottom: 5,
  },
  dishDescriptionText: {
    marginBottom: 5,
  },
});