import React from "react";
import "./styles/styles.css";
import Header from "./components/Header";
import Book from "./components/Book";
import Footer from "./components/Footer";
import story from "./data/story";

function App() {
  return (
    <div className="App">
      {/* <Header title="Los Ultimos Exploradores" /> */}
      <Book pages={story} />
      <Footer />
    </div>
  );
}

export default App;
