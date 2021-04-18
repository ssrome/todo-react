import React from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ToDo from "./ToDo";

export default function App() {
  return (
    <div className="App">
      <Container>
        <header>
          <h1>TO DO LIST</h1>
        </header>
        <ToDo />
      </Container>
    </div>
  );
}
