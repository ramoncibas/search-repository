import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, TextInput, StyleSheet, Image, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";

// Data from github Api
interface Repository {
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  html_url: string;
}

function CardUserProfile(props: any) {
  return (
    <View style={styles.cardUserProfile}>
      <Image style={styles.image} source={{ uri: props.avatar_url }} />

      <Text style={styles.textRepos}>Nome do usuario: {props.name}</Text>
      <Text style={styles.textRepos}>Bio: {props.bio}</Text>

      <Text style={styles.textRepos}>Seguidores: {props.followers}</Text>

      <Text
        style={[styles.btn, styles.linkGithub]}
        onPress={() => Linking.openURL(props.html_url)}
      >
        Github
        <Feather style={{ marginLeft: 10 }} name="github" size={20} />
      </Text>
    </View>
  );
}

const Search = () => {
  const [userName, setUser] = useState("");
  const [repositories, setRepos] = useState<Repository>();
  const [status, setStatus] = useState(Boolean);

  return (
    <SafeAreaView style={{ padding: 24 }}>
      <TextInput
        onChangeText={(userName) => setUser(userName)}
        placeholder="Busque por perfils aqui!"
        value={userName}
        style={styles.inputRepos}
      />
      <Text
        onPress={() => {
          fetch("https://api.github.com/users/" + userName)
          .then((response) => {
            response.json().then((data) => {
              setRepos(data);
            });
          });
          setStatus(true);
        }}
        style={[styles.btn, styles.search]}
      >
        Presquisar
      </Text>
      
      {
        // Passing data to the component CardUserProfile
        status == true && <CardUserProfile {...repositories} />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardUserProfile: {
    marginTop: 10,
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0d1117",
    borderRadius: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 48,
    marginRight: 16,
  },
  linkGithub: {
    marginTop: 10,
    width: "50%",
    backgroundColor: "#20232a",
  },
  textRepos: {
    marginTop: 10,
    color: "#fff",
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
  },
  search: {
    width: "100%",
    height: 40,
    backgroundColor: "#20232a",
  },
  inputRepos: {
    padding: 10,
    fontSize: 16,
    borderColor: "#c3c3c3",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Search;