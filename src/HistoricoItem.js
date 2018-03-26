import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import firebase from './FirebaseConnection';

export default class HistoricoItem extends Component{

    constructor(props){
        super(props);
        this.state = { };  
    }

    
    render(){
        return(
            <View style={styles.container} >
                <Text style={styles.texto} >{this.props.data.nome} </Text>
             
                <Text style={styles.texto}>R${this.props.data.key} </Text>
                <Button title="Excluir" onPress={() =>{
                    this.props.deletar(this.props.data.key);
                }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:40,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingRight:10,
    },
    texto:{
        fontSize:20,
        
    }
});