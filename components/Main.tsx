import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedCardPhoto } from "./AnimatedCardPhoto";
import { Header } from "./Header";

export interface ResponsePexelsSearch {
    total_results: number;
    page: number;
    per_page: number;
    photos: PexelsSearchPhoto[];
    next_page: string;
}

export interface PexelsSearchPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    liked: boolean;
    alt: string;
}

export function Main() {
    const [data, setData] = React.useState<ResponsePexelsSearch>();
    const edgeInsets = useSafeAreaInsets();
    const flatListRef = React.useRef<FlatList>(null);

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: false });
        }
    };

    return (
        <View
            style={{
                paddingTop: edgeInsets.top,
                paddingBottom: edgeInsets.bottom,
                gap: 20,
                marginTop: 20,
                marginBottom: 20,
            }}
        >
            <StatusBar style="light" />
            <Header data={data} setData={setData} scrollToTop={scrollToTop} />
            {data ? (
                <FlatList
                    ref={flatListRef}
                    data={data.photos}
                    style={{
                        paddingHorizontal: 20,
                    }}
                    contentContainerStyle={{ gap: 20 }}
                    keyExtractor={(photo, _) => photo.id.toString()}
                    renderItem={({ item, index }) => (
                        <AnimatedCardPhoto photo={item} index={index} />
                    )}
                />
            ) : null}
        </View>
    );
}
