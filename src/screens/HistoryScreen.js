import { FlatList, Text } from "react-native";
import { useTimerStore } from "../store/timerStore";

export default function HistoryScreen() {
  const sessions = useTimerStore(
    (state) => state.sessions
  );

  return (
    <FlatList
      data={sessions}
      keyExtractor={(item) =>
        item.id.toString()
      }
      renderItem={({ item }) => (
        <Text>
          {item.duration} mins
        </Text>
      )}
    />
  );
}