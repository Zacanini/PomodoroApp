import { StyleSheet, View, Text, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, MD3DarkTheme as DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#8FBFBF', // Cor primária dos inputs
        background: '#333', // Cor do fundo dos inputs
        placeholder: '#F2F2F2', // Cor do texto de placeholder
        text: '#F2F2F2', // Cor do texto dentro dos inputs
        // Adicione outras cores que você deseja personalizar
    },
};

export const ConfigView = ({ navigation, route }) => {
    // Receber os tempos atuais da rota
    const { workTime, pauseTime, saveSettings } = route.params;

    // Estados locais para os inputs de configuração
    const [newWorkTime, setNewWorkTime] = useState(workTime / 60); // Convertendo para minutos
    const [newPauseTime, setNewPauseTime] = useState(pauseTime / 60); // Convertendo para minutos

    const handleSave = () => {
        // Convertendo minutos para segundos
        const workTimeInSeconds = newWorkTime * 60;
        const pauseTimeInSeconds = newPauseTime * 60;
    
        // Definindo valores padrão
        const defaultWorkTime = 1500; // 25 minutos em segundos
        const defaultPauseTime = 300; // 5 minutos em segundos
    
        // Verificações para garantir que os tempos sejam válidos
        const isWorkTimeValid = workTimeInSeconds > 0 && workTimeInSeconds <= 24 * 60 * 60; // Entre 1 segundo e 24 horas
        const isPauseTimeValid = pauseTimeInSeconds > 0 && pauseTimeInSeconds <= 24 * 60 * 60; // Entre 1 segundo e 24 horas
    
        // Aplicando valores padrão se os tempos não forem válidos
        const finalWorkTime = isWorkTimeValid ? workTimeInSeconds : defaultWorkTime;
        const finalPauseTime = isPauseTimeValid ? pauseTimeInSeconds : defaultPauseTime;
    
        saveSettings(finalWorkTime, finalPauseTime);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.titulo}>Configuração do Pomodoro</Text>
            <View style={styles.configContainer}>
                <Text style={styles.label}>Tempo de trabalho (minutos):</Text>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Tempo de trabalho"
                    value={newWorkTime.toString()}
                    keyboardType="numeric"
                    onChangeText={text => setNewWorkTime(parseFloat(text) || 0)}
                    theme={theme} // Aplicando o tema personalizado
                />
                <Text style={styles.label}>Tempo de pausa (minutos):</Text>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Tempo de pausa"
                    value={newPauseTime.toString()}
                    keyboardType="numeric"
                    onChangeText={text => setNewPauseTime(parseFloat(text) || 0)}
                    theme={theme} // Aplicando o tema personalizado
                />
                <Button
                    mode="contained"
                    onPress={handleSave}
                    style={styles.button}
                    buttonColor="#2C403E"
                    textColor="#F2F2F2"
                >
                    Salvar
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 32,
        color: '#F2F2F2',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center'
    },
    configContainer: {
        width: '100%',
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#8FBFBF',
    },
    label: {
        color: '#F2F2F2',
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#333',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
});
