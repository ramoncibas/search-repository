import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import UserRepositoies from "./UserRepositories";

interface Repository {
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;

  // User information
  owner: { login: string; avatar_url: string };
}

const Main = () => {
  const [userName, setUser] = useState("");
  const [repositories, setRepos] = useState<Repository[]>([]);
  const [modalVisible, setModalVisible] = React.useState(true);

  console.log(repositories);

  return (
    <View>
      { modalVisible == false && <UserRepositoies value={repositories} />}
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modalVisible}
        style={styles.modalView}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View>
            <Text style={styles.textModal}>
              Veja seus <strong>Repositorios</strong> no
              <Feather 
                name="github" 
                size={20} 
                style={{ marginLeft: 5 }} 
              />
            </Text>
          </View>

          <TextInput
            onChangeText={(userName) => setUser(userName)}
            value={userName}
            placeholder="Usuario no GitHub!"
            style={styles.inputUserName}
          />
          { userName != "" && (
            <Button
              title="Enviar"
              onPress={() => {
                setModalVisible(!modalVisible);
                fetch(
                  "https://api.github.com/users/" + userName + "/repos"
                ).then((response) => {
                  response.json().then((data) => {
                    setRepos(data);
                  });
                });
              }}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "90%",
    height: 500,
    margin: "auto",
    marginTop: 22,
    backgroundColor: "#20232a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textModal: {
    fontSize: 22,
    color: "#fff",
  },
  inputUserName: {
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default Main;