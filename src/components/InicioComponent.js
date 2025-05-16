import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


import { API_URL } from '../../utils/config';

export default function PantallaInicio() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigation = useNavigation();

    const Entrar = () => {
        if (!!usuario && !!contrasena) {
            fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, contrasenia: contrasena }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                const { autenticado } = responseJson;
                if (autenticado) {
                    navigation.navigate('ListarProductos');
                } else {
                    Alert.alert('Usuario', responseJson.message, [{ text: 'OK' }], { cancelable: false });
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Aviso', 'Error de Internet!!', [{ text: 'OK' }], { cancelable: false });
            });
        } else {
            Alert.alert('Aviso', 'No introdujo datos', [{ text: 'OK' }], { cancelable: false });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Bienvenida}>Bienvenidos</Text>
            <Image 
                style={styles.logo}
                source={require('../../assets/market.jpg')}
            />
            <View style={styles.Form}>
                <Input
                    placeholder="USUARIO"
                    onChangeText={setUsuario}
                    value={usuario}
                    rightIcon={<Icon name="person" size={24} color="black" />}
                />
                <Input
                    placeholder="CONTRASEÑA"
                    onChangeText={setContrasena}
                    value={contrasena}
                    secureTextEntry={true}
                    rightIcon={<Icon name="lock" size={24} color="black" />}
                />
            </View>
            <TouchableOpacity 
                style={styles.LoginButton} 
                onPress={Entrar}>
                <Text style={styles.TextButton}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20,
    },
    Bienvenida: { 
        fontSize: 34, 
        marginTop: 25,
        alignSelf: 'center',
    },
    logo: { 
        width: 200, 
        height: 160, 
        alignSelf: 'center', 
        marginBottom: 15 
    },
    Form: { 
        marginLeft: 10,
        marginRight: 10,
    },
    LoginButton: {
        height: 50,
        backgroundColor: 'red',
        marginTop: 15,
        borderRadius: 5,
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    TextButton: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    }
});