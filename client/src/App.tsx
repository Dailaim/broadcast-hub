import { Megaphone, Moon, Sun } from "lucide-react";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const toggleTheme = () => {
    localStorage.setItem("theme", !isDark ? "dark" : "light");
    setIsDark(!isDark);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 relative transition-colors duration-500 overflow-hidden"
      data-theme={isDark ? "dark" : "light"}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/20 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-600/20 dark:bg-indigo-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-600/20 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      {/* Header */}
      <header className="relative border-b border-slate-200 dark:border-purple-900/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-600/20 rounded-lg">
                <Megaphone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-600 dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-400 dark:bg-clip-text dark:text-transparent">
                  Broadcast Hub
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Schedule and manage your announcements
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => toggleTheme()}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2"></div>
      </main>
    </div>
  );
}

export default App;
