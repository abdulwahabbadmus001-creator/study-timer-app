import { Text, StyleSheet } from "react-native";

interface Props {
  time: string;
}

export default function TimerDisplay({
  time,
}: Props) {
  return (
    <Text style={styles.timer}>
      {time}
    </Text>
  );
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 30,
  },
});