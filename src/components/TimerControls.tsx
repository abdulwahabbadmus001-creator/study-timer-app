import { View, Button } from "react-native";

interface Props {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function TimerControls({
  onStart,
  onPause,
  onReset,
}: Props) {
  return (
    <View>
      <Button
        title="Start"
        onPress={onStart}
      />

      <Button
        title="Pause"
        onPress={onPause}
      />

      <Button
        title="Reset"
        onPress={onReset}
      />
    </View>
  );
}