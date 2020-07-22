import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
    container:{
        flexGrow:1,
        justifyContent:'center'
    },
    logo:{
      height:'50%',
      width:'100%',
      alignSelf:'center',
      resizeMode:'contain',
    },
    title:{
      fontSize:60,
      fontWeight:'bold',
      textAlign:'center',
      color:'mediumseagreen'
    }
})

function Splash (props) {

  let theme = useTheme()
  let colors = theme.colors

  return (
    <>
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>VIBE</Text>
        <ActivityIndicator size='large' color={colors.primary}/>
    </SafeAreaView>
    </>
  );
};

export default Splash;