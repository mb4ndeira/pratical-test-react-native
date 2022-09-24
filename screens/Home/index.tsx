import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ListRenderItem,
  SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { NYT_API_KEY } from "@env";

import useStyles, { useSearchStyles } from "./useStyles";

type Book = {
  book_uri: string;
  book_image: string;
  title: string;
  author: string;
};

const Header: React.FC = React.memo(() => {
  const { header, greeting, profile } = useStyles();

  return (
    <View style={header}>
      <Text style={greeting}>Bookshelf</Text>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
        }}
        style={profile}
      />
    </View>
  );
});

const Search: React.FC = React.memo(() => {
  const { search, input } = useSearchStyles();

  return (
    <View style={search}>
      <TextInput
        placeholder={"Qual livro você gostaria de ler hoje?"}
        autoCorrect={false}
        placeholderTextColor={"#828282"}
        style={input}
      />
    </View>
  );
});

const Book: React.FC<{ image: string; title: string; author: string }> =
  React.memo(({ image, title, author }) => {
    const {
      bookContainer,
      cover,
      bookTitle,
      author: authorStyle,
      stars,
      star,
    } = useStyles();

    return (
      <View style={bookContainer}>
        <Image source={require("../../assets/book.png")} style={cover} />
        <Text style={bookTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={authorStyle} numberOfLines={1}>
          {author}
        </Text>
        <View style={stars}>
          {[...Array(5)].map(() => (
            <Entypo name="star" style={star} />
          ))}
        </View>
      </View>
    );
  });

const ShelfFloor: React.FC<{
  title: string;
  data: Array<unknown>;
  renderItem: ListRenderItem<any>;
}> = React.memo(({ title, data, renderItem }) => {
  const { shelfContainer, title: titleStyle, list } = useStyles();

  return (
    <View style={shelfContainer}>
      <Text style={titleStyle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        style={list}
      />
    </View>
  );
});

const BookShelfFloor: React.FC<{ title: string; books: Book[] }> = React.memo(
  ({ title, books }) => {
    return (
      <ShelfFloor
        title={title}
        data={books}
        renderItem={({ item }) => (
          <Book
            key={title + item.book_uri}
            image={item.book_image}
            title={item.title}
            author={item.author}
          />
        )}
      />
    );
  }
);

const Home: React.FC = React.memo(() => {
  const { container } = useStyles();

  const [forYou, setForYou] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedLists = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=" +
          NYT_API_KEY
      )
        .then((response) => response.json())
        .then((data) => data.results.lists)
        .catch((err) => console.error(err));

      setForYou(fetchedLists[1].books);
    })();
  }, []);

  return (
    <SafeAreaView style={container}>
      <Header />
      <Search />
      <BookShelfFloor title={"Para você"} books={forYou} />
    </SafeAreaView>
  );
});

export default Home;
