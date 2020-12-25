import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../locales/colors';

import {RootState} from '../../reducers';

interface LibraryItemProps {
  bookId: string;
  onPress: () => void;
}

const LibraryItem = ({bookId, onPress}: LibraryItemProps) => {
  const book = useSelector((state: RootState) => state.books.allBooks[bookId]);

  return (
    <TouchableOpacity style={styles.bookContainer} onPress={onPress}>
      <Image source={{uri: book.uri}} style={{width: 100, height: 150}} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.authors}>{book?.authors}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    padding: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {color: Colors.font, fontFamily: 'Poppins-Medium'},
  authors: {color: Colors.lightFont, fontFamily: 'Poppins-Regular'},
});

export default LibraryItem;
