import * as React from "react";
import { Animated } from "react-native";
import { CardPhoto } from "./CardPhoto";
import { PexelsSearchPhoto } from "./Main";

interface AnimatedCardPhotoProps {
    photo: PexelsSearchPhoto;
    index: number;
}

export function AnimatedCardPhoto({ photo, index }: AnimatedCardPhotoProps) {
    const opacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            delay: index * 500,
            useNativeDriver: true,
        }).start();
    }, [opacity, index]);

    return (
        <Animated.View style={{ opacity }}>
            <CardPhoto photo={photo} />
        </Animated.View>
    );
}
