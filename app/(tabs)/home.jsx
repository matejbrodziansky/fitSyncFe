import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { getLatestPosts, getAllPosts } from "@/service/api";


import { images } from "@/constants";


const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [latestPosts, setLatestPosts] = useState()
  const [posts, setPosts] = useState([])

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const latestPosts = await getLatestPosts()

      if (latestPosts) {
        setLatestPosts(latestPosts)
      }
    }

    const fetchPosts = async () => {
      const posts = await getAllPosts()
      if(posts){
        setPosts(posts)
      }
    }
    fetchLatestPosts();
    fetchPosts()
  },[])

  const featuresSectionList = [
    {
      id: 1,
      title: 'Zmiernenie bolesti',
      description: 'Cvičenia zamerané na bolesť krčnej chrbtice a ďalšie problémy.',
      image: 'https://midsouthpain.com/wp-content/uploads/2020/06/shutterstock_1029546799-scaled.jpg',
    },
  ];

  // const latestPosts = [
  //   {
  //     $id: '1',
  //     title: 'Video 1',
  //     thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
  //     },
  //   },
  //   {
  //     $id: '2',
  //     title: 'Video 2',
  //     thumbnail: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
  //     },
  //   },
  //   {
  //     $id: '3',
  //     title: 'Video 3',
  //     thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazesAudio.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
  //     },
  //   },
  //   {
  //     $id: '4',
  //     title: 'Video 4',
  //     thumbnail: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyridesVideo.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
  //     },
  //   },
  // ];


  const renderFeatureItem = ({ item }) => (
    <View className="w-[30%] items-center bg-[#1e1e2f] p-3 rounded-lg mx-1">
      <Image
        source={{ uri: item.image }}
        className="w-20 h-20 mb-3 rounded-lg"
      />
      <Text className="text-white text-sm font-bold text-center mb-1">{item.title}</Text>
      <Text className="text-white text-xs text-center leading-4">{item.description}</Text>
    </View>
  );

  // const posts = [
  //   {
  //     $id: '1',
  //     title: 'Video 1',
  //     thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
  //     },
  //   },
  //   {
  //     $id: '2',
  //     title: 'Video 2',
  //     thumbnail: 'https://literacyandlanguagecenter.com/wp-content/uploads/2016/04/TFE3QMW4XY-1080x675.jpg',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://literacyandlanguagecenter.com/wp-content/uploads/2016/04/TFE3QMW4XY-1080x675.jpg',
  //     },
  //   },
  //   {
  //     $id: '3',
  //     title: 'Video 3',
  //     thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DesigningForGoogleCastAudio.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
  //     },
  //   },
  //   {
  //     $id: '4',
  //     title: 'Video 4',
  //     thumbnail: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
  //     video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/DesigningForGoogleCastAudio.mp4',
  //     creator: {
  //       username: 'JSMastery',
  //       avatar: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
  //     },
  //   },

  // ]

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Vitajte späť
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  I am movement
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  // source={{ uri: 'https://www.michal-garaj.sk/wp-content/uploads/2024/09/michal-garaj-pohyb-a-rozvoj-copy.webp' }}
                  source={images.logo}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            {latestPosts && (
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-lg font-pregular text-gray-100 mb-3">
                  Latest Videos
                </Text>

                <Trending posts={latestPosts} />

              </View>
            )}

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
