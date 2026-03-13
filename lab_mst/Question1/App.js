//import logo from "./logo.svg";
import "./App.css";
import Test from "./Test";
import { Demo } from "./Test";
import { useState } from "react";
import UserForm from "./labmstq1.js";
function App() {
  const [data, SetData] = useState(0);
  var num = 10;
  var name = "suraj";
  function demo() {
    SetData(data - 1);
  }
  return (
    <>
      <UserForm/>
    </>
  );
}

export default App;

