import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput} from 'react-native';

import firebase from './FirebaseConnection';

export default class Login extends Component{

    static navigationOptions = {
        title:null,
        headerStyle:{
            backgroundColor: '#ede21a',
        },
        headerTintColor:'#000',
    }

    constructor(props) {
        super(props);
        this.state = {
            emailInput:'',
            senhaInput:'',
        };

        this.login = this.login.bind(this);
        firebase.auth().signOut();
    }
    login() {
        if(this.state.emailInput != '' && this.state.senhaInput != ''){

            firebase.auth().onAuthStateChanged((user)=>{
                if(user) {

                this.props.navigation.navigate('Interna');
                }
            });
        }

        firebase.auth().signInWithEmailAndPassword(
            this.state.emailInput,
            this.state.senhaInput
        ).catch((error)=>{
            alert(error.code)
        });
    }

    render() {
        return(

            <View style={styles.container}>
                <Text style={styles.inputText}>E-mail:</Text>
                <TextInput style={styles.input} onChangeText={(emailInput)=>this.setState({emailInput})} placeholder="Digite seu E-mail" />
                <Text style={styles.inputText}>Senha:</Text>
                <TextInput secureTextEntry={true} style={styles.input} onChangeText={(senhaInput)=>this.setState({senhaInput})} placeholder="Digite sua senha"/>
            <Button title="Entrar" onPress={this.login} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:10,
    },
    input:{
        height:45,
        fontSize:20,
        marginTop:15,
        padding:5,
    },
    inputText:{
        fontSize:20,
    }
});