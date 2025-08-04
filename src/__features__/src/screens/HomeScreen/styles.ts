import { StyleSheet } from 'react-native';

/**
 * Styles for the HomeScreen – clean, spaced, and just stylish enough
 * to convince someone you know UI.
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,                      // Full-screen domination. Like a boss.
    paddingHorizontal: 16,        // Because edge-to-edge is just rude. Respect the margins.
    paddingTop: 48,               // Let the header breathe. Oxygen is UI-friendly.
    backgroundColor: '#fff',      // The universal background color for “we didn’t pick a theme.”
  },
  header: {
    fontSize: 24,                 // Big, but not shouty. Assertive, not aggressive.
    fontWeight: '700',            // Bold, because we mean it. No room for hesitation here.
    marginBottom: 8,              // Space to let the title enjoy its personal bubble.
  },
  subtitle: {
    fontSize: 16,                 // Slightly less important, but still worth reading (we hope).
    color: '#666',                // Not too loud, not too quiet. Just passive enough.
    marginBottom: 16,            // One line break to rule them all.
  },
  scrollContent: {
    paddingBottom: 32,            // For that “just in case” empty space scroll.
  },
  buttonDemo: {
    backgroundColor: '#007AFF',  // Apple called, they want their blue back. Still iconic.
    paddingVertical: 10,         // Enough padding to look tappable.
    paddingHorizontal: 20,       // Horizontal breathing room – no squished buttons here.
    borderRadius: 8,             // Because rectangles are aggressive and scary.
    alignSelf: 'flex-start',     // Humble button doesn’t take up the whole row. Good manners.
  },
  buttonText: {
    color: '#fff',                // Because contrast isn’t optional.
    fontWeight: '600',           // Semi-bold. Bold enough to show up, not enough to shout.
  },
  inputDemo: {
    borderWidth: 1,              
    borderColor: '#ccc',         // The Switzerland of border colors – completely neutral.
    padding: 10,
    borderRadius: 8,             // Soft edges = friendly UX. No sharp corners, no sharp opinions.
    backgroundColor: '#fafafa',  // Technically not white, but let’s pretend we’re designers.
  },
  languageContainer: {
    flexDirection: 'row',        // Because languages like to line up.
    flexWrap: 'wrap',            // Just in case we suddenly become multilingual overnight.
    gap: 8,                      // Modern spacing: because margin hacks are so 2020.
    justifyContent: 'flex-start',// Start from the left (or right, depending on your worldview).
    marginBottom: 12,
  },
  langButton: {
    paddingVertical: 8,          // Compact, but not stingy.
    paddingHorizontal: 16,       // Because fingers are not styluses.
    backgroundColor: '#E6EAF0',  // The UI equivalent of “It’s fine.”
    borderRadius: 999,           // So round it could roll away. Chip-style aesthetic achieved.
    borderWidth: 1,
    borderColor: '#ccc',         // Again with the neutrality. Switzerland 2.0.
    marginRight: 8,              // Because buttons need personal space too.
    marginBottom: 8,
  },
  langButtonActive: {
    backgroundColor: '#007AFF',  // Look who’s active and proud.
    borderColor: '#007AFF',      // Consistency – because we *actually* care (sometimes).
  },
  langButtonText: {
    color: '#333',               // Just dark enough to be readable without screaming.
    fontSize: 14,                // Default "I fit everywhere" size.
    fontWeight: '500',           // Slightly bold – like a polite protest.
    textAlign: 'center',         // For the symmetrical soul in all of us.
  },
  langButtonTextActive: {
    color: '#fff',               // Classic “selected state” color. Nothing says “chosen” like white text on blue.
    fontWeight: '600',           // One step bolder, because you're special now.
  },
});
