import React, { useState } from "react";
import { View, StyleSheet, Alert, Linking, ScrollView, Modal, TextInput as RNTextInput } from "react-native";
import { Text, Button, Card, Avatar, Switch, Divider, Portal, Provider as PaperProvider, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function NewProfileScreen({ navigation }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Theme handling
  const theme = useTheme();

  // Profile photo upload
  const handleProfilePicUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Change password modal logic
  const handleChangePassword = () => setShowPasswordModal(true);
  const handlePasswordSave = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("All fields are required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("New passwords do not match!");
      return;
    }
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    Alert.alert("Password changed (not really, demo only)");
  };

  // Theme toggle
  const handleThemeToggle = () => setIsDarkTheme((prev) => !prev);

  // Other placeholders
  const handleEditProfile = () => Alert.alert("Edit Profile", "Feature coming soon!");
  const handleAppSettings = () => Alert.alert("App Settings", "Feature coming soon!");
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => Alert.alert("Account deleted (not really)") },
      ]
    );
  };
  const handleSupport = () => Linking.openURL("mailto:support@example.com");
  const handleLogout = () => navigation.replace("Login");

  return (
    <PaperProvider theme={isDarkTheme ? { ...theme, dark: true, colors: { ...theme.colors, background: "#222", text: "#fff" } } : theme}>
      <View style={[styles.container, isDarkTheme && { backgroundColor: "#222" }]}>
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <ScrollView contentContainerStyle={{ paddingBottom: 64 }} showsVerticalScrollIndicator={false}>
              {/* Profile Picture and Edit Button */}
              <View style={styles.profileRow}>
                <Avatar.Image
                  size={80}
                  source={profilePic ? { uri: profilePic } : require("../../assets/icon.png")}
                  style={styles.avatar}
                />
                <Button mode="outlined" onPress={handleProfilePicUpload} style={styles.uploadBtn}>
                  Upload Photo
                </Button>
                <Button mode="text" onPress={handleEditProfile} style={styles.editBtn}>
                  Edit
                </Button>
              </View>

              {/* User Info */}
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>admin</Text>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>admin@gmail.com</Text>

              <Divider style={{ marginVertical: 16 }} />

              {/* Change Password */}
              <Button mode="outlined" onPress={handleChangePassword} style={styles.sectionBtn}>
                Change Password
              </Button>

              {/* Password Modal */}
              <Portal>
                <Modal
                  visible={showPasswordModal}
                  animationType="slide"
                  transparent
                  onRequestClose={() => setShowPasswordModal(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Change Password</Text>
                      <RNTextInput
                        placeholder="Old Password"
                        secureTextEntry
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        style={styles.modalInput}
                      />
                      <RNTextInput
                        placeholder="New Password"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={styles.modalInput}
                      />
                      <RNTextInput
                        placeholder="Confirm New Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.modalInput}
                      />
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Button mode="contained" onPress={handlePasswordSave} style={{ flex: 1, marginRight: 8 }}>
                          Save
                        </Button>
                        <Button mode="outlined" onPress={() => setShowPasswordModal(false)} style={{ flex: 1 }}>
                          Cancel
                        </Button>
                      </View>
                    </View>
                  </View>
                </Modal>
              </Portal>

              {/* Theme Toggle */}
              <View style={styles.themeRow}>
                <Text style={styles.infoLabel}>Dark Theme</Text>
                <Switch value={isDarkTheme} onValueChange={handleThemeToggle} />
              </View>

              {/* App Settings */}
              <Button mode="outlined" onPress={handleAppSettings} style={styles.sectionBtn}>
                App Settings
              </Button>

              {/* Account Deletion */}
              <Button mode="contained" onPress={handleDeleteAccount} style={styles.deleteBtn}>
                Delete Account
              </Button>

              <Divider style={{ marginVertical: 16 }} />

              {/* About Section */}
              <Text style={styles.aboutHeading}>About</Text>
              <Text style={styles.aboutText}>Version: 1.0.0</Text>
              <Text style={styles.aboutText}>Developer: MUKILESH S</Text>
              <Button mode="text" onPress={handleSupport} style={styles.supportBtn}>
                Contact Support
              </Button>

              <Button mode="contained" onPress={handleLogout} style={styles.btn}>
                Logout
              </Button>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    elevation: 5,
    paddingVertical: 10,
    marginTop: 48,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  avatar: {
    backgroundColor: "#e3e6fc",
  },
  uploadBtn: {
    marginLeft: 12,
  },
  editBtn: {
    marginLeft: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  infoValue: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  sectionBtn: {
    marginVertical: 6,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  deleteBtn: {
    backgroundColor: "#d32f2f",
    marginVertical: 10,
  },
  aboutHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  aboutText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 2,
  },
  supportBtn: {
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#6200ee",
    borderRadius: 8,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "85%",
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
  },
});