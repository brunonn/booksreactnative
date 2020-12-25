import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import BooksScreen from '../screens/books/BooksScreen';
import BookDetailsScreen from '../screens/books/BookDetailsScreen';

import CreateBookScreen from '../screens/books/CreateBookScreen';
import CreateOwnBookScreen from '../screens/books/CreateOwnBookScreen';

import ProfileScreen from '../screens/profile/ProfileScreen';

import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Colors} from '../locales/colors';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import LibraryScreen from '../screens/library/LibraryScreen';
import LibraryBookDetailsScreen from '../screens/library/LibraryBookDetailsScreen';
import {
  BookStackParams,
  CreateBookStackParams,
  LibraryStackParams,
  ProfileStackParams,
  TabParams,
} from './NavigationParams';

const defaultNavOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#aaa',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
};

const BooksStack = createStackNavigator<BookStackParams>();
const BooksStackNavigator = () => {
  return (
    <BooksStack.Navigator screenOptions={defaultNavOptions}>
      <BooksStack.Screen
        name="Books"
        component={BooksScreen}
        options={{title: 'Twoje książki'}}
      />
      <BooksStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{title: ''}}
      />
    </BooksStack.Navigator>
  );
};
const CreateBookStack = createStackNavigator<CreateBookStackParams>();
const CreateBookStackNavigator = () => {
  return (
    <CreateBookStack.Navigator screenOptions={defaultNavOptions}>
      <CreateBookStack.Screen
        name="Create"
        component={CreateBookScreen}
        options={{title: 'Nowa książka'}}
      />
      <CreateBookStack.Screen
        name="CreateOwn"
        component={CreateOwnBookScreen}
        options={{title: 'Własna książka'}}
      />
    </CreateBookStack.Navigator>
  );
};
const ProfileStack = createStackNavigator<ProfileStackParams>();
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={defaultNavOptions}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'Profil'}}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edytuj Profil'}}
      />
    </ProfileStack.Navigator>
  );
};
const LibraryStack = createStackNavigator<LibraryStackParams>();
const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator screenOptions={defaultNavOptions}>
      <LibraryStack.Screen
        name="Library"
        component={LibraryScreen}
        options={{title: 'Biblioteka'}}
      />
      <LibraryStack.Screen
        name="LibraryBookDetails"
        component={LibraryBookDetailsScreen}
        options={{title: 'Biblioteka'}}
      />
    </LibraryStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator<TabParams>();
export default function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Books') {
            iconName = 'book-open';
          } else if (route.name === 'Create') {
            iconName = 'plus';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Library') {
            iconName = 'notebook';
          }

          // You can return any component that you like here!
          return <SimpleLineIcon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.orange,
        inactiveTintColor: Colors.grey,
      }}>
      <MainTab.Screen
        name="Books"
        component={BooksStackNavigator}
        options={{title: 'Twoje Książki'}}
      />
      <MainTab.Screen
        name="Create"
        component={CreateBookStackNavigator}
        options={{title: 'Dodaj'}}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryStackNavigator}
        options={{title: 'Biblioteka'}}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{title: 'Profil'}}
      />
    </MainTab.Navigator>
  );
}
