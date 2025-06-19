import React/* i18n:start */,{ useEffect, useState }/* i18n:end */ from "react";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";

// i18n:start
import { initI18n } from './src/i18n';
// Yes, because who *doesn't* love starting an app with an async side quest?
// i18n:end

const App = () => {
  // i18n:start
  const [ready, setReady] = useState(false); // App’s version of “hold my beer”

  useEffect(() => {
    // Initialize i18n before we dare render anything — because nothing says "UX" like "Please wait..."
    initI18n().then(() => setReady(true)); // Fingers crossed no one pulls the internet cable
  }, []);

  if (!ready) return null; // The user gets rewarded with a blank screen. Minimalism at its finest.
  // i18n:end

  return (
    <HomeScreen /> // Finally, the grand reveal: the home screen. After much suspense.
  );
};

export default App; // Because default exports are still somehow a thing
