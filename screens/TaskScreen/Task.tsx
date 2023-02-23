import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Card,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useSnackbar } from "notistack";
import { Draggable } from "react-beautiful-dnd";

import { useRemoveTask } from "providers/Tasks";
import FormattedMessage from "theme/FormattedMessage";

import EditForm from "./EditForm";
import messages from "./messages";

interface TaskProps {
  id: string;
  taskId:string;
  task: any;
  index: number;
  color: string;
}

const Task: React.FC<TaskProps> = ({ id, taskId, task, index }) => {
  const deletTask = useRemoveTask();
  const { enqueueSnackbar } = useSnackbar();

  const [confirm, setConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setIsEditing(true);
  };

  const removeTask = () => {
    deletTask.mutate({ id: `${id}` });
    setConfirm(false);
  };

  useEffect(() => {
    if (deletTask.isSuccess) {
      enqueueSnackbar(<FormattedMessage {...messages.successDeleteMessage} />, {
        variant: "success",
      });
    }
  }, [deletTask.isSuccess]);

  return (
    <>
      <Dialog
        open={confirm}
        onClose={() => {
          setConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage {...messages.deleteConfirmMessage} />
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirm(false);
            }}
          >
            <FormattedMessage {...messages.noButton} />
          </Button>
          <Button onClick={removeTask} autoFocus>
            <FormattedMessage {...messages.yesButton} />
          </Button>
        </DialogActions>
      </Dialog>
      <Draggable
        draggableId={JSON.stringify({
          id: `${id}`,
          taskId: `${taskId}`,
        })}
        index={index}
      >
        {(provided, snapshot) => (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            sx={{
              ":hover": {
                backgroundColor: "#eee",
              },

              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "6px",
              border: "1px solid #ddd",
              userSelect: "none",
              px: 2,
              py: 0.8,
              margin: "0 0 4px 0",
              minHeight: "20px",
              backgroundColor: "#fff",
              opacity: snapshot.isDragging ? 0.3 : 1,
              transition: "opacity 7s linear",
              boxShadow: "0px 9px 22px -8px rgba(0,0,0,0.1)",
              color: "black",
            }}
          >
            {isEditing ? (
              <EditForm id={taskId} setIsEditing={setIsEditing} />
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle2">{task?.title}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <IconButton id="basic-button" onClick={handleClick}>
                    <MoreHorizIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button
                        startIcon={<EditIcon fontSize="small" />}
                        onClick={handleToggle}
                        sx={{
                          bgcolor: "transparent",
                          color: "#aaa",
                          ":hover": { bgcolor: "transparent" },
                        }}
                      >
                        <FormattedMessage {...messages.editButton} />
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        sx={{
                          bgcolor: "transparent",
                          color: "#aaa",
                          ":hover": { bgcolor: "transparent" },
                        }}
                        startIcon={<DeleteIcon fontSize="small" />}
                        onClick={() => {
                          setConfirm(true);
                        }}
                      >
                        <FormattedMessage {...messages.deleteButton} />
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default Task;
