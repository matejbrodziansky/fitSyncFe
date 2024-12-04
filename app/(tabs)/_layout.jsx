import { Tabs } from 'expo-router';
import React from 'react';
import { View, Image, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import BottomMenu from '@/components/ui/BottomMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1 w-16 mt-5">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          borderTopColor: '#232533',
          elevation: 0,
          height: 84,
        },
      }}
    >


      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Cvičenia',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.dumbbell} // Predpokladám, že ikona je v súbore icons.js
              color={color}
              name="Cvičenia"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videá',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.play} // Predpokladám, že ikona je v súbore icons.js
              color={color}
              name="Videá"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="points"
        options={{
          title: 'Body',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.points} // Predpokladám, že ikona je v súbore icons.js
              color={color}
              name="Body"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profil"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
