import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Text, View, Alert, Dimensions } from "react-native";
import YoutubeIframe from 'react-native-youtube-iframe';
import { SafeAreaView } from 'react-native-safe-area-context';

const dimensionsForScreen = Dimensions.get('screen');
const videoHeight = Math.min(dimensionsForScreen.height * 0.4, 270);

const WorkoutVideoScreen = () => {

    const [playing, setPlaying] = useState(true);
    const playerRef = useRef();

    const onStateChange = useCallback((state) => {
        console.log("Current state:", state);
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("Video has finished playing!");
        }
    }, []);
    const togglePlaying = useCallback(() => { setPlaying((prev) => !prev); }, []);


    // TEST USE EFECT STOP VIDEO

    useEffect(() => {
        return () => {
            setPlaying(false);
        };
    }
        , []);


    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-xl font-bold mb-4">`{videoHeight} a {dimensionsForScreen.width}`</Text>
                <YoutubeIframe
                    key={playing.toString()} // Tento kľúč zabezpečí, že sa komponent bude vždy renderovať na základe stavu "playing"
                    height={videoHeight}
                    width={dimensionsForScreen.width}
                    ref={playerRef}
                    play={playing}
                    videoId={'dh2mMpZUPcE'}
                    onChangeState={onStateChange}
                />

                {/* <Button title="log details" onPress={() => {
                    playerRef.current?.getCurrentTime().then(currentTime => console.log({ currentTime }));
                    playerRef.current?.getDuration().then(getDuration => console.log({ getDuration }));
                }} /> */}

                <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />



                <Text className="mt-4 text-sm text-gray-500">Klikni na video pre prehratie!</Text>
            </View>
        </SafeAreaView>
    );
};

export default WorkoutVideoScreen;
