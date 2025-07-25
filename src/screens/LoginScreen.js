import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Text, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with Email:", email);
    // Firebase email login logic here
    navigation.replace("Main");
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    // Google Login Function
  };

  const handleAppleLogin = () => {
    console.log("Apple Login");
    // Apple Login Function
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.subheading}>Welcome Back!</Text>
          <Text style={styles.helperText}>
            Please enter login details below
          </Text>

          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />

          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => console.log("Forgot Password")}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            style={styles.loginBtn}
            onPress={handleLogin}
          >
            Sign In
          </Button>

          <Divider style={{ marginVertical: 15 }} />
          <Text style={styles.orText}>or continue</Text>

          <Button
            icon={() => (
              <MaterialCommunityIcons
                name="google"
                size={20}
                color="#DB4437"
              />
            )}
            mode="outlined"
            style={styles.socialBtn}
            onPress={handleGoogleLogin}
          >
            Log in with Google
          </Button>

          <Button
            icon={() => (
              <MaterialCommunityIcons
                name="apple"
                size={20}
                color="#000"
              />
            )}
            mode="outlined"
            style={styles.socialBtn}
            onPress={handleAppleLogin}
          >
            Log in with Apple
          </Button>

          <View style={styles.signupContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => console.log("Sign Up")}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    paddingVertical: 20,
    borderRadius: 16,
    elevation: 5,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  helperText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  forgotText: {
    color: "#0000EE",
    textAlign: "right",
    marginBottom: 10,
  },
  loginBtn: {
    backgroundColor: "#000",
    borderRadius: 8,
    marginBottom: 10,
  },
  orText: {
    textAlign: "center",
    color: "#777",
    marginBottom: 10,
  },
  socialBtn: {
    borderRadius: 8,
    marginVertical: 4,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signupText: {
    color: "#6200ee",
    fontWeight: "bold",
  },
});
