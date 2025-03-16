import { StatusBar } from "expo-status-bar";
import {
    CameraIcon,
    ChevronLeft,
    ChevronRight,
    SearchIcon,
} from "lucide-react-native";
import * as React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette } from "../theme/palette";
import { Button } from "./Button";

const apiKey = "";

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
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false);
    const [loadingReload, setLoadingReload] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>("cars");
    const edgeInsets = useSafeAreaInsets();
    const scrollViewRef = React.useRef<ScrollView>(null);

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    };

    const fetchPhotos = async (page: number = 1) => {
        const url = `https://api.pexels.com/v1/search?query=${search}&page=${page}&per_page=10&size=small`;
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey,
            },
        });

        if (response.ok) {
            const data: ResponsePexelsSearch = await response.json();
            setData(data);
        }
    };

    React.useEffect(() => {
        fetchPhotos();
    }, []);

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
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <Button
                    variant="default"
                    disabled={
                        loadingSearch ||
                        loadingReload ||
                        (data && data.page - 1 < 1)
                    }
                    loading={loadingReload}
                    startIcon={ChevronLeft}
                    onPress={() => {
                        setLoadingReload(true);
                        if (data && data.page - 1 > 0) {
                            const prevPage = data.page - 1;
                            fetchPhotos(prevPage);
                        }
                        setLoadingReload(false);
                        scrollToTop();
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    textAlign="left"
                    value={search}
                    onChangeText={setSearch}
                />
                <Button
                    variant="default"
                    disabled={loadingSearch || loadingReload}
                    loading={loadingSearch}
                    startIcon={SearchIcon}
                    onPress={() => {
                        setLoadingSearch(true);
                        fetchPhotos();
                        setLoadingSearch(false);
                        scrollToTop();
                    }}
                />
                <Button
                    variant="default"
                    disabled={loadingSearch || loadingReload}
                    loading={loadingReload}
                    startIcon={ChevronRight}
                    onPress={() => {
                        setLoadingReload(true);
                        if (data) {
                            const nextPage = data.page + 1;
                            fetchPhotos(nextPage);
                        }
                        setLoadingReload(false);
                        scrollToTop();
                    }}
                />
            </View>
            <ScrollView ref={scrollViewRef}>
                <View style={{ gap: 20, paddingHorizontal: 10 }}>
                    {data?.photos.map((photo) => (
                        <View
                            key={photo.id}
                            style={[styles.card]}
                            renderToHardwareTextureAndroid={false}
                        >
                            <Image
                                alt={photo.alt}
                                source={{ uri: photo.src.tiny }}
                                style={styles.image}
                            />
                            <Text style={styles.text}>{photo.alt}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 4,
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    paddingVertical: 4,
                                    paddingHorizontal: 8,
                                    borderRadius: 4,
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.5,
                                    elevation: 5,
                                }}
                            >
                                <CameraIcon size={12} color={palette.white} />
                                <Text
                                    style={{
                                        fontFamily: "Inter_500Medium",
                                        color: palette.white,
                                        fontSize: 10,
                                    }}
                                >
                                    {photo.photographer}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: "Inter_500Medium",
        backgroundColor: palette.zinc_100,
        flex: 1,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: palette.slate_300,
        height: 42,
        borderRadius: 6,
        paddingLeft: 10,
        paddingTop: 0,
        paddingBottom: 0,
    },
    card: {
        width: 280,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: palette.zinc_300,
        backgroundColor: palette.zinc_100,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        boxShadow: "2px 6px 8px rgba(0, 0, 0, 0.1)",
    },
    image: {
        width: "100%",
        height: 250,
        position: "relative",
    },
    text: {
        color: palette.zinc_800,
        paddingVertical: 12,
        maxWidth: "60%",
        textAlign: "center",
        fontFamily: "Inter_500Medium",
    },
});
