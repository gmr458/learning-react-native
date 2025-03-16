import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react-native";
import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { palette } from "../theme/palette";
import { Button } from "./Button";
import { ResponsePexelsSearch } from "./Main";

interface HeaderProps {
    data?: ResponsePexelsSearch;
    setData: React.Dispatch<
        React.SetStateAction<ResponsePexelsSearch | undefined>
    >;
    scrollToTop: () => void;
}

const apiKey = "M3ffHfvJQaojBAgjdbnZ5c6UHRSWwEd34FdWiyccqrKCDtx3RteKnqJA";

export function Header({ data, setData, scrollToTop }: HeaderProps) {
    const [search, setSearch] = React.useState<string>("cars");
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false);
    const [loadingPrev, setLoadingPrev] = React.useState<boolean>(false);
    const [loadingNext, setLoadingNext] = React.useState<boolean>(false);

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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
                paddingHorizontal: 20,
            }}
        >
            <Button
                variant="default"
                disabled={
                    loadingSearch ||
                    loadingPrev ||
                    loadingNext ||
                    (data && data.page - 1 < 1)
                }
                loading={loadingPrev}
                startIcon={ChevronLeft}
                onPress={() => {
                    setLoadingPrev(true);
                    if (data && data.page - 1 > 0) {
                        const prevPage = data.page - 1;
                        fetchPhotos(prevPage);
                    }
                    setLoadingPrev(false);
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
                disabled={loadingSearch || loadingPrev || loadingNext}
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
                disabled={loadingSearch || loadingPrev || loadingNext}
                loading={loadingNext}
                startIcon={ChevronRight}
                onPress={() => {
                    setLoadingNext(true);
                    if (data) {
                        const nextPage = data.page + 1;
                        fetchPhotos(nextPage);
                    }
                    setLoadingNext(false);
                    scrollToTop();
                }}
            />
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
