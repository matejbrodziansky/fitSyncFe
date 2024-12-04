import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Navbar({ currentTab, onTabPress }: { currentTab: string; onTabPress: (tab: string) => void }) {
  const tabs = [
    { key: 'home', label: 'Domov' },
    { key: 'exercises', label: 'Cvičenia' },
    { key: 'videos', label: 'Videá' },
    { key: 'points', label: 'Body' },
    { key: 'profile', label: 'Profil' },
  ];

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, currentTab === tab.key && styles.activeTab]}
          onPress={() => onTabPress(tab.key)}>
          <Text style={[styles.tabText, currentTab === tab.key && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1D3D47',
    paddingVertical: 10,
  },
  tab: {
    padding: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#A1CEDC',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 14,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
});
