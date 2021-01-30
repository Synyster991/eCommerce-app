import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Platform } from "react-native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";

import Colors from "../constants/colors";

const defaultNavoptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavoptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    defaultNavigationOptions: defaultNavoptions,
  }
);

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor
    }
});

export default createAppContainer(ShopNavigator);
