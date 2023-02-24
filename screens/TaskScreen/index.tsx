import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext } from "react-beautiful-dnd";

import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";


import { useTaskStatus } from "providers/TasksStatus";
import { useTaskDetail } from "providers/Tasks";
import FormattedMessage from "theme/FormattedMessage";

// import AddColumn from "./AddColumn";
import Column from "./Column";
import TaskModal from "./Modal";
import messages from "./messages";

const TaskScreen = () => {
  const taskStatus = useTaskStatus();
  
  // const taskRef = useTaskDetail({ id: "h14k8zHXutz00l0z6Ui7" });
  // const [openColModal, setOpenColModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  const onDragEnd = (result: {
    destination: any;
    source: any;
    draggableId: any;
  }) => {
    const { destination, source, draggableId } = result;

    console.log(JSON.parse(result.draggableId), "result...........")
    if (!destination) {
      console.log("no destination");
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      console.log("index and destination the same");
      return;
    }
    
  };

  const openModal = (id: string) => {
    setId(id);
    setModal(true);
    setOpen(true);
  };

  const closeModal = () => {
    setModal(false);
    setOpen(false);
  };


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 
        <AddColumn
          openModal={openColModal}
          closeModal={closeColModal}
          addColumn={addColumn}
          columnId={taskStatus?.data?.length + 1}
        /> 
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: "#000",
            backgroundColor: "#eee",
            textTransform: "none",
            ":hover": {
              backgroundColor: "#ddd",
            },
            py: 1,
            my: 2,
          }}
          onClick={() => {
            setOpenColModal(true);
          }}
        >
          <FormattedMessage {...messages.addNewColumn} />
        </Button>
        */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 4,
              justifyContent: "flex-start",
            }}
          >
            {modal && (
              <TaskModal
                id={id}
                openModal={open}
                closeModal={closeModal}
              />
            )}

            {taskStatus?.data?.map((task: any, index: any) => {
              return (
                <Column
                  id={task.id}
                  columnData={task.data()}
                  key={index}
                  openModal={openModal}
                />
              );
            })}
          </Box>
        </Box>
      </DragDropContext>
    </>
  );
};

export default TaskScreen;
