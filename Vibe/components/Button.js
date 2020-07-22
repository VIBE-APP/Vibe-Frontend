import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    buttonText:{
      fontSize:24,
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
        elevation:2,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    }
});

class Button extends React.Component {
    static defaultProps = {
        title:"Button",
        textColor:"white",
        backgroundColor:"dodgerblue",
        onPress: () => {}
    }

    render () {
        const{title, textColor, backgroundColor, onPress, style} = this.props
        const containerStyle = [styles.buttonContainer]
        containerStyle.push({backgroundColor:backgroundColor})
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