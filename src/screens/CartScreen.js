/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
  Pressable,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {windowWidth} from '../utils/Dimensions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMyProductToCart,
  removeMyProductFromCart,
} from '../../store/slices/MyCartSlice';
import RazorpayCheckout from 'react-native-razorpay';
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myCartItems = useSelector(state => state.cart);
  const [isOpen, setOpen] = useState(false);
  const [street, setStreet] = useState('Plot No - 1328');
  const [adrress, setAdrress] = useState('Mahanadivihar');
  const [pincode, setPincode] = useState('753004');
  const [mobile, setMobile] = useState('+917894084633');
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      street: 'Plot No - 1328',
      address: 'Mahanadivihar',
      pincode: '753004',
      mobile: '+917894084633',
    },
    {
      id: 2,
      street: 'Plot No - 452',
      address: 'Laxmisagar',
      pincode: '753005',
      mobile: '+917894084634',
    },
    {
      id: 3,
      street: 'Plot No - 789',
      address: 'Bidanasi',
      pincode: '753006',
      mobile: '+917894084635',
    },
    {
      id: 4,
      street: 'Plot No - 201',
      address: 'CDA Sector 7',
      pincode: '753014',
      mobile: '+917894084636',
    },
  ]);

  const handleRemoveFromCart = item => dispatch(removeMyProductFromCart(item));
  const handleAddToCart = item => dispatch(addMyProductToCart(item));
  const toggleSheet = () => {
    setOpen(!isOpen);
    offset.value = 0;
  };
  const offset = useSharedValue(0);
  const translateY = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });
  const pan = Gesture.Pan()
    .onChange(event => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-20, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < 400 / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(400, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });
  const renderItem = ({item}) => (
    <CartItem
      item={item}
      onAdd={() => handleAddToCart(item)}
      onRemove={() => handleRemoveFromCart(item)}
    />
  );

  const cartTotal = myCartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const gst = Math.floor(0.18 * cartTotal);
  const orderTotal = cartTotal + gst;

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header navigation={navigation} />
      <CartItemsList myCartItems={myCartItems} renderItem={renderItem} />
      <SelectAddress
        toggleSheet={toggleSheet}
        street={street}
        adrress={adrress}
        pincode={pincode}
        mobile={mobile}
      />
      <CartSummary
        cartTotal={cartTotal}
        gst={gst}
        orderTotal={orderTotal}
        navigation={navigation}
        street={street}
        mobile={mobile}
        pincode={pincode}
      />
      {isOpen && (
        <>
          <AnimatedPressable
            style={styles.backdrop}
            onPress={toggleSheet}
            exiting={FadeOut}
            entering={FadeIn}
          />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[styles.sheet, translateY]}
              entering={SlideInDown.springify().damping(15)}
              exiting={SlideOutDown}>
              {/* <View
                style={{
                  paddingHorizontal: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 40,
                  alignSelf: 'center',
                  width: '98%',
                  marginBottom: 5,
                  borderColor: '#AD40AF',
                  borderBottomWidth: 1,
                }}>
                <View style={{width: '80%'}}>
                  <Text style={{color: 'black', fontSize: 12}}>
                    Plot No - 1328, Mahandivihar, Cuttack
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    toggleSheet();
                  }}
                  style={{
                    width: '20%',
                    backgroundColor: '#AD40AF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 2,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontSize: 12}}>Select</Text>
                </TouchableOpacity>
              </View> */}
              <FlatList
                data={addresses}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      paddingHorizontal: 5,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      height: 40,
                      alignSelf: 'center',
                      width: '98%',
                      marginBottom: 5,
                      borderColor: 'rgba(173, 64, 175, 0.2 )',
                      borderBottomWidth: 1,
                    }}>
                    <View style={{width: '80%'}}>
                      <Text style={{color: 'black', fontSize: 12}}>
                        {`${item.street}, ${item.address}, ${item.pincode}`}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        toggleSheet();
                        setStreet(item.street);
                        setAdrress(item.address);
                        setPincode(item.pincode);
                        setMobile(item.mobile);
                      }}
                      style={{
                        width: '20%',
                        backgroundColor: '#AD40AF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 2,
                        borderRadius: 5,
                      }}>
                      <Text style={{color: 'white', fontSize: 12}}>Select</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </Animated.View>
          </GestureDetector>
        </>
      )}
    </GestureHandlerRootView>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const SelectAddress = ({toggleSheet, street, adrress, pincode, mobile}) => (
  <View style={[styles.addressButton, {paddingHorizontal: 5}]}>
    <View style={{width: '80%'}}>
      <Text style={{color: 'black', fontSize: 12}}>
        {street}, {adrress}, {pincode}
      </Text>
      <Text style={{color: 'black', fontSize: 12}}>{mobile}</Text>
    </View>
    <TouchableOpacity
      onPress={() => {
        toggleSheet();
      }}
      style={{
        width: '20%',
        backgroundColor: '#AD40AF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        borderRadius: 5,
      }}>
      <Text style={{color: 'white', fontSize: 12}}>Change</Text>
    </TouchableOpacity>
  </View>
);

