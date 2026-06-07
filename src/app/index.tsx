import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import TimerDisplay from "../components/TimerDisplay";
import TimerControls from "../components/TimerControls";

import { useTimerStore, Session } from "../store/timeStore";
import { formatTime } from "../utils/formatTime";

export default function HomeScreen() {
  const {
    timeLeft,
    isRunning,
    sessions,
    startTimer,
    pauseTimer,
    resetTimer,
    decrement,
    addSession,
    setSessions,
  } = useTimerStore();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data =
        await AsyncStorage.getItem("sessions");

      if (data) {
        setSessions(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        decrement();
      }, 1000);
    }

    if (timeLeft === 0) {
      completeSession();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  const completeSession = async () => {
    const session: Session = {
      id: Date.now(),
      duration: 25,
      completedAt:
        new Date().toLocaleString(),
    };

    const updatedSessions = [
      ...sessions,
      session,
    ];

    addSession(session);

    await AsyncStorage.setItem(
      "sessions",
      JSON.stringify(updatedSessions)
    );

    

    Alert.alert(
      "Session Complete",
      "Great job! Your focus session is finished."
    );

    pauseTimer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Study Timer
      </Text>

      <TimerDisplay
        time={formatTime(timeLeft)}
      />

      <TimerControls
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />

      <Text style={styles.historyTitle}>
        Session History
      </Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>
              25 Minutes Focus Session
            </Text>

            <Text>
              {item.completedAt}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },

  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
});