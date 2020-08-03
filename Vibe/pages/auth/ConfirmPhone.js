import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  View
} from 'react-native';
import {connect} from 'react-redux'
import {setError} from '../../redux/actions/authActions'
import { useTheme} from '@react-navigation/native';
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
    marginBottom:'5%',
    textAlign:'center'
  },
  title:{
    fontSize:60,
    fontWeight:'bold',
    textAlign:'center',
    color:'mediumseagreen'
  }
})

function ConfirmPhone (props) {
    const [code, setCode] = useState('')
    const [notice, setNotice] = useState('')

    const params = props.route != null && props.route.params != null && props.route.params
    const name = params && params.name
    const email = params && params.email
    const password = params && params.password

    const confirmCode = async () => {
        var re = /^\d+$/;
        if(re.test(String(code))){
            //return await confirmPhone()
            return {status:"succeeded"}
        }else{
            return null
        }
    }

    const handleConfirm = async () =>{
        const res = await confirmCode()
        if(res != null && res.status == "succeeded"){
            if(name == null || email == null || password == null){
                setNotice('Fields missing')
                return
            }
            const signedUp = await signUp(props.dispatch, name, email, password)
            if(signedUp != null){
                setNotice('Sign up worked')
                props.navigation.navigate("Landing")
            }else{
                setNotice('error signing this user up')
            }
        }else{
            setNotice("Code did not match")
        }
    }

    let theme = useTheme()
    let colors = theme.colors

    const textStyle = [styles.text]
    textStyle.push({color: colors.primary})

    return (
        <SafeAreaView style={styles.main}>        
            <Text style={styles.title}>VIBE</Text>
            <Text style={textStyle}>Confirm Phone Number</Text>
            <View marginBottom='5%' style={styles.container}>
                <Text style={styles.text}>
                    We sent you a confirmation code via text, please enter below:
                </Text>
                <TextInput
                    placeholder='Enter Confirmation Code'
                    onChange={setCode}/>
            </View>
            {notice != '' ? (<Text>{notice}</Text>):(null)}
            <Button 
            title='Confirm Phone Number' 
            onPress={handleConfirm}
            backgroundColor={colors.primary}
            />
        </SafeAreaView>
    );
};

function mapState(state){
  return{
    user: state.auth.user,
    error: state.auth.error,
  }
}

function mapDispatch(dispatch){
  return{
    dispatch: (data) => dispatch(data),
    setError: (error) => dispatchEvent(setError(error))
  }
}

export default connect(mapState, mapDispatch)(ConfirmPhone);