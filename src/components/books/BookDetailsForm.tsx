import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';

import {Colors} from '../../locales/colors';
import {Book} from '../../models/Book';

interface BookDetailsFormProps {
  book: Book;
  footer: React.ReactNode;
}

const BookDetailsForm = ({book, footer}: BookDetailsFormProps) => {
  return (
    <ScrollView style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.authors}>
          {' '}
          {book.authors?.map((author, index) => {
            if (index === book.authors.length - 1) {
              return author;
            }
            return `${author}, `;
          })}
        </Text>

        <Image source={{uri: book?.uri}} style={styles.image} />
        {footer}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    textAlign: 'center',
  },
  authors: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 300,
    marginTop: 5,
  },
});
export default BookDetailsForm;
