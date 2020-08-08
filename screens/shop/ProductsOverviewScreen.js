import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import Colors from "../../constants/colors";

import Card from "../../components/card";
import MainButton from "../../components/button";

const renderProduct = (product, changeScreen) => {
  return (
    <Card>
      <View style={styles.itemContainer}>
        <ImageBackground
          source={{ uri: product.item.imageUrl }}
          style={styles.image}
        >
          <View style={styles.bgContainer}>
            <Text style={styles.bgText}>{product.item.title}</Text>
          </View>
        </ImageBackground>
        <View style={styles.rowContainer}>
          <View>
            <MainButton style={{borderColor: Colors.primaryColor}} onPressAction={changeScreen}><Ionicons name="ios-help-circle" size={24} color={Colors.primaryColor} /></MainButton>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${product.item.price}</Text>
          </View>
          <View>
            <MainButton style={{borderColor: Colors.thirdColor}} onPressAction={() => console.log("Cart")}><Ionicons name="ios-cart" size={24} color={Colors.thirdColor} /></MainButton>
          </View>
        </View>
      </View>
    </Card>
  );
};

const ProductsOverviewScreen = (props) => {
  const changeToDetailScreen = (itemId) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: itemId
      }
    });
  };

  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => renderProduct(itemData, changeToDetailScreen.bind(this, itemData.item.id))}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  bgContainer: {
    backgroundColor: "rgba(12, 12, 12, 0.3)",
    padding: 7,
  },
  bgText: {
    color: "#fff",
    fontSize: 18,
  },
  priceContainer: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.secondaryColor
  },
  priceText: {
    color: Colors.secondaryColor,
    fontSize: 16,
    paddingTop: 17
  }
});

export default ProductsOverviewScreen;
