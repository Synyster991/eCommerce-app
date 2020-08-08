import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPressAction}>
      <View style={{...styles.buttonContainer, ...props.style}}>
        <Text>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderRadius: 15,
  },
});

export default MainButton;
