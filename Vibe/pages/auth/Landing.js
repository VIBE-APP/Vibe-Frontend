import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux'
import {logIn} from '../../services/authServices.js'
import {setError} from '../../redux/actions/authActions'
import { useTheme} from '@react-navigation/native';
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'

const styles = StyleSheet.create({
    main:{
      flex:1,
      alignItems:'center',
      marginHorizontal:'10%',
      marginBottom: '15%',
      justifyContent:'center',
    },
    container:{
      width:'100%',
      height:'30%',
      justifyContent:'center',
    },
    logo:{
      height:'20%',
      width:'100%',
      alignSelf:'center',
      resizeMode:"cover",
    },
    or:{
      fontSize:18,
      marginVertical:'2%'
    },
    textInput:{
      width:'100%',
      fontSize:24,
      paddingHorizontal:'5%',
      marginVertical:'2%',
      height:'5%',
    },
    title:{
      fontSize:60,
      fontWeight:'bold',
      textAlign:'center',
      color:'mediumseagreen',
      marginBottom:"10%",
      marginTop:"20%",
    }
})

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Landing (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState('')

  let theme = useTheme()
  let colors = theme.colors

  const handleLogin = async () =>{
    if(email != '' && password != '' && validateEmail(email)){
        console.log('login called')
        await logIn(props.dispatch, email, password).then(res => {
          if(!res){
            props.setError('Server returned error')
          }
        }).catch(error => {
          props.setError(error.message || 'Error logging in')
        }).catch(e=>{
          console.log(e.message || 'error logging in')
        })
    }else{
      if(!validateEmail(email)&&email != ''){
        setNotice('Username is not a valid email')
      }else{
        setNotice('Please enter an email and password')
      }
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>VIBE</Text>
          <View marginBottom='10%' style={styles.container}>
            <TextInput
              placeholder='Email'
              onChange={setEmail}/>
            <TextInput
              placeholder='Password'
              secureTextEntry={true}
              onChange={setPassword}/>
          </View>
          {notice != '' ? (<Text>{notice}</Text>):(null)}
          <Button title='Login'
            onPress={handleLogin}
            backgroundColor={colors.secondary}
            textColor={colors.secondaryTextColor}
            />
          <Text style={styles.or}> - OR -  </Text>
          <Button 
            title='Sign Up' 
            onPress={() => props.navigation.navigate('SignUp')}
            backgroundColor={colors.primary}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function mapState(state){
  return{
    user: state.auth.user,
    error: state.auth.error
  }
}

function mapDispatch(dispatch){
  return{
    dispatch: (data) => dispatch(data),
    setError: (error) => dispatch(setError(error))
  }
}

export default connect(mapState, mapDispatch)(Landing);