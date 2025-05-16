import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Inicio from './src/components/InicioComponent';
import ListarProductos from './src/components/ListarProductosComponent';
import PaginaDetalle from './src/components/PaginaDetalleComponent';
import PaginaAgregar from './src/components/PaginaAgregarComponent';

const Stack = createNativeStackNavigator();
function MyStack() {
    return (
    <Stack.Navigator>
    <Stack.Screen name="Inicio" component={Inicio} />
    <Stack.Screen name="ListarProductos" component={ListarProductos} options={{title: "Products"}} />
    <Stack.Screen name="Detalles" component={PaginaDetalle} options={{title: "Editar Producto"}} />
    <Stack.Screen name="Agregar" component={PaginaAgregar} options={{title: "Agregar Producto"}} />
    </Stack.Navigator>
);
}

export default function App() {
    return (
    <NavigationContainer>
    <MyStack />
    </NavigationContainer>
);
}