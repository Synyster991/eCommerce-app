import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

import Card from "../card";
import MainButton from "../button";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.cardContainer}>
      <TouchableCmp onPress={props.changeScreen} useForeground>
        <View style={styles.touchable}>
          <View style={styles.itemContainer}>
            <ImageBackground
              source={{ uri: props.product.item.imageUrl }}
              style={styles.image}
            >
              <View style={styles.bgContainer}>
                <Text style={styles.bgText}>{props.product.item.title}</Text>
              </View>
            </ImageBackground>
            <View style={styles.rowContainer}>
              <View>
                <MainButton
                  style={{ borderColor: Colors.primaryColor }}
                  onPressAction={props.changeScreen}
                >
                  <Ionicons
                    name="ios-help-circle"
                    size={24}
                    color={Colors.primaryColor}
                  />
                </MainButton>
              </View>
              <View>
                <Text style={styles.bgPriceText}>
                  ${props.product.item.price.toFixed(2)}
                </Text>
              </View>
              <View>
                <MainButton
                  style={{ borderColor: Colors.thirdColor }}
                  onPressAction={() => console.log("Cart")}
                >
                  <Ionicons
                    name="ios-cart"
                    size={24}
                    color={Colors.thirdColor}
                  />
                </MainButton>
              </View>
            </View>
          </View>
        </View>
      </TouchableCmp>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: "hidden",
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 15,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 15,
    borderColor: "#fff",
    overflow: "hidden",
  },
  bgContainer: {
    backgroundColor: "rgba(12, 12, 12, 0.5)",
    padding: 10,
  },
  bgText: {
    color: "#fff",
    fontSize: 18,
  },
  bgPriceText: {
    color: "#888",
    fontSize: 21,
  },
  priceContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.secondaryColor,
  },
  priceText: {
    color: Colors.secondaryColor,
    fontSize: 16,
    paddingTop: 17,
  },
});

export default ProductItem;
