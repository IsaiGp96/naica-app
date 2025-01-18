import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Castle, ChartPie, LibraryBig } from "lucide-react-native"; // Importa los íconos necesarios

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
      {/* Nuevo Tab: Wiki */}
      <Tabs.Screen
        name="wiki"
        options={{
          title: "Wiki",
          tabBarIcon: ({ color }) => (
            <LibraryBig size={28} color={color} /> // Nuevo icono (ejemplo: LibraryBig)
          ),
        }}
      />
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Castle size={28} color={color} /> // Icono para Home
          ),
        }}
      />

      {/* Explore Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <ChartPie size={28} color={color} /> // Icono para Explore
          ),
        }}
      />
    </Tabs>
  );
}
