import React, {useState} from 'react';

import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  View
} from 'react-native';
import {connect} from 'react-redux'
import {setError} from '../../redux/actions/authActions'
import { useTheme} from '@react-navigation/native';
import { Header } from '@react-navigation/stack';
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import {signUp} from '../../services/authServices'


const styles = StyleSheet.create({
  main:{
    flexGrow:1,
    alignItems:'center',
    marginHorizontal:'10%',
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  container:{
    width:'100%',
    height:'40%',
    justifyContent:'space-around',
  },
  logo:{
    height:'40%',
    width:'100%',
    alignSelf:'center',
    resizeMode:'contain',
  },
  textInput:{
    width:'100%',
    fontSize:24,
    paddingHorizontal:'5%',
    marginVertical:'2%',
    height:'5%',
  },
  text:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:'5%'
  },
  title:{
    fontSize:60,
    fontWeight:'bold',
    textAlign:'center',
    color:'mediumseagreen'
  }
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function SignUp (props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [notice, setNotice] = useState('')
  
    const handleSignUp = async () =>{
      if(email != '' && name != '' && password != '' && confirmPassword != '' && password == confirmPassword && validateEmail(email)){
        props.navigation.navigate('ConfirmPhone',{
          name: name,
          password: password,
          email: email
        })
      }else{
          if(password == '' || email == '' || password == '' || confirmPassword == ''){
          setNotice('Please fill out all fields')
          }else if(!validateEmail(email)&&email != ''){
          setNotice('Username is not a valid email')
          if(password != confirmPassword){
              setNotice(notice + ' and passwords do not match')
          }
          }else{
          setNotice('Passwords do not match')
          }
      }
    }

  let theme = useTheme()
  let colors = theme.colors

  const textStyle = [styles.text]
  textStyle.push({color: colors.primary})

  return (
    <SafeAreaView style={styles.main}>        
        <Text style={styles.title}>VIBE</Text>
        <Text style={textStyle}>User Registration</Text>
        <KeyboardAvoidingView marginBottom='5%' 
        style={styles.container} 
        behavior='height'   
        keyboardVerticalOffset = {Header.HEIGHT}>
          <TextInput
            placeholder='Name'
            onChange={setName}/>
          <TextInput
            placeholder='Email'
            onChange={setEmail}/>
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            onChange={setPassword}/>
          <TextInput
            placeholder='Confirm Password'
            secureTextEntry={true}
            onChange={setConfirmPassword}/>
        </KeyboardAvoidingView>
        {notice != '' ? (<Text>{notice}</Text>):(null)}
        <Button 
          title='Sign Up' 
          onPress={handleSignUp}
          backgroundColor={colors.primary}
          />
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
    setError: (error) => dispatchEvent(setError(error))
  }
}

export default connect(mapState, mapDispatch)(SignUp);