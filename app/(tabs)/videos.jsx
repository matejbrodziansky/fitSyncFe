import React, { useState, useCallback } from "react";
import { Button, Text, View, Alert, Dimensions } from "react-native";
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const dimensionsForScreen = Dimensions.get('screen');

const Videos = () => {
    const [playing, setPlaying] = useState(true);
    const onStateChange = useCallback((state) => {
        console.log("Current state:", state);
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("Video has finished playing!");
        }
    }, []);
    const togglePlaying = useCallback(() => { setPlaying((prev) => !prev); }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-xl font-bold mb-4">Cvičenie - YouTube Video</Text>
                <WebView
                    source={{ uri: `https://www.youtube.com/embed/j4r8cvvcpIk?autoplay=1&mute=0` }}
                    style={{ width: dimensionsForScreen.width, height: 250 }}
                    javaScriptEnabled={true}          // Povolenie JavaScriptu
                    domStorageEnabled={true}         // Povolenie DOM storage
                    allowsInlineMediaPlayback={true} // Povolenie prehrávania médií
                    originWhitelist={['*']}          // Povolenie všetkých domén
                    onMessage={(event) => console.log(event.nativeEvent.data)}
                />

                <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
                <Text className="mt-4 text-sm text-gray-500">Klikni na video pre prehratie!</Text>
            </View>
        </SafeAreaView>
    );
};

export default Videos;
