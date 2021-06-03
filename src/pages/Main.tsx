import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Modal, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import ListUserRepositories from "./components/ListUserRepositories";

interface Repository {
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;

  // User information
  owner: { login: string; avatar_url: string };
}

const Main = () => {
  const [userName, setUser] = useState("");
  const [repositories, setRepos] = useState<Repository[]>([]);
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        style={styles.modalView}
      >
        <View>
          <View>
            <Text style={styles.textModal}>
              Veja seus <strong>Repositorios</strong> no
              <Feather name="github" size={20} style={{ marginLeft: 5 }} />
            </Text>

            <TextInput
              onChangeText={(userName) => setUser(userName)}
              value={userName}
              placeholder="Usuario no Github!"
              style={styles.inputUserName}
            />

            {userName != "" && (
              <Button
                title="Buscar"
                onPress={() => {
                  setModalVisible(false);
                  fetch("https://api.github.com/users/" + userName + "/repos")
                  .then((response) => {
                    response.json().then((data) => {
                      setRepos(data);
                    });
                  });
                }}
              />
            )}
          </View>
        </View>
      </Modal>
      {modalVisible != true && <ListUserRepositories value={repositories} />}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    backgroundColor: "#20232a",
    justifyContent: "center",
    padding: 35,
    marginTop: StatusBar.currentHeight || 0,
    borderWidth: 0,
  },
  textModal: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
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