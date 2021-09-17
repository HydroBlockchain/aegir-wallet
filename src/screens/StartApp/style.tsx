import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  slideImage: {
    flex: 1,
    width: "100%",
    paddingTop: '20%',
    resizeMode: "contain",
  },
  slideWrapper: {
    flex: 1,
  },
  slideTextWrapper: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 11,
    shadowRadius: 6.68,
    shadowOpacity: 0.36,
  },
  slideText: {
    textAlign: "center",
  }
});
