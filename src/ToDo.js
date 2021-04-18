import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
export default function ToDo() {
  const [addedItem, setAddedItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );

  function updateAddedItem(event) {
    if (event.target.value.length > 0) {
      setAddedItem(event.target.value);
    } else {
      return "";
    }
  }

  function addItems(event) {
    event.preventDefault();
    if (addedItem && addedItem.length > 0) {
      setItems([
        ...items,
        {
          itemName: addedItem,
          complete: false,
        },
      ]);
    } else {
      console.log(items);
    }
    console.log(items);
    setAddedItem("");
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

  function showCompleteButton(complete) {
    if (complete === false) {
      return "Mark Complete";
    } else if (complete === true) {
      return "Undo Complete";
    }
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  return (
    <div>
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
                  value={addedItem}
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
                        {showCompleteButton(item.complete)}
                      </Button>{" "}
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
    </div>
  );
}
