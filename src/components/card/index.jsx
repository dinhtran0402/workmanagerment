import {
  Button,
  LinearProgress,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import EditForm from "../modelCreate/edit";
import Model from "../modelCreate/index";
import Search from "../SearchForm/index";
const Index = () => {
  const [Work, setWork] = useState([]);
  const [columns, setColumns] = useState([]);
  const [forceReload, setForceReload] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  useEffect(() => {
    getPost();
  }, [forceReload]);

  const getPost = () => {
    axios
      .get("https://611bca0a22020a00175a4730.mockapi.io/api/work")
      .then((result) => {
        setWork(result.data);
        setForceReload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDelete = (id) => {
    axios
      .delete(`https://611bca0a22020a00175a4730.mockapi.io/api/work/${id}`)
      .then((result) => {
        const { status } = result;
        if (status) {
          setForceReload((pre) => !pre);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.default,
      border: "2px solid #000",
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
    getChange(draggableId, Number(destination.droppableId));
  };
  const onFinish = () => {
    setForceReload((pre) => !pre);
    setIsVisibleModal(false);
  };
  const getChange = (id, droppableId) => {
    let statusId;
    switch (droppableId) {
      case 1:
        statusId = "Todo";
        break;
      case 2:
        statusId = "Doing";
        break;
      case 3:
        statusId = "Done";
        break;
      default:
        break;
    }
    const data = { state: statusId };
    axios
      .put(`https://611bca0a22020a00175a4730.mockapi.io/api/work/${id}`, data)
      .then((result) => {
        const { status } = result;
        if (status) {
          setForceReload((pre) => !pre);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = (id) => {
    getDelete(id);
  };
  useEffect(() => {
    const dataColumns = {
      1: {
        name: "Todo",
        items: Work.filter((x) => x.state === "Todo"),
      },
      2: {
        name: "Doing",
        items: Work.filter((x) => x.state === "Doing"),
      },
      3: {
        name: "Done",
        items: Work.filter((x) => x.state === "Done"),
      },
    };
    setColumns(dataColumns);
  }, [Work]);

  const initialFormState = {
    id: null,
    content: "",
    state: "",
  };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const editRow = (user) => {
    setCurrentUser({
      id: user.id,
      content: user.content,
      state: user.state,
    });
    setIsVisibleModal(true);
  };
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="largeScreen">
      <Search setSearchTerm={setSearchTerm} />
      <div
        style={{ display: "flex", justifyContext: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={id}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "#fafafa",
                            padding: 4,
                            width: 350,
                            minHeight: 200,
                          }}
                        >
                          {column.items
                            .filter((prod) => {
                              if (searchTerm == "") {
                                return prod;
                              } else if (
                                prod.content
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return prod;
                              }
                            })

                            .map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          borderLeft: "5px solid #7FFFD4",
                                          width: 300,
                                          userSelect: "none",
                                          padding: 5,
                                          margin: "0 0 8px 0",
                                          minHeight: "110px",
                                          background: snapshot.isDragging
                                            ? "#FFF0F5"
                                            : "#F0FFFF",
                                          color: "black",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            textAlign: "center",
                                            marginBottom: "20px",
                                          }}
                                        >
                                          {item.content}
                                        </Typography>

                                        <Button
                                          style={{ float: "right" }}
                                          onClick={() => onDelete(item.id)}
                                        >
                                          <DeleteForeverIcon
                                            color="secondary"
                                            fontSize="small"
                                          />
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            editRow(item);
                                          }}
                                        >
                                          <EditIcon
                                            color="primary"
                                            fontSize="small"
                                          />
                                        </Button>
                                        <Modal
                                          open={isVisibleModal}
                                          onClose={() =>
                                            setIsVisibleModal(false)
                                          }
                                          aria-labelledby="simple-modal-title"
                                          aria-describedby="simple-modal-description"
                                          className={classes.modal}
                                        >
                                          <EditForm
                                            currentUser={currentUser}
                                            onFinish={onFinish}
                                          />
                                        </Modal>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>

      <Model onPosted={getPost} />
    </div>
  );
};

export default Index;
