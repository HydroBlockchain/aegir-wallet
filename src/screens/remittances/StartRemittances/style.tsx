import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    width: 44,
    height: 44,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 11,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
  SplashScreenWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  introLogo: {
    width: '70%',
    height: '30%',
  },
  introLogoWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  figerPrint: {
    width: 70,
    height: 70,
    marginBottom: 16,
  },
  hydroLogoTypography: {
    width: 70,
    height: 27,
    marginBottom: 55,
  },
  imageBackground: {
    bottom: 0,
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  slideWrapper: {
    flex: 1,
  },
  slide: {
    flex: 1,  
    paddingBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImageWrapper: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  slideImage: {
    width: "90%",
    maxWidth: 335,
    resizeMode: "contain",
  },
  slideTextWrapper: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  slideText: {
    color: '#FFFFFF',
    textAlign: "center",
  },
  slideTitle: {
    color: '#FFFFFF',
    textAlign: "center",
  },
  singUpWrapper: {
    flex: 1,
    paddingTop: 55,
    alignItems: 'center',
  },
  hydroLogoTypographySigup: {
    width: 124,
    height: 50,
  },
  singUpIntroImage: {
    width: "90%",
    maxWidth: 335,
    resizeMode: "contain",
  }
});

export default styles;