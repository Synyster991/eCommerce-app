import React from 'react';
import { View, Text } from 'react-native';

import MEALS from '../../data/dummy-data';

const ProductDetailScreen = (props) => {
    const itemId = props.navigation.getParam('productId');
    const product = MEALS.find(pro => pro.id === itemId);
    return (
        <View>
            <Text>
                {product.title}
            </Text>
        </View>
    );
};

export default ProductDetailScreen;