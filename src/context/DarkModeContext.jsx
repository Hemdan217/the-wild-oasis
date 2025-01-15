import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "./../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode === "dark") {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("monochrome-mode");
        document.documentElement.classList.remove("light-mode");
      } else if (isDarkMode === "monochrome") {
        document.documentElement.classList.add("monochrome-mode");
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.remove("dark-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("monochrome-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  //   function toggleDarkMode() {
  //     setIsDarkMode((isDark) => !isDark);
  //   }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, setMode: setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);

export default ThemeProvider;
