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
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import firebase from './FirebaseConnection';

import HistoricoItem from './HistoricoItem';

export default class Interna extends Component {

    static navigationOptions = {
        title:null,
        header:null
      }

      constructor(props) {
        super(props);
        this.state = {
            saldo:0,
            historico:[],
        };
        this.addReceita = this.addReceita.bind(this);
        this.addDespesa = this.addDespesa.bind(this);
        this.sair       = this.sair.bind(this);

        firebase.auth().onAuthStateChanged((user)=>{
            if(user) {
                
                firebase.database().ref('users').child(user.uid).on('value', (snapshot)=>{

                    let state = this.state;
                    state.saldo = snapshot.val().saldo;
                    this.setState(state);
                });

                //Olheiro
            firebase.database().ref('historico').child(user.uid).on('value', (snapshot)=>{

                    let state = this.state;
                    state.historico =[];

                    snapshot.forEach((childItem)=>{
                        state.historico.push({
                            key:childItem.key,
                            type:childItem.val().type,
                            valor:childItem.val().valor,
                            nome:childItem.val().nome
                        });
                     });
                     this.setState(state);
            });

            } else {
                this.props.navigation.navigate('Home');
            }
        });
      }
      sair() {
         firebase.auth().signOut(); 
      }

      addReceita() {
            this.props.navigation.navigate('AddReceita');
      }

      addDespesa() {
            this.props.navigation.navigate('AddDespesa');
      }
    

  render() {
    return(

      <View style={styles.container} >
        <View style={styles.saldoArea}>
            <Text style={styles.saldo} > R$ {this.state.saldo}</Text>
        </View>
        <FlatList 
            style={styles.historico}
            data={this.state.historico}
            renderItem={({item})=> <HistoricoItem data={item} />}
        />
        <View style={styles.btnArea}>
            <Button title="Add Receita" onPress={this.addReceita} />
            <Button  title="Add Despesa" onPress={this.addDespesa} />
            <Button  title="Sair" onPress={this.sair} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  saldoArea:{
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#3439a1',
  },
  saldo:{
    color:'#FFF',
    textAlign:'center',
    fontSize:26,
    fontWeight:'bold',
  },
  historico:{
      flex:1,
      paddingTop:10,
  },
  btnArea:{
      flexDirection:'row',
      justifyContent:'space-around',
      paddingTop:20,
      paddingBottom:20,
      backgroundColor:'#3439a1',
  },
  despesa:{
      backgroundColor:'#f70e39',
  }
});