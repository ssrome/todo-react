import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [addedItem, setAddedItem] = useState(null);
  const [items, setItems] = useState([
    {
      itemName: "Pay bill",
      complete: false,
    },
    {
      itemName: "Clean car",
      complete: false,
    },
  ]);

  function updateAddedItem(event) {
    setAddedItem(event.target.value);
  }

  function addItems(event) {
    event.preventDefault();
    setItems([
      ...items,
      {
        itemName: addedItem,
        complete: false,
      },
    ]);
    console.log(items);
  }
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>TO DO LIST</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={addItems}>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="input"
                    placeholder="Add item"
                    onChange={updateAddedItem}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              {items.map(function (item, index) {
                return <li key={index}>{item.itemName}</li>;
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
