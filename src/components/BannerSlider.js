import React from 'react'
import { StyleSheet, Text,Image, View } from 'react-native'


const BannerSlider = ({data}) => {
    return (
        <View style={{borderRadius:10}}>
        <Image source={data.image} 
        style={{width:300, height:150, 
        }}/>
        </View>
    )
}

export default BannerSlider

const styles = StyleSheet.create({})
