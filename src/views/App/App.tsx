import React from 'react';
import logo from './logo.svg';
import {Link} from "react-router-dom";
import './App.css';



function a(input: number[], k: number): number[] {
  // write code here
  return input.sort((a:number,b:number):number=>{
      return a-b;
  }).splice(0,k)
}


console.log(a([4,5,1,6,2,7,3,8],10));

function App() {
  return (
    <div className="App">
      <Link to="/Test">打开test</Link>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
