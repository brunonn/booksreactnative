import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../locales/colors';

const BookItem = ({title, authors, source, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.bookImage} source={source} />
        </View>
        <View style={styles.titleAuthorContainer}>
          <Text style={styles.title}>{title}</Text>
          {authors && typeof authors !== 'string' && authors.length > 0 ? (
            <Text style={styles.author}>
              {authors.map((author, index) => {
                if (index === authors.length - 1) {
                  return author;
                }
                return `${author}, `;
              })}
            </Text>
          ) : null}
        </View>

        <View style={styles.iconContainer}>
          <SimpleLineIcon name="arrow-right" size={23} color={Colors.orange} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  imageContainer: {
    flex: 2,
    paddingHorizontal: 10,
  },
  titleAuthorContainer: {
    flex: 7,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: Colors.font,
  },
  author: {
    fontFamily: 'Poppins-Regular',
    color: Colors.font,
  },
  bookImage: {
    width: 60,
    height: 70,
    resizeMode: 'contain',
  },
});

export default BookItem;
