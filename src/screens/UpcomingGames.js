/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity,
  SafeAreaView, ActivityIndicator, Animated,
  Image,
  TextInput,
  Keyboard
} from 'react-native';
import { getGamesList } from '../api';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function UpcomingGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const focusedItemIds = useRef(new Set()).current; // Use useRef to persist focused IDs across renders
  const navigation = useNavigation();
  const opacityValues = useRef(new Map()).current; // Map to store animated values
  const textOpacityValues = useRef(new Map()).current; // Map to store animated values for text containers
  const [term, setTerm] = useState('');
  const handleSearchclose = () => {
    Keyboard.dismiss();
    setTerm('');
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    const newFocusedIds = new Set(viewableItems.slice(0, 3).map(item => item.item.id));
    games.forEach(game => {
      const isFocused = newFocusedIds.has(game.id);
      if (!opacityValues.has(game.id)) {
        opacityValues.set(game.id, new Animated.Value(0.5));
      }
      if (!textOpacityValues.has(game.id)) {
        textOpacityValues.set(game.id, new Animated.Value(0)); // Initialize with 0 for text
      }

      // Update item container opacity
      Animated.timing(opacityValues.get(game.id), {
        toValue: isFocused ? 1 : 0.5,
        duration: 500,
        useNativeDriver: true
      }).start();

      // Update text container opacity
      Animated.timing(textOpacityValues.get(game.id), {
        toValue: isFocused ? 1 : 0,
        duration: 500,
        useNativeDriver: true
      }).start();
    });

    focusedItemIds.clear();
    newFocusedIds.forEach(id => focusedItemIds.add(id));
  };

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getGamesList();
      // console.log("data====>",JSON.stringify(data) )
      if (data.length > 0) {
        setLoading(false);
        setGames(data);
        data.forEach(game => {
          opacityValues.set(game.id, new Animated.Value(0.2));
          textOpacityValues.set(game.id, new Animated.Value(0));
        });
      }
    };

    fetchGames();
  }, []);
  // const filteredGamesFunction = useCallback(
  //   () =>
  //     myProducts.filter(({title}) => {
  //       console.log('name.includes(term)=======>', title.indexOf(term));
  //       return title.indexOf(term) >= 0;
  //     }),
  //   [],
  // );
  // useEffect(() => {
  //   setsearchResultGame(filteredGamesFunction());
  // }, [filteredGamesFunction]);

  const renderItem = ({ item }) => {
    const opacity = opacityValues.get(item.id) || new Animated.Value(0.2);
    const textOpacity = textOpacityValues.get(item.id) || new Animated.Value(0);

    return (
      <Animated.View style={[styles.itemContainer, { opacity }]}>
        <ImageBackground source={{ uri: item.background_image }} resizeMode="cover" style={styles.image}>
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
            <Text style={[styles.title,{borderTopRightRadius: 5, borderTopLeftRadius: 5, paddingTop:2, paddingLeft:2}]}>{item.name}</Text>
            <Text style={[styles.subtitle,{borderBottomRightRadius: 5, borderBottomLeftRadius: 5,paddingBottom:2, paddingLeft:2}]}>Released: {item.released}</Text>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFED7' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Games</Text>
      </View>
      {loading && (
        <View style={{ flex: 1, backgroundColor: '#FFFED7', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      {!loading &&
      
      <View style={styles.v2}>
          <TouchableOpacity
            onPress={() => {
              term.length > 0 && handleSearchclose();
            }}>
            {term.length > 0 ? (
              <AntDesign
                name="close"
                size={25}
                color="#AD40AF"
                style={{marginLeft: 5}}
              />
            ) : (
              <Feather
                name="search"
                size={25}
                color="#AD40AF"
                style={{marginLeft: 5}}
              />
            )}
          </TouchableOpacity>
          <TextInput
            style={{
              fontSize: 16,
              backgroundColor: 'white',
              flex: 1,
              borderRadius: 8,
              textAlign: 'left',
              color: 'black',
            }}
            placeholder="Search"
            placeholderTextColor={'lightgrey'}
            onChangeText={text => setTerm(text)}
            value={term}
            //onPressIn={() => setActivateSearch(true)}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
      }
      
      <FlatList
        data={games}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    backgroundColor: '#FFFED7',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: '30%',
  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignSelf:'flex-end',
    justifyContent:'flex-end'
    //backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'rgba(252, 241, 255 , 0.5)',
    paddingHorizontal:2,
    paddingTop:2
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'rgba(252, 241, 255 , 0.5)',
    paddingHorizontal:2,
    paddingBottom:2
  },
  backIcon: {
    height: 40,
    width: 40,
  },
  header: {
    backgroundColor: '#fcf1ff',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(7),
    width: wp(100),
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#AD40AF',
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
  },
  image: {
    flex: 1,
    height: hp(25),
    justifyContent: 'center',
  },
  v2: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#AD40AF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
});
