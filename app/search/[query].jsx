import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
// import { EmptyState, SearchInput, Trending, VideoCard } from '@/components';
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from 'expo-router'
import { searchPosts } from "@/service/api";
import useAppwrite from "@/lib/useAppwrite";

import { images } from "@/constants";


const Search = () => {

    const { query } = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPosts(query));


    useEffect(() => {
        refetch()
    }, [query])


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
                    <View className="flex my-6 px-4 ">
                        <Text className="font-pmedium text-sm text-gray-100">
                            Search results
                        </Text>
                        <Text className="text-2xl font-psemibold text-white">
                            {query}
                        </Text>

                        <View className="text-2xl font-psemibold
                            text-white">
                            <SearchInput initialQuery={query} />
                        </View>

                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this search query"
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Search;
