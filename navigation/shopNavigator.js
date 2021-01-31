import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Platform } from "react-native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductScreen from '../screens/user/UserProductScreen';

import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

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
    navigationOptions: {
        drawerIcon: drawerIcon => (<Ionicons name={Platform.OS === 'android' ? "md-cart" : "ios-cart"} size={24} color={drawerIcon.tintColor} />)
    },
    defaultNavigationOptions: defaultNavoptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
        drawerIcon: drawerIcon => (<Ionicons name={Platform.OS === "android" ? "md-list" : "ios-list"} size={24} color={drawerIcon.tintColor}/>)
    },
    defaultNavigationOptions: defaultNavoptions,
  }
);

const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProductScreen,
    },
    {
      navigationOptions: {
          drawerIcon: drawerIcon => (<Ionicons name={Platform.OS === "android" ? "md-create" : "ios-create"} size={24} color={drawerIcon.tintColor}/>)
      },
      defaultNavigationOptions: defaultNavoptions,
    }
  );

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor
    }
});

export default createAppContainer(ShopNavigator);
