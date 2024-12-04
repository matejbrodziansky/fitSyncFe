import { useEvent } from 'expo';
import { useState } from "react";
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from "react-native";

import { icons } from "../constants";


const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
    const [play, setPlay] = useState(false);


    const player = useVideoPlayer(video, player => {
        player.loop = true;
    });




    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    return (
        <View className="flex flex-col items-center px-4 mb-14">
            <View className="flex flex-row gap-3 items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="flex justify-center flex-1 ml-3 gap-y-1">
                        <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {creator}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>


            {play ? (

                <View style={styles.contentContainer}>
                    <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                    />

                    <View style={styles.controlsContainer}>
                        <Button
                            title={isPlaying ? 'Pause' : 'Play'}
                            onPress={() => {
                                if (isPlaying) {
                                    player.pause();
                                } else {
                                    player.play();
                                }
                            }}
                        />
                    </View>
                </View>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setPlay(true);
                        player.play();
                    }}
                    className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />

                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>

            )}
        </View>
    );
};

export default VideoCard;


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});