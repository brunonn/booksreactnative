import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../locales/colors';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {useDispatch, useSelector} from 'react-redux';
import {addBook} from '../../actions/booksActions';
import {LibraryStackParams, TabParams} from '../../navigation/NavigationParams';
import {RootState} from '../../reducers';
import BookDetailsForm from '../../components/books/BookDetailsForm';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

type LibraryBookDetailsNavigationProps = BottomTabNavigationProp<
  TabParams,
  'Library'
>;
type LibraryBookDetailsScreenRouteProp = RouteProp<
  LibraryStackParams,
  'LibraryBookDetails'
>;

interface Props {
  navigation: LibraryBookDetailsNavigationProps;
  route: LibraryBookDetailsScreenRouteProp;
}

const LibraryBookDetails = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const book = useSelector(
    (state: RootState) => state.books.allBooks[route.params.bookId],
  );

  const addBookHandler = () => {
    dispatch(addBook(book));
    navigation.navigate('Books', {
      screen: 'Books',
      initial: false,
    });
  };

  return (
    <BookDetailsForm
      {...{book}}
      footer={
        <>
          <TouchableOpacity style={styles.addContainer}>
            <Text style={styles.addText}>Dodaj książkę do swojej kolekcji</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={addBookHandler}>
            <SimpleLineIcon name="plus" size={30} color={Colors.grey} />
          </TouchableOpacity>
        </>
      }
    />
  );
};
const styles = StyleSheet.create({
  addText: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  addContainer: {
    marginTop: 20,
  },
});
export default LibraryBookDetails;
