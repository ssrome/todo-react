import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [addedItem, setAddedItem] = useState(null);
  const [items, setItems] = useState([
    {
      id: 1,
      itemName: "Pay bill",
      complete: false,
    },
    {
      id: 2,
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
        id: uuidv4(),
        itemName: addedItem,
        complete: false,
      },
    ]);
    console.log(items);
  }

  function deleteItem(event) {
    event.preventDefault();
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <header>
              <h1>TO DO LIST</h1>
            </header>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={addItems}>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="input"
                    aria-label="add item input"
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
            <ListGroup>
              {items.map(function (item, index) {
                return (
                  <ListGroup.Item key={index}>
                    {item.itemName}: {item.id}
                    <span className="listButtons">
                      <Button variant="success">Done</Button>{" "}
                      <Button variant="light">Edit</Button>{" "}
                      <Button variant="danger">Delete</Button>
                    </span>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
