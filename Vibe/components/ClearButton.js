import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    buttonText:{
      fontSize:18,
      fontWeight:'bold'
    },
    buttonContainer:{
        alignItems:"center",
        borderRadius:25,
        paddingVertical:10,
        paddingHorizontal:10,
        marginVertical:10,
        marginHorizontal:10,
        width:'100%',
    }
});

class Button extends React.Component {
    static defaultProps = {
        title:"Button",
        textColor:"black",
        onPress: () => {}
    }

    render () {
        const{title, textColor, onPress, style} = this.props
        const containerStyle = [styles.buttonContainer]
        const textStyle = [styles.buttonText]
        textStyle.push({color:textColor})
        if(style) containerStyle.push(style)
        return (
          <TouchableOpacity onPress={onPress} style={containerStyle}>
              <Text style={textStyle}>{title}</Text>
          </TouchableOpacity>
      )
    }
}

export default Button;