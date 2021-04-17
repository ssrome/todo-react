import React from "react";

export default function ToDoItem(props) {
  if (props.complete === false) {
    return <div className="incompletedItem">{props.item}</div>;
  } else {
    return <div className="completedItem">{props.item}</div>;
  }
}
