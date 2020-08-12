import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/productItem";

const ProductsOverviewScreen = (props) => {
  const changeToDetailScreen = (tempItem) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: tempItem.item.id,
        productTitle: tempItem.item.title,
      },
    });
  };

  const products = useSelector((state) => state.products.availableProducts);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            product={itemData}
            changeScreen={changeToDetailScreen.bind(this, itemData)}
          />
        )}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 20
  }
});

export default ProductsOverviewScreen;
