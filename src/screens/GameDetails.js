/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Carousel from 'pinar';
const GameDetails = ({route}) => {
  // console.log('game===>', JSON.stringify(route));
  const navigation = useNavigation();
 

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{route.params.item.name}</Text>
      </View>
    <ScrollView style={styles.container}>
     

      <View style={styles.detailsContainer}>
        {route.params.item.genres.length > 0 && (
          <FlashList
            data={route.params.item.genres}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: 'grey',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  borderRadius: 10,
                }}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.flatListStyle}
            estimatedItemSize={5}
          />
        )}

        <View
          style={{
            height: hp(25),
            justifyContent: 'center',
            marginTop: 15,
          }}>
          {console.log(
            'route.params.item.short_screenshots====>',
            route.params.item.dominant_color,
          )}
          <Carousel
            loop={true}
            autoplay={true}
            showsControls={false}
            style={styles.carousel}>
            {route.params.item.short_screenshots.map(img => (
              <Image
                style={styles.image}
                source={{uri: img.image}}
                key={img.id.toString()}
              />
            ))}
          </Carousel>
        </View>

        {/* <FlatList
            data={route.params.item.short_screenshots}
            renderItem={({item}) => renderItem({item, type: 'screenshot'})}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.flatListStyle}
          /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderBottomEndRadius: 5,
            borderBottomStartRadius: 5,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderColor: '#AD40AF',
          }}>
          <Text style={styles.rating}> {route.params.item.rating} </Text>
          <AntDesign
            name="star"
            size={16}
            color="#FFE700"
            style={{marginLeft: 5}}
          />
        </View>

        <View style={styles.platforms}>
          <Text style={styles.platformLabel}>Platforms </Text>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {route.params.item.platforms.map(item => (
              <View
                key={item.platform.id.toString()}
                style={{backgroundColor: 'white', padding : 5, margin: 2, borderWidth:1, borderColor: '#AD40AF', borderRadius:50}}>
                <Text style={styles.platformText}>{item.platform.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.platforms}>
          <Text style={styles.platformLabel}>Tags</Text>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {route.params.item.tags.map(item => (
              <View
                key={item.id.toString()}
                style={{flexDirection:'row', alignItems: 'center', backgroundColor: 'white', padding : 5, margin: 2, borderWidth:1, borderColor: '#AD40AF', borderRadius:50}}>
                  <Text style={{ 
   color: '#AD40AF',
   fontSize: 12,}}> #</Text>
                <Text style={styles.platformText}> {item.name.toString().toLowerCase()}</Text>
              </View>
            ))}
          </View>
        </View>
        
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFED7',
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  rating: {
    color: 'black',
  },
  platforms: {
    marginTop: 10,
    alignItems: 'left',
  },
  platformLabel: {
    marginRight: 5,
    color: 'black',
    fontWeight: 'bold',
    
  },
  platformText: {
    marginRight: 10,
    color: 'black',
    fontSize: 12,
  },

  genreText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  tagLabel: {
    marginRight: 5,
    color: 'black',
  },
  tagText: {
    marginRight: 10,
    color: 'black',
  },
  screenshots: {
    marginTop: 10,
  },
  screenshotLabel: {
    marginBottom: 5,
    color: 'black',
  },
  screenshotContainer: {
    flexDirection: 'row',
  },
  screenshot: {
    width: 100,
    height: 50,
    marginRight: 10,
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
  // flatListStyle: {
  //   marginBottom: 10,
  // },
});

export default GameDetails;
