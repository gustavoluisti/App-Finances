import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableHighlight} from 'react-native';

export default class Home extends Component{

    static navigationOptions = {
        title:"Home",
        header:null
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.cadastrar = this.cadastrar.bind(this);
        this.login     = this.login.bind(this);
    }
    cadastrar(){
        this.props.navigation.navigate('Cadastro');
    }
    login(){
        this.props.navigation.navigate('Login');
    }
    render() {
        return(

            <ImageBackground source={require('../assets/images/fundo.jpg')} style={styles.bg}>
                <View style={styles.container}>
                    <Text style={styles.title}>Controle Financeiro</Text>
                    <View style={styles.buttonArea}>
                        <TouchableHighlight onPress={this.cadastrar} style={styles.button} >
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={this.login} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableHighlight>
                    </View>
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
    },
    button:{
        backgroundColor: '#000',
        margin:10,
        height:45,
        width:200,
        justifyContent:'center',
    },
    buttonArea:{
        marginTop:30,
    },
    buttonText:{
        color:'#FFF',
        textAlign: 'center',
        fontSize:22,
    }
});