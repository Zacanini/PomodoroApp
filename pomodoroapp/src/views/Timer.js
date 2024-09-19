import { StyleSheet, View, Text, StatusBar } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from 'react-native-paper';
import { formatTime } from "../services/FormataHora";

// Definindo os tempos como constantes
const WORK_TIME = 1500; // Tempo de trabalho em segundos (25 minutos)
const PAUSE_TIME = 300; // Tempo de pausa em segundos (5 minutos)

export const TimerView = () => {
    const [timer, setTimer] = useState({
        timeLeft: WORK_TIME, // Tempo restante em segundos
        isRunning: false,   // Se o temporizador está rodando
        isWorkMode: true    // Se o temporizador está no modo de trabalho
    });

    // Função para atualizar o tempo restante
    const updateTimer = useCallback(() => {
        setTimer(prevTimer => ({
            ...prevTimer,
            timeLeft: prevTimer.timeLeft - 1
        }));
    }, []);

    // Função para alternar entre o modo de trabalho e o modo de pausa
    const switchMode = useCallback(() => {
        setTimer(prevTimer => ({
            ...prevTimer,
            isRunning: false,
            isWorkMode: !prevTimer.isWorkMode,
            timeLeft: prevTimer.isWorkMode ? PAUSE_TIME : WORK_TIME
        }));
    }, []);

    useEffect(() => {
        let interval = null;

        if (timer.isRunning && timer.timeLeft > 0) {
            interval = setInterval(updateTimer, 1000); // Atualiza o tempo a cada segundo
        } else if (timer.timeLeft === 0) {
            switchMode(); // Alterna o modo quando o tempo acaba
        }

        return () => clearInterval(interval); // Limpa o intervalo quando o componente desmonta ou o temporizador pausa
    }, [timer.isRunning, timer.timeLeft, updateTimer, switchMode]);

    // Função para iniciar/pause o temporizador
    const playPause = () => {
        setTimer(prevTimer => ({
            ...prevTimer,
            isRunning: !prevTimer.isRunning
        }));
    };

    // Função para redefinir o temporizador
    const reset = () => {
        setTimer({
            timeLeft: WORK_TIME,
            isRunning: false,
            isWorkMode: true
        });
    };

    const handleConfig = () => {
        // Navegação para a tela de configuração (dependendo da implementação)
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
