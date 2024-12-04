import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {singOut} from '@/service/api';

import { icons } from '../../constants';
import { router } from 'expo-router';

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  );
};

const Profile = () => {


  const handleLogout = () => {
    singOut();
    router.push('/sign-in');
  }


  const sections = [
    {
      title: 'Bolesti a riešenia',
      key: 'painpoints',
      subsections: [
        { title: 'Informačné videá', key: 'info-videos', icon: icons.info },
        { title: 'Bolesti krčnej chrbtice', key: 'neck-pain', icon: icons.neck_pain },
        { title: 'Strečing a Mobilita', key: 'stretch-mobility', icon: icons.stretching },
        { title: 'Odstránenie bolesti', key: 'pain-relief', icon: icons.pain },
      ],
    },
    {
      title: 'Tréning',
      key: 'training',
      subsections: [
        { title: 'Energetický tréning (HIIT)', key: 'hiit', icon: icons.hiit },
        { title: 'Interaktívny systém bodov', key: 'rewards', icon: icons.rewards },
      ],
    },
    {
      title: 'Odborníci a rozšírenia',
      key: 'experts',
      subsections: [
        { title: 'Odborníci na výživu', key: 'nutrition', icon: icons.specialist },
        // { title: 'Rozšírenie pre trénerov', key: 'trainers', icon: icons.business },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="bg-slate-50 flex-1">
        {/* Header */}
        <View className="px-5 py-5 bg-blue-500">
          <Text className="text-white text-2xl font-bold">Môj Profil</Text>
        </View>

        {/* Sections */}
        {sections.map((section) => (
          <View key={section.key} className="mx-5 mt-4">
            {/* Section Title */}
            <Text className="text-black text-xl font-bold mb-2">{section.title}</Text>
            {/* Subsections */}
            {section.subsections.map((subsection) => (
              <TouchableOpacity
                key={subsection.key}
                className="bg-slate-100 py-4 px-4 mb-2 rounded-md flex-row items-center border border-gray-200"
                onPress={() => alert(`Navigácia na ${subsection.title}`)}
              >
                <TabIcon icon={subsection.icon || icons.profile} color="#000" focused />
                <Text className="text-black text-lg ml-4">{subsection.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-600 py-3 px-5 mx-5 mt-10 rounded-md items-center"
          onPress={() => handleLogout()}
        >
          <Text className="text-white text-base font-bold">Odhlásiť sa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
