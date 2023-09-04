import { useState, useContext } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../constants/images";
import { shell } from "@tauri-apps/api";
import Text from "../components/Text";
import Icon from "../components/Icon";
import DirectConnetOverlay from "./DirectConnetOverlay";
import { ThemeContext } from "../contexts/theme";

type ListType = "fav" | "internet" | "partners";

const NavBar = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedList, setSelectedList] = useState<ListType>("fav");
  const [showingDirectConnect, showDirectConnect] = useState(false);

  const list: { label: string; type: ListType }[] = [
    { label: "❤️ Favorites", type: "fav" },
    { label: "🌐 Internet", type: "internet" },
    { label: "🫱🏼‍🫲🏽 Partners", type: "partners" },
  ];

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.secondary }]}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => shell.open("https://open.mp/")}>
            <Image source={{ uri: images.logoDark }} style={styles.logo} />
          </TouchableOpacity>
        </View>
        <View style={styles.listing}>
          {list.map((item) => {
            return (
              <TouchableOpacity
                key={"list-type-" + item.type}
                style={[
                  styles.listItem,
                  selectedList === item.type
                    ? {
                        borderBottomWidth: 4,
                        borderColor: theme.textSelected,
                      }
                    : {},
                ]}
                onPress={() => {
                  setSelectedList(item.type);
                }}
              >
                <Text
                  semibold
                  size={1}
                  color={
                    selectedList === item.type
                      ? theme.textSelected
                      : theme.textPrimary
                  }
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.inputs}>
          <View style={styles.nicknameContainer}>
            <Icon image={images.icons.nickname} size={25} color={"white"} />
            <TextInput
              placeholder="Nickname..."
              placeholderTextColor={theme.textPlaceholder}
              style={{
                backgroundColor: "white",
                color: theme.textSecondary,
                fontWeight: "600",
                fontSize: 12,
                width: 150,
                marginRight: 10,
                marginLeft: 10,
                height: "55%",
                paddingHorizontal: 5,
                borderRadius: 3,
                // @ts-ignore
                outlineStyle: "none",
              }}
            />
          </View>
          <Icon
            image={images.icons.connect}
            size={25}
            onPress={() => showDirectConnect(!showingDirectConnect)}
            color={"white"}
          />
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon image={images.icons.settings} size={31} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon image={images.icons.info} size={28} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <DirectConnetOverlay
        visible={showingDirectConnect}
        onClose={() => showDirectConnect(!showingDirectConnect)}
      />
      {/* <View style={{ position: 'absolute', top: 0, left: 0, height: 600, width: 400, backgroundColor: 'red' }} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
  },
  logoContainer: {
    height: "100%",
    aspectRatio: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 40,
    width: 40,
    resizeMode: "stretch",
  },
  iconsContainer: {
    height: "100%",
    aspectRatio: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  iconContainer: {
    height: "80%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listing: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  listItem: {
    height: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  inputs: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  nicknameContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  nicknameInput: {},
});

export default NavBar;