import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuPost = () => {
  const [visible, setVisible] = useState(false);

  const closeMenu = () => setVisible(false);
  const openMenu = () => setVisible(true);

  return (
    <Provider>
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Icon name="dots-vertical" size={30} color="#000" />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              Alert.alert('Action:', 'Print');
              closeMenu(); // Close the menu after selecting an item
            }}
            title="Print"
          />
        </Menu>
      </View>
    </Provider>
  );
};

export default MenuPost;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});
