import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

type DemoBoxProps = {
  title: string;             // A bold headline to convince the user this matters
  description: string;       // A short explanation the user may or may not read
  children: React.ReactNode; // The content you want to show off – demo, unicorn, etc.
};

/**
 * DemoBox – A reusable component to showcase your brilliant UI pieces.
 * Includes a title, a description, and a children container with extra styling.
 */
export const DemoBox: React.FC<DemoBoxProps> = ({ title, description, children }) => {
  return (
    <View style={styles.container}>
      {/* Because nothing says "professional" like a solid title */}
      <Text style={styles.title}>{title}</Text>

      {/* Clarifying text – in case the title wasn't enough */}
      <Text style={styles.description}>{description}</Text>

      {/* The main event – where the demo lives and occasionally breaks */}
      <View style={styles.demoContainer}>
        {children}
      </View>
    </View>
  );
};
