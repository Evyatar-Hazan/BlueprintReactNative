import { StyleSheet } from 'react-native';

/**
 * Styles for the HomeScreen – clean, spaced, and just stylish enough
 * to convince someone you know UI.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,                      // Stretch it all the way – we're building apps here.
    paddingHorizontal: 16,        // Because content needs breathing room.
    paddingTop: 48,               // Header needs space to make an entrance.
    backgroundColor: '#fff',      // Pure white – because your UI is pure perfection.
  },
  header: {
    fontSize: 24,                 // Big enough to say “this is important”.
    fontWeight: '700',            // Because bold text means business.
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,                 // Just enough to be readable, not enough to scream.
    color: '#666',                // Gray – the Switzerland of text colors.
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 32,            // Space at the bottom for some existential scrolling room.
  },
  buttonDemo: {
    backgroundColor: '#007AFF',  // iOS Blue – because familiarity breeds confidence.
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,             // Sharp corners are for error messages.
    alignSelf: 'flex-start',     // Button knows its place. Left-aligned, humble.
  },
  buttonText: {
    color: '#fff',                // White text on blue? Groundbreaking.
    fontWeight: '600',           // Slightly less intense than bold – just like your boss on Fridays.
  },
  inputDemo: {
    borderWidth: 1,
    borderColor: '#ccc',         // Soft gray border – so users won’t panic.
    padding: 10,
    borderRadius: 8,             // Round and friendly – just like your onboarding experience.
    backgroundColor: '#fafafa',  // Almost white. Because plain white was *too* white.
  },
});
