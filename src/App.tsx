import { Button } from 'antd';
import React from 'react';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="App-link" type="primary" danger loading>
          Button
        </Button>
      </header>
    </div>
  );
}

export default App;
