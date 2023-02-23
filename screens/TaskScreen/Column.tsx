import React from "react";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Droppable } from "react-beautiful-dnd";
import { useTaskRefrence } from "providers/Tasks";
import FormattedMessage from "theme/FormattedMessage";

import Task from "./Task";
import messages from "./messages";

interface Props {
  id: string;
  columnData: {
    name: string;
    color: string;
  };
  openModal: (id: string) => void;
}

const Column: React.FC<Props> = ({ id, columnData, openModal }) => {
  const tasks = useTaskRefrence({ id: `${id}` });
  if (tasks.isLoading) {
    return (
      <CircularProgress
        size={68}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-12px",
          marginLeft: "-12px",
        }}
      />
    );
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            backgroundColor: `${columnData.color}`,
            fontWeight: "bold",
            color: `${columnData.color}`,
            p: 1,
            borderRadius: "5px",
            zIndex: 1,
            ml: 1,
          }}
        >
          {columnData.name} ({tasks?.data?.length})
        </Typography>
      </Box>
      <Droppable droppableId={`${id}`}>
        {(provided, snapshot) => (
          <Box
            sx={{
              background: "white",
              pt: 2,
              width: 340,
              px: 1,
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks?.data?.map(
              (
                task: { id: React.Key | null | undefined; data: () => any },
                index: number,
              ) => {
                return (
                  <Task
                    key={index}
                    id={id}
                    taskId={task.id}
                    task={task.data()}
                    color={columnData.color}
                    index={index}
                  />
                );
              },
            )}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      <Box sx={{ pt: 2 }}>
        <Button
          sx={{
            color: "#aaa",
            textTransform: "none",
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => openModal(id)}
          startIcon={<AddIcon />}
        >
          <FormattedMessage {...messages.newButton} />
        </Button>
      </Box>
    </Box>
  );
};

export default Column;
