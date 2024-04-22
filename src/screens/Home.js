/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import BannerSlider from '../components/BannerSlider';
import Carousel from 'pinar';

import {freeGames, paidGames, sliderData} from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
//import ListItem from '../components/ListItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {windowWidth} from '../utils/Dimensions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addMyProducts} from '../../store/slices/MyProductSlice';
import {addMyProductToCart} from '../../store/slices/MyCartSlice';

const Home = ({navigation}) => {
  const [gamesTab, setGamesTab] = useState(1);
  const [bottomCart, setBottomCart] = useState(false);
  const [plusMinus, setPlusMinus] = useState('');
  const [searchResultGame, setsearchResultGame] = useState([]);
  const [activateSearch, setActivateSearch] = useState(false);

  const dispatch = useDispatch();

  const myProducts = useSelector(state => state.product);
  const myCartItems = useSelector(state => state.cart);
  console.log('myProducts from redux ++=========>', myProducts);
  console.log('myCartItems from redux ++=========>', myCartItems);

  useLayoutEffect(() => {
    if (myProducts.length == 0) {
      for (let i = 0; i < paidGames.length; i++) {
        dispatch(addMyProducts(paidGames[i]));
      }
    }
  }, []);

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  useEffect(() => {
    const disableBackButton = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', disableBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, []);

  const renderItem = ({item, index}) => {
    console.log('render item ================>', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Image
            source={item.poster}
            style={{
              width: 55,
              height: 55,
              borderRadius: 10,
              marginRight: 8,
            }}
          />
          <View style={{width: windowWidth - 220}}>
            <Text
              style={{
                color: 'black',

                fontSize: 14,
              }}>
              {item.subtitle}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: 'black',

                fontSize: 14,
                textTransform: 'uppercase',
              }}>
              {item.title}
            </Text>
            {gamesTab === 1 ? (
              <Text
                numberOfLines={1}
                style={{
                  color: 'black',
                  fontWeight: '700',
                  fontSize: 14,
                  textTransform: 'uppercase',
                }}>
                ₹{item.price}
              </Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#AD40AF',
            padding: 10,
            width: 100,
            borderRadius: 10,
          }}
          disabled={gamesTab === 2}
          onPress={() => {
            setBottomCart(true);
            dispatch(addMyProductToCart(item));
          }}>
          {myCartItems.some(check => check.id === item.id && check.qty > 0) && (
            <View
              style={{
                position: 'absolute',
                top: -10,
                left: -10,
                zIndex: 9999,
                flexDirection: 'row',
                backgroundColor: 'black',
                borderRadius: 5,
                padding: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, color: 'white'}}>
                {myCartItems.find(check => check.id === item.id).qty}
              </Text>

              <Image
                source={require('../assets/images/cart.png')}
                style={{height: 20, width: 20}}
              />
            </View>
          )}

          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 14,
            }}>
            {item.isFree === 'Yes' && 'PLAY'}
            {item.isFree === 'No' && 'ADD'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFED7',
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hello Alpha</Text>
      </View>

      <View
        style={{
          height: hp(25),
          marginBottom: 15,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <View style={styles.v3}>
          <Text style={styles.t2}></Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => {
              navigation.navigate('Upcoming');
            }}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <Carousel
          loop={true}
          autoplay={true}
          showsControls={false}
          style={styles.carousel}>
          {sliderData.map(img => (
            <Image style={styles.image} source={img.image} key={img.title} />
          ))}
        </Carousel>
      </View>

      <View style={{width: wp(90), alignSelf: 'center', marginBottom: 20}}>
        <CustomSwitch
          selectionMode={1}
          option1="Paid Games"
          option2="Free To Play"
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      <FlatList
        //data={gamesTab == 1 ? myProducts : freeGames}
        data={
          gamesTab === 1 && searchResultGame.length === 0
            ? myProducts
            : searchResultGame.length > 0 && gamesTab === 1
            ? searchResultGame
            : freeGames
        }
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: myCartItems.length > 0 ? 80 : 0}}
        style={{
          width: wp(90),
          alignSelf: 'center',
          height: hp(40),
        }}
      />

      {gamesTab === 1 &&
        bottomCart === true &&
        myCartItems.length > 0 &&
        myCartItems.some(check => check.qty > 0) && (
          <View
            style={{
              position: 'absolute',
              width: wp(90),
              borderRadius: 10,
              bottom: 10,
              height: 55,
              backgroundColor: '#AD40AF',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              alignItems: 'center',
              alignSelf: 'center',
              zIndex: 9999,
            }}>
            <View>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
                Items Added ({myCartItems.length})
              </Text>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
                ₹
                {myCartItems.reduce((accumulator, item) => {
                  return (
                    accumulator + parseInt(item.price) * parseInt(item.qty)
                  );
                }, 0)}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 60,

                flexDirection: 'row',
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Text style={{fontColor: '#fff', fontWeight: 'bold'}}>
                View Cart
              </Text>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  sfav: {
    flex: 1,
    backgroundColor: '#FFFED7',
    padding: 20,
  },
  v1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  t1: {
    fontSize: 20,
    color: '#AD40AF',
    fontFamily: 'BeVietnamPro-ExtraBoldItalic',
  },
  v2: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#AD40AF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  v3: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    top: 5,
    paddingRight: 5,
    width: '100%',
    zIndex: 1000,
  },
  t2: {fontSize: 18, fontWeight: '500', color: '#AD40AF'},
  seeAllButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#AD40AF',
  },
  seeAllText: {
    color: '#AD40AF',
    fontWeight: 'bold',
  },
  carousel: {
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
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
  backIcon: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
});
