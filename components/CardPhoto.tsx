import { CameraIcon } from "lucide-react-native";
import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { palette } from "../theme/palette";
import { PexelsSearchPhoto } from "./Main";

interface CardPhotoProps {
    photo: PexelsSearchPhoto;
}

export function CardPhoto({ photo }: CardPhotoProps) {
    return (
        <View style={[styles.container]}>
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
    );
}

const styles = StyleSheet.create({
    container: {
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
