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

export default class Cadastro extends Component{

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

        this.cadastrar = this.cadastrar.bind(this);
        firebase.auth().signOut();
    }
    cadastrar() {
        if(this.state.emailInput != '' && this.state.senhaInput != ''){

            firebase.auth().onAuthStateChanged((user)=>{
                if(user) {

                let uid = user.uid;

                firebase.database().ref('users').child(uid).set({
                    saldo:0,
                });
                this.props.navigation.navigate('Interna');
                }
            });
        }

        firebase.auth().createUserWithEmailAndPassword(
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
            <Button title="Cadastrar" onPress={this.cadastrar} />
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