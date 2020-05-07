import React from 'react';

import Store from "./store";
import Header from "./components/Header";
import TypingTest from "./components/TypingTest";

import './App.css';

const App = () => (
    <Store>
      <Header />
      <TypingTest />
    </Store>
  );

export default App;
