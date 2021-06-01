import React, { useEffect, useState } from "react";
import { FlatList, View, Image, Text, StyleSheet, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Repository {
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;

  // User information
  owner: { login: string; avatar_url: string };
}

const Main = (props: any) => {
  const [repositories, setRepos] = useState<Repository[]>([]);
  console.log(props);

  useEffect(() => {
    fetch("https://api.github.com/users/" + props.user + "/repos").then(
      (response) => {
        response.json().then((data) => {
          setRepos(data);
        });
      }
    );
  }, []);

  return (
    <FlatList
      contentContainerStyle={{ padding: 24 }}
      data={repositories}
      keyExtractor={(repos) => repos.name}
      ListHeaderComponent={() => {
        return (
          <View style={styles.flatHeader}>
            <Text style={{ marginRight: 10, fontSize: 16 }}>
              Veja seus repositorios no Github
            </Text>
            <Feather name="github" size={20} />
          </View>
        );
      }}
      renderItem={({ item: repos }) => (
        <View style={styles.repository}>
          <Image
            style={styles.image}
            source={{ uri: repos.owner.avatar_url }}
          />
          <Text style={styles.textRepos}>
            Nome do usuario: {repos.owner.login}
          </Text>
          <Text style={styles.textRepos}>Path: {repos.full_name}</Text>
          {repos.private == false ? (
            <Text style={styles.textRepos}> Repositorio Publico </Text>
          ) : (
            <Text style={styles.textRepos}> Repositorio Privado </Text>
          )}

          <Text
            style={styles.link}
            onPress={() => Linking.openURL(repos.html_url)}
          >
            Repositório
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatHeader: {
    width: "100%",
    height: 100,
    marginBottom: "2rem",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  repository: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    backgroundColor: "#0d1117",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  link: {
    marginTop: 10,
    padding: 10,
    width: "50%",
    borderRadius: 10,
    backgroundColor: "#20232a",
    color: "#fff",
    textAlign: "center",
  },
  textRepos: {
    marginTop: 10,
    color: "#fff",
  },
});

export default Main;
