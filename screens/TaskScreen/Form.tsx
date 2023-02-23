import { ChangeEvent, MouseEvent } from "react";
import { Box, FormHelperText, Grid, OutlinedInput } from "@mui/material";

import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";


import { useFormik } from "formik";
import * as Yup from "yup";

import messages from "./messages";
import { InputLabelWrapper } from "./Styled";
import { ButtonWrapper } from "theme/Button";

interface FormInputProps {
  title: string;
  text: string;
}

interface FormProps {
  initialValues: FormInputProps;
  handleMutate: (e:any) => void;
  setIsEditing?:any;
}

export const Form: React.FC<FormProps> = ({
  initialValues,
  handleMutate,
  setIsEditing
}) => {
  const titlePlaceholder = useFormattedMessage(messages.titlePlaceholder);
  const textPlaceholder = useFormattedMessage(messages.textPlaceholder);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("title is required").label("title"),
    text: Yup.string().required("text is required").label("text"),
  });


  const { handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues,
      validationSchema,
      enableReinitialize:true,
      onSubmit: (values, { resetForm, setSubmitting }) => {
      
        handleMutate(values);
        setSubmitting(false);
        resetForm();
      },
    });

  console.log(initialValues, "form values......");

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3} my={1} px={1}>
        <Grid item xs={12}>
          <InputLabelWrapper htmlFor={`title`}>
            <FormattedMessage {...messages.titleLabel} />
          </InputLabelWrapper>
          <OutlinedInput
            id={`title`}
            name={`title`}
            placeholder={titlePlaceholder}
            fullWidth
            value={values?.title}
            onChange={handleChange}
            error={Boolean(
              touched && errors && touched?.title && errors?.title,
            )}
          />
          {touched?.title && errors?.title && (
            <FormHelperText error id="standard-weight-helper-text-title">
              {errors?.title}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <InputLabelWrapper htmlFor={`text`}>
            <FormattedMessage {...messages.textLabel} />
          </InputLabelWrapper>
          <OutlinedInput
            id={`text`}
            name={`text`}
            placeholder={textPlaceholder}
            fullWidth
            value={values?.text}
            onChange={handleChange}
            error={Boolean(touched && errors && touched?.text && errors?.text)}
          />
          {touched?.text && errors?.text && (
            <FormHelperText error id="standard-weight-helper-text-text">
              {errors?.text}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <ButtonWrapper
            type="submit"
            variant="contained"
            color="success"
            sx={{ margin: (theme) => theme.spacing(1) }}
          >
            <FormattedMessage {...messages.saveButton} />
          </ButtonWrapper>

          {
            setIsEditing && (
              <ButtonWrapper
            variant="contained"
            color="info"
            sx={{ margin: (theme) => theme.spacing(1) }}
            onClick={() => { setIsEditing(false) }}
          >
            <FormattedMessage {...messages.cancelButton} />
          </ButtonWrapper>
            )
            
          }
        </Grid>
      </Grid>
    </Box>
  );
};
