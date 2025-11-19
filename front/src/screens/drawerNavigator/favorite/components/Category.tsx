import {TabTitleItem} from '@components';
import {FavTypes} from '@data';
import {VS} from '@theme';
import React from 'react';
import {ScrollView, View} from 'react-native';

type CategoryProps = {
  selectedCategory?: FavTypes;
  onPress: (id: FavTypes) => void;
};
export default function Category({onPress, selectedCategory}: CategoryProps) {
  return (
    <View style={[VS.mt_15, VS.ph_15, VS.fd_row]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[VS.flex_1]}
        contentContainerStyle={[VS.gap_10, VS.flex_1]}>
        {[
          {title: 'Home', id: 'home'},
          {title: 'Buyer', id: 'buyer'},
          {title: 'Seller', id: 'seller'},
        ].map((item, index) => {
          return (
            <View key={index} style={[VS.flex_1]}>
              <TabTitleItem
                key={index}
                title={item.title}
                isSelected={selectedCategory === item.id}
                onPress={() => onPress(item.id as FavTypes)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
