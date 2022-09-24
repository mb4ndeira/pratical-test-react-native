import { StyleSheet, useWindowDimensions } from "react-native";

import {
  verticalScale,
  scale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const useStyles = (): { [key: string]: StyleSheet.NamedStyles<unknown> } => {
  const mainStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
      color: "#333333",
    },
  });

  const headerStyles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: verticalScale(56),
      paddingHorizontal: scale(16),
    },
    greeting: {
      marginLeft: moderateScale(8),
      fontSize: verticalScale(22),
      fontWeight: "600",
      lineHeight: verticalScale(28),
    },
    profile: {
      width: verticalScale(40),
      height: verticalScale(40),
      resizeMode: "cover",
      borderRadius: verticalScale(20),
    },
  });

  const bookStyles = StyleSheet.create({
    bookContainer: {
      marginRight: moderateScale(12),
      width: scale(104),
    },
    cover: {
      width: "100%",
      borderRadius: scale(4),
    },
    bookTitle: {
      marginTop: moderateVerticalScale(5),
      fontSize: verticalScale(14),
      fontWeight: "500",
      lineHeight: verticalScale(16),
      textTransform: "capitalize",
    },
    author: {
      marginTop: moderateVerticalScale(2),
      fontSize: verticalScale(12),
      fontWeight: "400",
      lineHeight: verticalScale(14),
      color: " #4F4F4F",
    },
    stars: {
      flexDirection: "row",
      marginTop: moderateVerticalScale(4),
    },
    star: {
      marginRight: moderateScale(2),
      fontSize: verticalScale(10),
      color: "#673403",
    },
  });

  const shelfFloorStyles = StyleSheet.create({
    shelfContainer: {
      marginTop: moderateVerticalScale(24),
    },
    title: {
      marginLeft: moderateScale(16),
      fontSize: verticalScale(18),
      fontWeight: "600",
      lineHeight: verticalScale(21.6),
    },
    list: {
      marginTop: moderateVerticalScale(16),
      paddingLeft: moderateScale(16),
    },
  });

  return { ...mainStyles, ...headerStyles, ...bookStyles, ...shelfFloorStyles };
};

export const useSearchStyles = () => {
  const { width } = useWindowDimensions();

  const searchStyles = StyleSheet.create({
    search: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: moderateVerticalScale(16),
      width: width - scale(16 * 2),
      height: verticalScale(56),
      padding: scale(20),
      paddingLeft: scale(16),
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "#F2F2F2",
    },
    input: {
      width: "100%",
      height: verticalScale(16),
      fontSize: verticalScale(16),
      fontWeight: "400",
      lineHeight: verticalScale(16),
    },
  });

  return { ...searchStyles };
};

export default useStyles;
