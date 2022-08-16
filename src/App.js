import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import Sentence from "./features/sentence/Sentence";
import Word from "./features/word/Word";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sentence" element={<Sentence />} />
        <Route path="/word" element={<Word />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
