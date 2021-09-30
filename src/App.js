import React, { useState } from "react";
import List from "./Component/List";
import ModalBox from "./CustomComponent/ModalBox";
import "./App.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function App() {
  const [listObj, setListObj] = useState({});
  const [currentList, setCurrentList] = useState({});
  const [modal, setModal] = useState(false);

  const returnList = () => {
    return Object.values(listObj).map((el, index) => (
      <Droppable key={el.id} droppableId={el.id}>
        {(provided) => (
          <div key={el.id} {...provided.droppableProps} ref={provided.innerRef}>
            <List
              removeListItem={() => removeListItem(el.id)}
              title={el.title}
              id={el.id}
              key={el.id}
              addMoreSubList={(list) => addSubList(el.id, list)}
              subList={listObj?.[el.id]?.subList}
            />
          </div>
        )}
      </Droppable>
    ));
  };

  const addSubList = (id, list) => {
    const tempListObj = { ...listObj };
    tempListObj[id] = {
      ...tempListObj[id],
      subList: list,
    };
    setListObj(tempListObj);
  };

  const removeListItem = (id) => {
    const tempListObj = { ...listObj };
    delete tempListObj[id];
    setListObj(tempListObj);
  };

  const onAddList = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setCurrentList({});
    setModal(false);
  };

  const onDragEnd = (result) => {
    const { source, draggableId, destination } = result;
    // dropped outside the list
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }
    const tempListObj = { ...listObj };
    let tempItem = tempListObj[source.droppableId].subList[draggableId];
    tempListObj[destination.droppableId].subList[draggableId] = { ...tempItem };
    delete tempListObj[source.droppableId].subList[draggableId];
    setListObj(tempListObj);
  };

  const onChangeTitle = (event) => {
    const listLen = Object.values(listObj).length;
    const tempList = {
      id: `${listLen}-${Math.floor(Math.random() * 10)}`,
      title: event.target.value,
    };
    setCurrentList(tempList);
  };

  const onAddMoreList = () => {
    const tempListObj = { ...listObj };
    tempListObj[currentList.id] = { ...currentList };
    setListObj(tempListObj);
    setCurrentList({});
    setModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">Trello Board</header>
      <div className="add-btn-container">
        <button onClick={onAddList}>Add List</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list-container">{returnList()}</div>
      </DragDropContext>
      <ModalBox
        open={modal}
        onClose={onCloseModal}
        title="Add List"
        actions={
          <div>
            <button onClick={onAddMoreList}>Add</button>
            <button onClick={onCloseModal}>Close</button>
          </div>
        }
      >
        <div>
          <span className="margin-r-20">Title</span>
          <input
            id="list-title"
            value={currentList.title}
            onChange={onChangeTitle}
          />
        </div>
      </ModalBox>
    </div>
  );
}
