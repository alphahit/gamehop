// import React from 'react';
// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// const ListItem = ({photo, title, subTitle, isFree, price, onPress, setBottomCart, bottomCart}) => {
//   return (
//     <View style={styles.v1}>
//       <View style={styles.v2}>
//         <Image
//           source={photo}
//           style={styles.img1}
//         />
//         <View style={{width: windowWidth - 220}}>
//           <Text style={styles.t1}>{subTitle}</Text>
//           <Text numberOfLines={1} style={styles.t2}>{title}</Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.to1}
      
//       onPress={() =>{
//         isFree == 'No' &&  setBottomCart(true);
//       }}
//       >
//         <Text style={styles.txt1}>
//           {isFree == 'Yes' && 'Play'}
//           {isFree == 'No' && price}

//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ListItem;

// const styles = StyleSheet.create({
//   v1: {
   
//   },
//   v2: {
    
//   },
//   img1: {
   
//   },
//   t1: {
    
//   },
//   t2: {
   
//   },
//   to1: {
    
//   },
//   txt1: {
   
//   },
// });
