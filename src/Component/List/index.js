import React, { useState } from "react";
import ModalBox from "../../CustomComponent/ModalBox";
import SubList from "../SubList";

function List({ title, removeListItem, id, addMoreSubList, subList }) {
  const [currentSubList, setCurrentSubList] = useState({});
  const [modal, setModal] = useState(false);

  const addSubList = () => {
    setModal(true);
  };

  const onAddSubList = () => {
    const tempListObj = { ...subList };
    tempListObj[currentSubList.id] = { ...currentSubList };
    addMoreSubList(tempListObj);
    setCurrentSubList({});
    setModal(false);
  };

  const onCloseModal = () => {
    setCurrentSubList({});
    setModal(false);
  };

  const onChangeInput = (event) => {
    const tempList = {
      ...currentSubList,
      id: new Date().getTime(),
      [event.target.id]: event.target.value,
    };
    setCurrentSubList(tempList);
  };

  const removeListSubItem = (id) => {
    const tempListObj = { ...subList };
    delete tempListObj[id];
    addMoreSubList(tempListObj);
  };

  const returnSubList = () => {
    return Object.values(subList || {}).map((el, index) => (
      <SubList
        onRemove={() => removeListSubItem(el.id)}
        key={el.id}
        description={el.description}
        title={el.title}
        index={index}
        id={el.id}
      />
    ));
  };

  return (
    <div id={id} className="list-item">
      <title className="z-index">
        <span>{title}</span>
        <span onClick={removeListItem}>X</span>
      </title>
      <div className="sub-list-container">{returnSubList()}</div>
      <div onClick={addSubList} className="add-sub-list">
        +
      </div>
      <ModalBox
        open={modal}
        onClose={onCloseModal}
        title="Add Sub List"
        actions={
          <div>
            <button onClick={onAddSubList}>Add</button>{" "}
            <button onClick={onCloseModal}>Close</button>
          </div>
        }
      >
        <div>
          <div className="sub-list-input">
            <span className="margin-r-20">Title</span>
            <input
              id="title"
              value={currentSubList.title}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="sub-list-input">
          <span className="margin-r-20">Description</span>
          <textarea
            id="description"
            value={currentSubList.description}
            onChange={onChangeInput}
          />
        </div>
      </ModalBox>
    </div>
  );
}

export default List;
