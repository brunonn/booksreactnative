import React, {useCallback, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {Colors} from '../../locales/colors';
import {Input} from 'react-native-elements';
import {getAllBooks} from '../../actions/booksActions';
import {useDispatch, useSelector} from 'react-redux';
import LibraryItem from '../../components/library/LibraryItem';
import {RootState} from '../../reducers';
import {StackScreenProps} from '@react-navigation/stack';
import {LibraryStackParams} from '../../navigation/NavigationParams';

const LibraryScreen = ({
  navigation,
}: StackScreenProps<LibraryStackParams, 'Library'>) => {
  const allBooksKeys = useSelector(
    (state: RootState) => state.books.allBooksKeys,
  );
  const pending = useSelector((state: RootState) => state.books.pending);
  const dispatch = useDispatch();

  const fetchAll = useCallback(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text>Szukaj książek innych użytkowników </Text>
      <Input
        onChangeText={() => {}}
        rightIcon={{
          type: 'font-awesome',
          name: 'search',
          color: Colors.orange,
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={allBooksKeys}
        ListHeaderComponent={renderHeader}
        renderItem={({item: bookId}) => (
          <LibraryItem
            {...{bookId}}
            onPress={() => navigation.navigate('LibraryBookDetails', {bookId})}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={pending} onRefresh={fetchAll} />
        }
        numColumns={3}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  header: {margin: 20},
});

export default LibraryScreen;
