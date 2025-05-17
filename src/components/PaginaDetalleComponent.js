import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import { API_URL } from '../../utils/config';

export default function PaginaDetalle() {
    const navigation = useNavigation();
    const route = useRoute();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [preciodecosto, setPreciodecosto] = useState('');
    const [preciodeventa, setPreciodeventa] = useState('');
    const [fotografia, setFotografia] = useState('');
    const [id, setId] = useState('');

    useFocusEffect(
        useCallback(() => {
            setNombre(route.params?.nombre || '');
            setDescripcion(route.params?.descripcion || '');
            setCantidad(String(route.params?.cantidad ?? ''));
            setPreciodecosto(route.params?.preciodecosto || '');
            setPreciodeventa(route.params?.preciodeventa || '');
            setFotografia(route.params?.fotografia || '');
            setId(route.params?.id || '');
        }, [route.params])
    );

    const Actualizar = () => {
        fetch(`${API_URL}/api/productos/${id}`, {
            method: 'PUT',
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
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error('Error del servidor');
            }
            return res.json();
        })
        .then((resJson) => {
            const mensaje = resJson.mensaje || 'Producto actualizado con éxito';
            Alert.alert('Éxito', mensaje);
            navigation.goBack();
        })
        .catch((error) => {
            Alert.alert('Error de Internet o del Servidor');
        });
    };

    const Eliminar = () => {
        fetch(`${API_URL}/api/productos/${id}`, {
            method: 'DELETE',
        })
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error('Error al eliminar');
            }
            return res.json();
        })
        .then((resJson) => {
            const mensaje = resJson.mensaje || 'Producto eliminado con éxito';
            Alert.alert('Éxito', mensaje);
            navigation.goBack();
        })
        .catch((error) => {
            Alert.alert('Error al eliminar el producto');
        });
    };

    return (
        <View style={style.Container}>
            <ScrollView style={style.ScrollView}>
                <View style={style.Header}>
                    <TouchableOpacity style={style.EditarButton} onPress={Actualizar}>
                        <Text style={style.TextButton}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.EliminarButton} onPress={Eliminar}>
                        <Text style={style.TextButton}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: 20 }}>
                    <Input label="Nombre" value={nombre} onChangeText={setNombre} />
                    <Input label="Descripción" value={descripcion} onChangeText={setDescripcion} />
                    <Input label="Precio de costo" value={preciodecosto} keyboardType="numeric" onChangeText={setPreciodecosto} />
                    <Input label="Precio de venta" value={preciodeventa} keyboardType="numeric" onChangeText={setPreciodeventa} />
                    <Input label="Cantidad" value={cantidad} keyboardType="numeric" onChangeText={setCantidad} />
                    <Input label="Fotografía" value={fotografia} onChangeText={setFotografia} />

                    {fotografia ? (
                        <Image
                            style={{ width: 150, height: 150, alignSelf: 'center', borderRadius: 10 }}
                            source={{ uri: fotografia }}
                        />
                    ) : (
                        <Text style={{ textAlign: 'center', marginTop: 10, color: 'gray' }}>
                            Imagen no disponible
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ScrollView: {
        flex: 1,
    },
    Header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    EditarButton: {
        flex: 1,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 5,
        justifyContent: 'center',
        marginLeft: 5,
    },
    EliminarButton: {
        flex: 1,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 5,
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    TextButton: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    },
});
