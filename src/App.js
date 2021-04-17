import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [addedItem, setAddedItem] = useState(null);
  //const [completedItems, setCompletedItems] = useState(null);
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

  function deleteItem(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    console.log(items);
  }

  function completeItem(index) {
    const newItems = [...items];
    if (newItems[index].complete === false) {
      newItems[index].complete = true;
      setItems(newItems);
      console.log(items);
    } else if (newItems[index].complete === true) {
      newItems[index].complete = false;
      setItems(newItems);
      console.log(items);
    }
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
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    aria-label="add item input"
                    placeholder="Add item"
                    autoComplete="off"
                    onChange={updateAddedItem}
                  />
                </Col>
                <Col xs lg={1}>
                  {" "}
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {items.map(function (item, index) {
                return (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col>
                        <ToDoItem
                          item={item.itemName}
                          complete={item.complete}
                          index={index}
                        />
                      </Col>
                      <Col xs lg={4} className="listButtons">
                        <Button
                          variant="success"
                          onClick={() => completeItem(index)}
                        >
                          Complete
                        </Button>{" "}
                        <Button variant="light">Edit</Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => deleteItem(index)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
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
