import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot, Stack } from 'expo-router'
import BottomMenu from '@/components/ui/BottomMenu'
import '../global.css'


// Príklad navbar komponentu, môžeš si ho upravit podľa svojich potrieb
function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarText}>Navbar</Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView className='flex-1'>
        {/* <Navbar /> */}
        <Stack>
          <Stack.Screen name="./(tabs)/index" options={{ headerShown: false }} />
        </Stack>
        <SafeAreaView>
          <BottomMenu />
        </SafeAreaView>
      </SafeAreaView>
    </>
  );
}

// Príklady štýlov pre navbar
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "plum"
  },
  container: {
    flex: 1,
    backgroundColor: "plum",
  },
  navbar: {
    height: 50,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: Colors.light.border,
  },
  navbarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});
