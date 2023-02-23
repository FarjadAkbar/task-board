import React, { useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useSnackbar } from "notistack";

import FormattedMessage from "theme/FormattedMessage";
import { useCreateTask } from "providers/Tasks";

import messages from "./messages";
import { Form } from "./Form";

interface Props {
  id: string;
  openModal: boolean;
  closeModal: () => void;
}

const TaskModal: React.FC<Props> = ({ id, openModal, closeModal }) => {
  const createTask = useCreateTask();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    title: "",
    text: "",
  };

  useEffect(() => {
    if (createTask.isSuccess) {
      enqueueSnackbar(<FormattedMessage {...messages.successAddMessage} />, {
        variant: "success",
      });
      closeModal;
    }
  }, [createTask.isSuccess]);

  const handleMutate = (values: any) => {
    createTask.mutate({
      title: values.title,
      text: values.text,
      status: `tasks-status/ ${id}`,
    });
    closeModal;
  };
  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "white",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form initialValues={initialValues} handleMutate={handleMutate} />
      </Box>
    </Modal>
  );
};

export default TaskModal;
