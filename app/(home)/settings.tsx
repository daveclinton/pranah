import { useAuth, useUser } from "@clerk/clerk-expo"; // for Logout + real name
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Settings</Text>

        {/* Profile */}
        <TouchableOpacity style={styles.item}>
          <View style={[styles.iconWrapper, { backgroundColor: "#E0F8B9" }]}>
            <Ionicons name="person-circle-outline" size={22} color="#02271D" />
          </View>
          <Text style={styles.itemText}>
            {user?.fullName ? user.fullName : "Profile"}
          </Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={styles.item}>
          <View style={[styles.iconWrapper, { backgroundColor: "#C6F3EA" }]}>
            <Ionicons name="notifications-outline" size={20} color="#016A5B" />
          </View>
          <Text style={styles.itemText}>Notifications</Text>
        </TouchableOpacity>

        {/* Change Password */}
        <TouchableOpacity style={styles.item}>
          <View style={[styles.iconWrapper, { backgroundColor: "#D7E7FF" }]}>
            <MaterialCommunityIcons
              name="key-outline"
              size={20}
              color="#003A83"
            />
          </View>
          <Text style={styles.itemText}>Change Password</Text>
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity style={styles.item}>
          <View style={[styles.iconWrapper, { backgroundColor: "#E5F4D7" }]}>
            <FontAwesome5 name="globe" size={18} color="#3E6C1C" />
          </View>
          <Text style={styles.itemText}>Language</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.item}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <View style={[styles.iconWrapper, { backgroundColor: "#FFDAD4" }]}>
            <Ionicons name="log-out-outline" size={20} color="#B00020" />
          </View>
          <Text style={[styles.itemText, { color: "#B00020" }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D", // root theme background
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapper: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  itemText: {
    fontSize: 15,
    color: "#012D24",
    fontWeight: "600",
  },
});
