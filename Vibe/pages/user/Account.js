import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {connect} from 'react-redux'
import {useTheme} from '@react-navigation/native';
import {logout} from '../../services/authServices'
import Button from '../../components/Button'

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginHorizontal:'5%',
      marginTop:'5%',
      alignItems:'center',
    },
    header:{
      fontSize:32,
      fontWeight:'bold',
      marginBottom:'7%',
      marginTop:'14%',
      textAlign:'center'
    }
});

function Account (props) {

  let theme = useTheme()
  let colors = theme.colors

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Your Account
        </Text>
        <Button 
          backgroundColor={colors.error}
          title='Logout'
          onPress={()=>logout(props.dispatch)}/>
      </View>
    </ScrollView>
  );
};
function mapState(state){
    return{
      order: state.order
    }
  }
  
  function mapDispatch(dispatch){
    return{
      dispatch: (data) => dispatch(data)
    }
  }
export default connect(mapState, mapDispatch)(Account);