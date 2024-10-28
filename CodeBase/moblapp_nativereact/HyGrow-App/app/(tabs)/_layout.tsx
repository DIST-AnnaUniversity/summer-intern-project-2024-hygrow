import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Temperature"
        options={{
          title:'Temperature',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'thermometer' : 'thermometer-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Humidity"
        options={{
          title:'Humidity',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'water' : 'water-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="MotorStatus"
        options={{
          title:'MotorStatus',
          tabBarIcon: ({ color, focused }) =>(
            <TabBarIcon name={focused ? 'speedometer' : 'speedometer-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Settings"
        options={{
          title:'Settings',
          tabBarIcon: ({ color, focused }) =>(
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs> 
  );
}
