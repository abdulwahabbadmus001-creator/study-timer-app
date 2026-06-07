import * as Notifications from "expo-notifications";

export async function sendNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Focus Session Complete",
      body: "Take a short break.",
    },
    trigger: null,
  });
}