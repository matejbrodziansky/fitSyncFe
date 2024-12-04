import React from 'react'
import { images } from '@/constants'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/CustomButtom'
import { Text, View, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '@/lib/GlobalProvider'
import { deleteToken } from '@/service/api'



const index = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>

        <View className='w-[90%] items-start px-4 pt-28 pb-10 relative'>
          {/* Obrázok ako pozadie */}
          <Image
            source={images.logo}
            resizeMode='contain'
            className='absolute top-0 left-0 w-full h-full '
          />


          <Text className="text-white text-5xl font-bold text-left">
            Online
          </Text>
          <Text className="text-white text-5xl font-bold text-left">
            tréningový
          </Text>
          <Text className="text-white text-5xl font-bold text-left">
            program
          </Text>
          <Text className="text-white text-5xl font-bold text-left bg-rose-600 p-1">
            I am movement
          </Text>
          <Text className="text-white text-lg text-left mt-4">
            Pre ľudí so sedavým zamestnaním, ktorí chcú zmierniť bolesti, zlepšiť flexibilitu a získať energiu.
            Naša platforma ponúka cvičenia na mieru, ktoré sa zameriavajú na konkrétne problémy ako bolesť krčnej chrbtice,
            strečing, mobilitu a mnoho ďalšieho. Všetko sa deje interaktívne, so systémom bodov a odmien.
          </Text>

          <Text className="text-white text-center text-base mb-5">
            Pripojte sa k nám ešte dnes a začnite svoju cestu k lepšiemu zdraviu!
          </Text>

          {/* Ponecháme miesto na obsah pred tlačidlami */}
          <View className="flex-grow" />

        </View>

      </ScrollView>

      {/* Tlačidlá dole */}
      <View className="flex-row w-full justify-center mb-10 px-4">
        <CustomButton
          title="Prihlásiť sa"
          handlePress={() => { router.push('sign-in') }}
          containerStyles="w-1/2 mx-1 py-2 text-sm bg-indigo-500 opacity-100"
        />
        <CustomButton
          title="Zaregistrovať sa"
          handlePress={() => { router.push('register') }}
          containerStyles="w-1/2 mx-1 py-2 text-sm bg-rose-600"
        />
      </View>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )

}

export default index



{/* <CustomButton
              title="Delete Token"
              handlePress={() => { deleteToken() }}
              containerStyles="w-1/2 ml-2"  // ml-2 pridáva medzeru medzi tlačidlami
            /> */}