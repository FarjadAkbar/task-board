import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";

import FormattedMessage from "theme/FormattedMessage";
import { useTaskDetail, useUpdateTask } from "providers/Tasks";

import messages from "./messages";
import { Form } from "./Form";

interface Props {
  id: string;
  setIsEditing: any;
}

const EditForm: React.FC<Props> = ({ id, setIsEditing }) => {
  const updateTask = useUpdateTask({ id: `${id}` });
  const getSingleTask = useTaskDetail({ id: `${id}` });
  const { enqueueSnackbar } = useSnackbar();

  const [initialValues, setInitialValues] = useState({
    title: getSingleTask?.data?.title ?? "",
    text: getSingleTask?.data?.title ?? "",
  });

  useEffect(() => {
    if (updateTask.isSuccess) {
      enqueueSnackbar(<FormattedMessage {...messages.successUpdateMessage} />, {
        variant: "success",
      });
      setIsEditing(false);
    }

  }, [updateTask.isSuccess]);


  useEffect(() => {
    setInitialValues({
      title: getSingleTask?.data?.title ?? "",
      text: getSingleTask?.data?.text ?? "",
    })
  }, [getSingleTask.isFetched]);

  const handleMutate = (values: any) => {
    updateTask.mutate({
      title: values.title,
      text: values.text,
      status: getSingleTask?.data?.status,
    });
  };

  if(getSingleTask.isFetching || updateTask.isLoading){
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

  console.log(initialValues, "edit values");
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form initialValues={initialValues} handleMutate={handleMutate} setIsEditing={setIsEditing}/>
    </Box>
  );
};

export default EditForm;
