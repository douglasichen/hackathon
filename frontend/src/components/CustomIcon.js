import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors.js';

const CustomIcon = ({ name, size, color }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={name} size={size} color={color || colors.primaryGreen} />
        </View>
    );
};

export default CustomIcon;