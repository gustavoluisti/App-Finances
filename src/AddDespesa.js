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
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from './FirebaseConnection';


export default class AddDespesa extends Component {

    static navigationOptions = {
        title:"Adicionar Despesa",
      }

      constructor(props) {
        super(props);
        this.state = {
            valor:'',
            nome:'',
        };
  
        this.add = this.add.bind(this);
     
      }

      add() {
          if(this.state.valor != ''){

            let uid = firebase.auth().currentUser.uid;

            let key = firebase.database().ref('historico').child(uid).child(uid).push().key;

            let user = firebase.database().ref('users').child(firebase.auth().currentUser.uid);

            firebase.database().ref('historico').child(uid).child(key).set({
                type:'despesa',
                valor:this.state.valor,
                nome:this.state.nome
            });
            //Alterando o Saldo
            user.once('value').then((snapshot)=>{

                let saldo = parseFloat(snapshot.val().saldo);
                saldo -= parseFloat(this.state.valor);
                nome = this.state.nome;

                user.set({
                    saldo:saldo,
                    nome:nome,
                });
                this.props.navigation.goBack();
            });
            
          }
      }    

     

  render() {
    return(

      <View style={styles.container} >
        <Text>Quanto você quer retirar ?</Text>
        <TextInput placeholder="Digite o nome da despesa" autoFocus={true} style={styles.input} value={this.state.nome} onChangeText={(nome)=>this.setState({nome})} />
        <TextInput placeholder="Digite o Valor" autoFocus={true} style={styles.input} keyboardType="numeric" value={this.state.valor} onChangeText={(valor)=>this.setState({valor})} />
        
        <Button title="Retirar" onPress={this.add} />
       
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10,
  },
  input:{

  }
});