import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
    return (
        <View style={styles.container}>{props.children}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        margin: 7
    }
});

export default Card;