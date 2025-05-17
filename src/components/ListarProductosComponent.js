import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { API_URL } from '../../utils/config';

export default function ListarProductos() {
    const [elementos, setElementos] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();

    const cargarRegistros = () => {
        fetch(`${API_URL}/api/productos`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setElementos(responseJson);
                setTotal(responseJson.length);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            cargarRegistros();
        }, [])
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            key={item.id} 
            onPress={() => navigation.navigate('Detalles', item)}
        >
            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 2 }}>
                <Image 
                    style={{ width: 90, height: 90 }} 
                    source={{ uri: item.fotografia }} 
                /> 
                <View style={{ height: 80, marginLeft: 5 }}>
                    <Text style={{ flex: 1, fontSize: 18 }}>{item.nombre}</Text>
                    <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold' }}>${item.preciodeventa}</Text>
                    <Text style={{ flex: 1, fontSize: 14 }}>Existencia: {item.cantidad}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.total}>{total} productos</Text>
            <FlatList
                data={elementos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity 
                style={styles.AgregarButton}
                onPress={() => navigation.navigate('Agregar')}
            >
                <Icon name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 10 
    },
    total: {
        fontSize: 18,
        textAlign: 'center',
        height: 40,
        marginTop: 10,
        backgroundColor: 'lightgray',
        textAlignVertical: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
    },
    AgregarButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        backgroundColor: 'red',
        borderRadius: 100
    }
});
