import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Castle, ChartPie, Info, LibraryBig } from "lucide-react-native"; // Import the necessary icons

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {/* New Tab: Wiki */}
      <Tabs.Screen
        name="wiki"
        options={{
          title: "Wiki",
          tabBarIcon: ({ color }) => (
            <LibraryBig size={28} color={color} /> // New icon (example: LibraryBig)
          ),
        }}
      />
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Castle size={28} color={color} /> // Icon for Home
          ),
        }}
      />

      {/* Explore Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <ChartPie size={28} color={color} /> // Icon for Explore
          ),
        }}
      />

      {/* Info Tab */}
      <Tabs.Screen
        name="info"
        options={{
          title: "Info",
          tabBarIcon: ({ color }) => <Info size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
