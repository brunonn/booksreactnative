import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LoginForm from '../../components/auth/LoginForm';
import {Button} from '../../components/UI';
import {Colors} from '../../locales/colors';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  const opacity = useSharedValue(0);

  const translateY = useDerivedValue(() =>
    interpolate(opacity.value, [0, 1], [0, height * 0.5]),
  );

  const translateX = useDerivedValue(() =>
    interpolate(opacity.value, [0, 1], [width, 0]),
  );

  const opacityReverse = useDerivedValue(() =>
    interpolate(opacity.value, [0, 1], [1, 0]),
  );

  const buttons = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(translateY.value, {
          velocity: 1,
        }),
      },
    ],
  }));

  const form = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, {
          velocity: 1,
        }),
      },
    ],
  }));

  const hiddenText = useAnimatedStyle(() => ({
    opacity: withTiming(opacityReverse.value, {
      duration: 300,
      easing: Easing.linear,
    }),
  }));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.titleContainer,
          {position: 'absolute', top: height * 0.08},
        ]}>
        <Text style={styles.title}>Your books</Text>
      </View>
      <Animated.View
        style={[{position: 'absolute', top: height * 0.3}, hiddenText]}>
        <Text style={styles.bottomTitle}>Collect your books and</Text>
        <Text style={styles.bottomTitle}>search for new ones</Text>
      </Animated.View>
      <Animated.View
        style={[{position: 'absolute', top: height / 5 + height * 0.08}, form]}>
        <LoginForm
          onBack={() => {
            opacity.value = 0;
          }}
        />
      </Animated.View>
      <Animated.View
        style={[{position: 'absolute', bottom: height * 0.04}, buttons]}>
        <Button
          orange
          title="Sign in"
          onPress={() => {
            opacity.value = 1;
          }}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    borderColor: Colors.orange,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: Colors.whiteFont,
    fontSize: 30,
  },
  bottomTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: Colors.lightFont,
  },
});

export default WelcomeScreen;
