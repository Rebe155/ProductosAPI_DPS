import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { API_URL } from '../../utils/config';

export default function PaginaAgregar() {
    const navigation = useNavigation();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [preciodeventa, setPreciodeventa] = useState('');
    const [preciodecosto, setPreciodecosto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fotografia, setFotografia] = useState('');

    const Guardar = () => {
        fetch(`${API_URL}/api/productos`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                cantidad: parseInt(cantidad),
                preciodecosto: parseFloat(preciodecosto),
                preciodeventa: parseFloat(preciodeventa),
                fotografia,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            const mensaje = responseJson.message || 'Producto agregado con exito';
            Alert.alert('Éxito', mensaje);
            navigation.goBack();
        })
        .catch((error) => {
            console.error(error);
            Alert.alert('Error de Internet');
        });
    };

    return (
        <View style={style.Container}>
            <Input placeholder="Nombre" onChangeText={setNombre}/>
            <Input placeholder="Descripción" onChangeText={setDescripcion} inputStyle={style.Input} />
            <Input placeholder="Precio  de costo" onChangeText={setPreciodecosto} inputStyle={style.Input}/>
            <Input placeholder="Precio de venta" onChangeText={setPreciodeventa} inputStyle={style.Input} />
            <Input placeholder="Cantidad" onChangeText={setCantidad} inputStyle={style.Input} />
            <Input placeholder="URL de la imagen" onChangeText={setFotografia} inputStyle={style.Input}/>

            <TouchableOpacity 
            style={style.Button} 
            onPress={Guardar}
            >
                <Text 
                style={style.TextButton}
                > Guardar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    Container: {
    flex: 1,
    padding: 20
    },
    Input: {
    marginTop: 10,
    },
    Button: {
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
    },
});