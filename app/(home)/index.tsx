import { useUser } from "@clerk/clerk-expo";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();

  const fullName = user?.fullName || "Aqua Farmer";
  const profileImage = user?.imageUrl;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person-outline" size={22} color="#02271D" />
              </View>
            )}

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.username}>{fullName}</Text>
            </View>
          </View>

          {/* Settings button (was notifications) */}
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => router.push("/(home)/settings")}
            activeOpacity={0.8}
          >
            <Ionicons name="settings-outline" size={22} color="#02271D" />
          </TouchableOpacity>
        </View>

        {/* Ask Aqua GPT Section */}
        <TouchableOpacity
          style={styles.askSection}
          activeOpacity={0.8}
          onPress={() => router.push("/(home)/chat")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="chatbubbles-outline" size={20} color="#FFFFFF" />
            <Text style={styles.askText}>ASK AQUA GPT</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Ionicons name="attach-outline" size={18} color="#FFFFFF" />
            <Ionicons name="sync-outline" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Quick Actions (Tiles) */}
        <View style={styles.grid}>
          {/* Scan */}
          <TouchableOpacity
            style={[styles.tile, { backgroundColor: "#C5FC61" }]}
            onPress={() => router.push("/(home)/scan")}
            activeOpacity={0.9}
          >
            <Ionicons name="scan-outline" size={24} color="#02271D" />
            <Text style={styles.tileTitle}>Scan</Text>
            <Text style={styles.tileSubtitle}>Shrimp Health scan</Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#02271D"
              style={styles.tileArrow}
            />
          </TouchableOpacity>

          {/* Record Expenses */}
          <TouchableOpacity
            style={[styles.tile, { backgroundColor: "#FFD54F" }]}
            onPress={() => router.push("/(home)/expenses")}
            activeOpacity={0.9}
          >
            <Ionicons name="cash-outline" size={24} color="#02271D" />
            <Text style={styles.tileTitle}>Record Expenses</Text>
            <Text style={styles.tileSubtitle}>
              Expense Type, Amount, Date, Notes
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#02271D"
              style={styles.tileArrow}
            />
          </TouchableOpacity>

          {/* Digital Passbook */}
          <TouchableOpacity
            style={[styles.tile, { backgroundColor: "#FF8A65" }]}
            onPress={() => router.push("/(home)/passbook")}
            activeOpacity={0.9}
          >
            <Ionicons name="document-text-outline" size={24} color="#02271D" />
            <Text style={styles.tileTitle}>Digital Passbook</Text>
            <Text style={styles.tileSubtitle}>
              Add your documents to be verified
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#02271D"
              style={styles.tileArrow}
            />
          </TouchableOpacity>

          {/* View Projections */}
          <TouchableOpacity
            style={[styles.tile, { backgroundColor: "#C7EACB" }]}
            onPress={() => router.push("/(home)/projections")}
            activeOpacity={0.9}
          >
            <Ionicons name="bar-chart-outline" size={24} color="#02271D" />
            <Text style={styles.tileTitle}>View Projections</Text>
            <Text style={styles.tileSubtitle}>
              Show predicted income, yield, or credit
            </Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#02271D"
              style={styles.tileArrow}
            />
          </TouchableOpacity>
        </View>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>Recommendations</Text>

        <View style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <MaterialCommunityIcons
              name="food-drumstick-outline"
              size={20}
              color="#00A86B"
            />
            <Text style={styles.recommendationTitle}>
              Optimize Your Feeding Schedule
            </Text>
          </View>
          <Text style={styles.recommendationText}>
            You last fed Pond 3 two days ago. Feed today with 4.5 kg of GrowMax
            feed to maintain steady growth.
          </Text>
        </View>

        <View
          style={[styles.recommendationCard, { borderLeftColor: "#FF8A65" }]}
        >
          <View style={styles.recommendationHeader}>
            <FontAwesome5 name="flask" size={18} color="#FF8A65" />
            <Text style={styles.recommendationTitle}>
              Adjust Pond pH Levels
            </Text>
          </View>
          <Text style={styles.recommendationText}>
            Pond 2 shows low pH (6.3). Apply 1 kg of lime per 100 m² to
            stabilize water quality before the next feeding.
          </Text>
        </View>

        {/* Extra Padding */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const tileWidth = (width - 24 * 2 - 16) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#C5FC61",
  },
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#C5FC61",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  bellButton: {
    backgroundColor: "#C5FC61",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  askSection: {
    borderWidth: 1,
    borderColor: "#4A675A",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  askText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: tileWidth,
    height: 140,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#02271D",
  },
  tileSubtitle: {
    fontSize: 12,
    color: "#02271D",
    opacity: 0.8,
  },
  tileArrow: {
    position: "absolute",
    bottom: 14,
    right: 14,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 12,
  },
  recommendationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#00A86B",
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  recommendationTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#02271D",
  },
  recommendationText: {
    color: "#333",
    fontSize: 13.5,
    lineHeight: 20,
  },
});
