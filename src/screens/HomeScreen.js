import React, { useEffect } from "react";
import { View } from "react-native";

import TimerDisplay from "../components/TimerDisplay";
import TimerControls from "../components/TimerControls";

import { formatTime } from "../utils/formatTime";

import { useTimerStore } from "../store/timerStore";

import { sendNotification } from "../services/notificationService";

import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return <HomeScreen />;
}
export default function HomeScreen() {
  const {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    decrement,
    addSession,
  } = useTimerStore();

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        decrement();
      }, 1000);
    }

    if (timeLeft === 0) {
      sendNotification();

      addSession({
        id: Date.now(),
        duration: 25,
        completedAt: new Date().toISOString(),
      });

      pauseTimer();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TimerDisplay
        time={formatTime(timeLeft)}
      />

      <TimerControls
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />
    </View>
  );
}