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
  const [editedItem, setEditedItem] = useState("");

  function updateAddedItem(event) {
    setAddedItem(event.target.value);
  }

  function addItems(event) {
    event.preventDefault();
    if (addedItem && addedItem.length > 0) {
      setItems([
        ...items,
        {
          itemName: addedItem,
          complete: false,
          edit: false,
        },
      ]);
    } else {
      console.log(items);
    }
    setAddedItem("");
  }

  function deleteItem(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  function completeItem(index) {
    const newItems = [...items];
    if (newItems[index].complete === false) {
      newItems[index].complete = true;
      setItems(newItems);
    } else if (newItems[index].complete === true) {
      newItems[index].complete = false;
      setItems(newItems);
    }
  }

  function showCompleteButton(complete) {
    if (complete === false) {
      return "Done";
    } else if (complete === true) {
      return "Undo";
    }
  }

  function editItem(index) {
    const newItems = [...items];
    if (newItems[index].edit === false) {
      newItems[index].edit = true;
      setItems(newItems);
    } else if (newItems[index].edit === true) {
      newItems[index].edit = false;
      setItems(newItems);
    }
  }

  function updateEditItem(event) {
    if (event.target.value.length > 0) {
      setEditedItem(event.target.value);
    } else {
      return "";
    }
  }

  function saveEditedText(index) {
    const newItems = [...items];
    newItems[index].itemName = editedItem;
    newItems[index].edit = false;
    setItems(newItems);
  }

  function showEditBox(index) {
    if (items[index].edit === true) {
      return (
        <div>
          <Form.Control
            className="editInput"
            type="text"
            aria-label="edit item input"
            defaultValue={items[index].itemName}
            onChange={updateEditItem}
          />{" "}
          <Button variant="info" onClick={() => saveEditedText(index)}>
            Save
          </Button>
        </div>
      );
    } else {
      return (
        <ToDoItem
          item={items[index].itemName}
          complete={items[index].complete}
          index={index}
        />
      );
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
                    <Col>{showEditBox(index)}</Col>
                    <Col xs lg={4} className="listButtons">
                      <Button
                        variant="success"
                        onClick={() => completeItem(index)}
                      >
                        {showCompleteButton(item.complete)}
                      </Button>{" "}
                      <Button variant="light" onClick={() => editItem(index)}>
                        Edit
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
