import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, } from 'react-native';
import firebase from './FirebaseConnection';

export default class Preload extends Component{

    static navigationOptions = {
        title:"Home",
        header:null
    }

    constructor(props) {
        super(props);
        this.state = {};

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            this.props.navigation.navigate('Interna');
        } else {
            this.props.navigation.navigate('Home');
        }
    });

    }
   
    render() {
        return(

            <ImageBackground source={require('../assets/images/fundo.jpg')} style={styles.bg}>
                <View style={styles.container}>
                    <Text style={styles.title}>Controle Financeiro</Text>
                    
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({

    bg:{
        flex:1,
        width:null,
    },
    title:{
        fontSize:40,
        backgroundColor:'transparent',
        color:'#999',
        fontWeight:'bold',
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});