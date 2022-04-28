/*
This is the main app file for the applicaiton which allows for the application to display the correct 
content according to the route in the application.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import React from "react";
import './style//App.css';
import RoutesFor from "./mod_components/RoutesFor.js";

function App() {
  return (
    <RoutesFor />
  );
}

export default App;