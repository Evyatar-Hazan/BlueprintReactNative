import { StyleSheet } from 'react-native';

/**
 * Styles for the DemoBox component – because even boxes deserve to look good.
 */
export const styles = StyleSheet.create({
  container: {
    marginVertical: 12,           // Personal space – even components need it
    padding: 16,                  // Comfort padding for internal peace
    backgroundColor: '#F0F4F8',   // Subtle blue-gray for that "enterprise" feel
    borderRadius: 12,             // Rounded corners – because sharp edges hurt
    shadowColor: '#000',          // A gentle shadow to suggest depth (and mystery)
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,                 // Android's way of saying "I see your shadow"
  },
  title: {
    fontSize: 18,                 // Big enough to command attention
    fontWeight: '600',            // Bold-ish – but not yelling
    marginBottom: 4,              // Space between headline and subtext
  },
  description: {
    fontSize: 14,                 // Calm, explanatory, and maybe overlooked
    color: '#666',                // Classic neutral gray – not trying too hard
    marginBottom: 8,              // A small breath before the demo
  },
  demoContainer: {
    paddingVertical: 8,           // Just a little cushion for your demo greatness
  },
});
