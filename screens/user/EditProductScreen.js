import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

import * as productsAction from "../../store/actions/products";
import Input from '../../components/UI/Input';

const REDUCER_FORM = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === REDUCER_FORM) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      inputValues: {
        title: editedProduct ? editedProduct.title : "",
        imageUrl: editedProduct ? editedProduct.imageUrl : "",
        description: editedProduct ? editedProduct.description : "",
        price: "",
      },
      inputValidities: {
        title: editedProduct ? true : false,
        imageUrl: editedProduct ? true : false,
        description: editedProduct ? true : false,
        price: editedProduct ? true : false,
      },
      formIsValid: editedProduct ? true : false,
    },
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsAction.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsAction.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: REDUCER_FORM,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  }, [dispatchFormState]);

  return (
    <ScrollView>
      <View style={styles.form}>
      <Input
        id='title'
        label='Title'
        errorText='Please enter a valid title!'
        keyboardType="default"
        autoCapitalize="sentences"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.title : ''}
        initiallyValid={!!editedProduct}
        required
      />
        <Input 
        id='imageUrl'
        label='Image Url'
        errorText='Please enter a valid image url!'
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedProduct ? editedProduct.imageUrl : ''}
        initiallyValid={!!editedProduct}
        required
      />
        {editedProduct ? null : (
          <Input 
          id='price'
          label='Price'
          errorText='Please enter a valid price!'
          keyboardType="decimal-pad"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          required
          min={0.1}
        />
        )}
       <Input 
        id='description'
        label='Description'
        errorText='Please enter a valid description!'
        keyboardType="default"
        autoCapitalize="sentences"
        autoCorrect
        multiline
        numberOfLines={3}
        onInputChange={inputChangeHandler.bind(this, 'description')}
        initialValue={editedProduct ? editedProduct.description : ''}
        initiallyValid={!!editedProduct}
        required
        minLenght={5}
      />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  }
});

export default EditProductScreen;