const CartItem = ({item, onAdd, onRemove}) => (
  <View style={styles.cartItem}>
    <Image source={item.poster} style={styles.cartItemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemText}>{item.subtitle}</Text>
      <Text style={styles.itemText}>{item.title}</Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
    </View>
    <QuantityControls onAdd={onAdd} onRemove={onRemove} qty={item.qty} />
  </View>
);

const Header = ({navigation}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require('../assets/images/back.png')}
        style={styles.backIcon}
      />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>Cart</Text>
  </View>
);

const CartItemsList = ({myCartItems, renderItem}) =>
  myCartItems.length > 0 ? (
    <FlatList
      data={myCartItems.filter(item => item.qty > 0)}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  ) : (
    <View style={styles.emptyCartContainer}>
      <Image
        source={require('../assets/images/emptycart.png')}
        style={styles.emptyCartImage}
      />
    </View>
  );

const CartSummary = ({cartTotal, gst, orderTotal, navigation, mobile, pincode, street}) => (
  <View style={styles.cartSummary}>
    <SummaryRow label="Subtotal" value={`₹${cartTotal}`} />
    <SummaryRow label="GST" value={`₹${gst}`} />
    <SummaryRow label="Order Total" value={`₹${orderTotal}`} />
    <TouchableOpacity
      style={styles.placeOrderButton}
      disabled={cartTotal === 0}
      // onPress={() => navigation.navigate('OrderAnimation')}
      onPress={() => {
        var options = {
          description: 'Demo Purchase of Game',
          //image: require('../assets/images/gamehop.png'),
          image: 'https://w7.pngwing.com/pngs/121/302/png-transparent-google-play-games-android-play-games-game-video-game-grass-thumbnail.png',
          currency: 'INR',
          key: 'rzp_test_g9NsAuKO5joYFd',
          amount: (orderTotal * 100).toString(),
          name: 'Gamehop',
          order_id: '',
          prefill: {
            email: 'alpha.codes@example.com',
            contact: mobile,
            name: 'Alpha Codes',
          },
          theme: {color: '#FFFED7'},
        };
        RazorpayCheckout.open(options)
          .then(data => {
            // handle success
            // Alert.alert(`Success: ${data.razorpay_payment_id}`);
            console.log(`Success: ${data.razorpay_payment_id}`);
            navigation.navigate('OrderAnimation')
          })
          .catch(error => {
            // handle failure
            // Alert.alert(`Error: ${error.code} | ${error.description}`);
            console.error(`Error: ${error.code} | ${error.description}`);
          });
      }}>
        {console.log(`orderTotal===>${orderTotal*100}`,orderTotal)}
      <Text style={styles.placeOrderText}>
        {cartTotal > 0 ? 'Place Order' : 'No Items'}
      </Text>
    </TouchableOpacity>
  </View>
);

const SummaryRow = ({label, value}) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryText}>{label}</Text>
    <Text style={styles.summaryText}>{value}</Text>
  </View>
);

const QuantityControls = ({onAdd, onRemove, qty}) => (
  <View style={styles.quantityControls}>
    <TouchableOpacity style={styles.quantityButton} onPress={onRemove}>
      <Text style={styles.quantityText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.quantity}>{qty}</Text>
    <TouchableOpacity style={styles.quantityButton} onPress={onAdd}>
      <Text style={styles.quantityText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFED7',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: wp(90),
    marginHorizontal: wp(5),
  },
  cartItemImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 8,
  },
  itemDetails: {
    width: windowWidth - 220,
  },
  itemText: {
    color: 'black',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  itemPrice: {
    color: 'black',
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
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
  backIcon: {
    height: 40,
    width: 40,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 10,
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartImage: {
    height: 400,
    width: 400,
  },
  cartSummary: {
    height: hp(27),
    width: wp(100),
    backgroundColor: '#fcf1ff',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: 1,
    borderColor: '#AD40AF',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryText: {
    color: 'black',
    fontSize: 14,
  },
  placeOrderButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AD40AF',
    height: 40,
    width: '100%',
    borderRadius: 20,
  },
  addressButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    alignSelf: 'center',
    width: '98%',
    borderRadius: 5,
    marginBottom: 5,
    borderColor: '#AD40AF',
    borderWidth: 1,
  },
  placeOrderText: {
    color: 'white',
    fontSize: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
  },
  quantityButton: {
    height: 30,
    backgroundColor: '#AD40AF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    borderRadius: 10,
  },
  quantityText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  quantity: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    height: 400,
    width: '100%',
    position: 'absolute',
    bottom: -20 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
    borderColor: '#AD40AF',
    borderWidth: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
});

export default CartScreen;
