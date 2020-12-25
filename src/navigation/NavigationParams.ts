import {NavigatorScreenParams} from '@react-navigation/native';

export type BookStackParams = {
  Books: undefined;
  BookDetails: {bookId: string};
};

export type CreateBookStackParams = {
  Create: undefined;
  CreateOwn: undefined;
};

export type LibraryStackParams = {
  Library: undefined;
  LibraryBookDetails: {bookId: string};
};

export type ProfileStackParams = {
  Profile: undefined;
  EditProfile: undefined;
};
export type TabParams = {
  Books: NavigatorScreenParams<BookStackParams>;
  Create: NavigatorScreenParams<CreateBookStackParams>;
  Library: NavigatorScreenParams<LibraryStackParams>;
  Profile: NavigatorScreenParams<ProfileStackParams>;
};
