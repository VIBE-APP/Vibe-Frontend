import React from 'react'
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';

const styles = StyleSheet.create({
    inputContainer:{
        width:'100%',
        height:60,
        alignItems:'center',
        flexDirection:'row',
        marginVertical:'3%',
        borderRadius:10,
        paddingHorizontal:'7%',
    },
    textInput:{
        width:'100%',
        fontSize:20,
        height:'100%',
      }
});

class TInput extends React.Component {
    static defaultProps = {
        placeholder:"",
        textColor:"black",
        backgroundColor:"lightgray",
        onChange: () => {}
    }
    render () {
        const{placeholder, textColor, backgroundColor, secureTextEntry, onChange, style} = this.props
        const containerStyle = [styles.inputContainer]
        containerStyle.push({backgroundColor:backgroundColor})
        const textStyle = [styles.textInput]
        textStyle.push({color:textColor})
        if(style) containerStyle.push(style)
        return (
          <View style={containerStyle} opacity={0.5}>
              <TextInput
                style={textStyle}
                placeholder={placeholder}
                autoCapitalize='none'
                autoFocus={false}
                secureTextEntry={secureTextEntry ? true : false}
                onChangeText={onChange}
                placeholderTextColor={textColor}
                />
          </View>
      )
    }
}

export default TInput;