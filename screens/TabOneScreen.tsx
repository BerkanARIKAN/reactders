import * as React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import data from "../mock/data";
const { width } = Dimensions.get("window");
import axios from "axios";
export default class TabOneScreen extends Component {
  state = {
    text: "",
    fakeDb: data,
    name: "",
    surName: "",
    loading: true,
    page: 1,
    contacts: [],
    allContacts: [],
    refresing: false,
  };
  duringMomentum: boolean;

  constructor(props) {
    super(props);
    this.duringMomentum = false;
  }
  componentDidMount() {
    this.getContacts();
  }
  renderHeader = () => {
    const { text } = this.state;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          onFocus={() => (this.duringMomentum = true)}
          onBlur={() => (this.duringMomentum = false)}
          onChangeText={(text) => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          style={styles.searchInput}
          placeholder="Search..."
        />
      </View>
    );
  };
  onRefresing = () => {
    if (!this.duringMomentum) {
      this.setState({ page: 1, refresing: true });

      this.getContacts();
    }
  };
  searchFilter = (text: string) => {
    const newData = this.state.allContacts.filter((item) => {
      const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    this.setState({
      contacts: newData,
    });
  };
  renderDataItem = function ({ item, index }) {
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          { backgroundColor: index % 2 === 0 ? "" : "#bdc3c7" },
        ]}
      >
        <Image source={{ uri: item.picture.thumbnail }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {item.name.first} {item.name.last}
          </Text>
          <Text>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  getRandomUser = async () => {
    this.setState({
      loading: true,
    });
    const {
      data: { results },
    } = await axios.get("https://randomuser.me/api/");
    const {
      name: { first, last },
    } = results[0];

    this.setState({
      name: first,
      surName: last,
      loading: false,
    });
  };
  getContacts = async () => {
    this.state.loading = true;
    const {
      data: { results: contacts },
    } = await axios.get(
      `https://randomuser.me/api/?results=2&page=${this.state.page}`
    );

    const users = [...this.state.allContacts, ...contacts];
    if (this.state.refresing) {
      users.reverse;
    }
    this.setState({ contacts: users, allContacts: users, loading: false });
  };
  onRefresh = () => {
    alert("")
    if (!this.duringMomentum) {
      this.setState(
        {
          page: 1,
          refresing: true,
        },
        () => {
          this.getContacts();
        }
      );
    }
  };
  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loadingbar}>
        <ActivityIndicator size="large" color="#e84393" />
      </View>
    );
  };
  loadMore = () => {
    if (!this.duringMomentum) {
      this.setState({ page: +1 });
      this.getContacts();
    }
    this.duringMomentum = false;
  };
  render() {
    const { name, surName, loading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderDataItem}
          keyExtractor={(item) => item.login.uuid}
          data={this.state.contacts}
          onEndReached={this.loadMore}
          onEndReachedThreshold={2}
          refreshing={this.state.refresing}
          onRefresh={this.onRefresh}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  textContainer: {
    justifyContent: "space-around",
  },
  name: {
    fontSize: 15,
    color: "#2c3e50",
    fontWeight: "bold",
  },
  searchContainer: {
    backgroundColor: "#fafafa",
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderColor: "#000",
    borderRadius: 2,
  },
  loadingbar: {
    paddingVertical: 20,
  },
});
