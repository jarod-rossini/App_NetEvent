import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const MyLogo = ({logoName, logoSize, logoColor}) => {
    return(
        <Ionicons name={logoName} size={logoSize} color={logoColor}/>
    )
   }
export default MyLogo