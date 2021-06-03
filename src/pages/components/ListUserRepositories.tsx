import React from "react";
import { StyleSheet, Text, View, Image, FlatList, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";


const ListUserRepositories = (repositories: any) => {
  console.log(repositories.value)
  return (
    <FlatList
      contentContainerStyle={{ padding: 24 }}
      data={repositories.value}
      keyExtractor={(repos) => repos.name}
      ListHeaderComponent={() => {
        return (
          <View style={styles.flatHeader}>
            <Feather name="github" size={20} />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>
              Seus repositorios no Github
            </Text>
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
            <strong>Nome do usuario:</strong> {repos.owner.login}
          </Text>
          <Text style={styles.textRepos}>
            <strong>Nome do repositorio: </strong> {repos.name}
          </Text>

          <Text style={styles.textRepos}>
            <strong>Descrição:</strong> <br/> {repos.description}
          </Text>
          

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
    height: 50,
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
    textAlign: "center"
  },
});

export default ListUserRepositories;