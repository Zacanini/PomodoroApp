import { StyleSheet, View, Text, StatusBar } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from 'react-native-paper';
import { formatTime } from "../services/FormataHora";

export const TimerView = ({ navigation }) => {
    const [timer, setTimer] = useState({
        workTime: 1500, // 25 minutos em segundos
        pauseTime: 300,  // 5 minutos em segundos
        timeLeft: 1500,  // Começa no tempo de trabalho
        isRunning: false,
        isWorkMode: true
    });

    // Função para alternar entre o modo de trabalho e pausa
    const switchMode = useCallback(() => {
        setTimer(prevTimer => ({
            ...prevTimer,
            isRunning: false,
            isWorkMode: !prevTimer.isWorkMode,
            timeLeft: prevTimer.isWorkMode ? prevTimer.pauseTime : prevTimer.workTime
        }));
    }, []);

    // Função para atualizar o tempo restante
    const updateTimer = useCallback(() => {
        setTimer(prevTimer => ({
            ...prevTimer,
            timeLeft: prevTimer.timeLeft - 1
        }));
    }, []);

    // Efeito para rodar o temporizador
    useEffect(() => {
        let interval = null;

        if (timer.isRunning && timer.timeLeft > 0) {
            interval = setInterval(updateTimer, 1000);
        } else if (timer.timeLeft === 0) {
            switchMode();
        }

        return () => clearInterval(interval);
    }, [timer.isRunning, timer.timeLeft, updateTimer, switchMode]);

    // Função para iniciar ou pausar o temporizador
    const playPause = () => {
        setTimer(prevTimer => ({
            ...prevTimer,
            isRunning: !prevTimer.isRunning
        }));
    };

    // Função para redefinir o temporizador
    const reset = () => {
        setTimer(prevTimer => ({
            ...prevTimer,
            isRunning: false,
            isWorkMode: true,
            timeLeft: prevTimer.workTime
        }));
    };

    // Função para atualizar os tempos de trabalho e pausa
    const saveSettings = (newWorkTime, newPauseTime) => {
        setTimer(prevTimer => ({
            ...prevTimer,
            workTime: newWorkTime,
            pauseTime: newPauseTime,
            timeLeft: prevTimer.isWorkMode ? newWorkTime : newPauseTime
        }));
    };

    // Navegação para a página de configuração
    const handleConfig = () => {
        navigation.navigate('Config', {
            workTime: timer.workTime,
            pauseTime: timer.pauseTime,
            saveSettings: saveSettings // Passa a função de salvar
        });
    };

    return (
        <View style={Styles.container}>
            <StatusBar style="auto" />
            <Text style={Styles.titulo}>
                {timer.isWorkMode ? "TIMER POMODORO" : "PAUSA"}
            </Text>
            <View style={Styles.relogio}>
                <Text style={[Styles.relogioTexto, { color: timer.isWorkMode ? "#00FF00" : "red" }]}>
                    {formatTime(timer.timeLeft)}
                </Text>
            </View>
            <View style={Styles.containerBotoes}>
                <Button
                    style={Styles.botao}
                    icon={timer.isRunning ? "pause" : "play"}
                    buttonColor="#2C403E"
                    textColor="#F2F2F2"
                    mode="contained"
                    onPress={playPause}
                >
                    {timer.isRunning ? "Pausar" : "Iniciar"}
                </Button>
                <Button
                    style={Styles.botao}
                    icon="replay"
                    buttonColor="#2C403E"
                    textColor="#F2F2F2"
                    mode="contained"
                    onPress={reset}
                >
                    Redefinir
                </Button>
            </View>
            <View style={Styles.configuracao}>
                <Button
                    icon="cog"
                    buttonColor="#2C403E"
                    textColor="#F2F2F2"
                    mode="contained"
                    onPress={handleConfig}
                >
                    Configurar
                </Button>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D0D0D',
        padding: 20,
    },
    titulo: {
        fontSize: 32,
        textAlign: 'center',
        color: '#F2F2F2',
        position: 'absolute',
        top: 50,
        fontWeight: 'bold',
    },
    relogio: {
        backgroundColor: '#000',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#8FBFBF',
        marginBottom: 50,
    },
    relogioTexto: {
        fontSize: 80,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    containerBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 100,
        paddingHorizontal: 20,
    },
    botao: {
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    configuracao: {
        position: 'absolute',
        bottom: 30,
        width: '60%',
    },
});
