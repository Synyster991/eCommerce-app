import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import { useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import MainButton from "../../components/button";
import Colors from "../../constants/colors";

const ProductDetailScreen = (props) => {
  const itemId = props.navigation.getParam("productId");
  const allMeals = useSelector((state) => state.products.availableProducts);
  const product = allMeals.find((pro) => pro.id === itemId);

  return (
    <ScrollView>
      <View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descText}>{product.description}</Text>
        </View>
        <View style={styles.bottomLineContainer}>
          <View style={styles.bottomLine}>
            <View>
              <Text style={styles.priceText}>${product.price}</Text>
            </View>
            <View>
              <MainButton style={{ borderColor: Colors.primaryColor }}>
                <Ionicons name="ios-cart" size={24} color={Colors.primaryColor} />
              </MainButton>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  descContainer: {
    marginHorizontal: 14,
    marginTop: 16,
  },
  descText: {
    color: Colors.secondaryColor,
    fontSize: 15,
  },
  imageContainer: {
    marginHorizontal: 14,
    borderRadius: 15,
    marginTop: 17,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
  },
  image: {
    width: "100%",
    height: 300,
  },
  priceText: {
    fontSize: 22,
    color: "#888",
  },
  bottomLineContainer: {
    marginHorizontal: 14,
  },
  bottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default ProductDetailScreen;
