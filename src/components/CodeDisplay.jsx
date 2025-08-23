// src/components/CodeDisplay.jsx
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, dracula, okaidia, coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const themes = {
  "VS Code Dark+": vscDarkPlus,
  Dracula: dracula,
  Okaidia: okaidia,
  Coy: coy,
};

const CodeDisplay = ({ snippets }) => {
  const languages = Object.keys(snippets);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedTheme, setSelectedTheme] = useState("VS Code Dark+");

  return (
    <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-gray-700 p-4 bg-gray-900">
      {/* Language Selector */}
      <div className="flex flex-wrap gap-3 mb-4">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              selectedLang === lang
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Theme Selector */}
      <div className="flex gap-3 mb-4">
        {Object.keys(themes).map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              selectedTheme === theme
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Code Snippet */}
      <SyntaxHighlighter
        language={selectedLang.toLowerCase()}
        style={themes[selectedTheme]}
        showLineNumbers={true}
        customStyle={{
          padding: "20px",
          fontSize: "15px",
          borderRadius: "0.75rem",
          background: "#1e1e1e",
        }}
      >
        {snippets[selectedLang]}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
