import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function SubList({ title, description, onRemove, index, id }) {
  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="list-item"
        >
          <title>
            <span>{title}</span>
            <span onClick={onRemove}>X</span>
          </title>
          <div className="description">{description}</div>
        </div>
      )}
    </Draggable>
  );
}
