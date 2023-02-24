/*
 * HomeScreen Messages
 *
 * This contains all the text for the HomeScreen
 */

import { defineMessages } from "react-intl";

export const scope = "app.screens.HomeScreen";

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Home Screen",
  },
  saveButton: {
    id: `${scope}.saveButton`,
    defaultMessage: "Save",
  },
  editButton: {
    id: `${scope}.editButton`,
    defaultMessage: "Edit",
  },
  deleteButton: {
    id: `${scope}.deleteButton`,
    defaultMessage: "Delete",
  },
  cancelButton: {
    id: `${scope}.cancelButton`,
    defaultMessage: "Cancel",
  },
  newButton: {
    id: `${scope}.newButton`,
    defaultMessage: "New",
  },

  yesButton: {
    id: `${scope}.yesButton`,
    defaultMessage: "Yes",
  },
  noButton: {
    id: `${scope}.noButton`,
    defaultMessage: "No",
  },
  titleLabel: {
    id: `${scope}.titleLabel`,
    defaultMessage: "Title",
  },
  textLabel: {
    id: `${scope}.textLabel`,
    defaultMessage: "Text",
  },

  textPlaceholder: {
    id: `${scope}.textPlaceholder`,
    defaultMessage: "Text",
  },

  titlePlaceholder: {
    id: `${scope}.titlePlaceholder`,
    defaultMessage: "Title",
  },

  successAddMessage: {
    id: `${scope}.successAddMessage`,
    defaultMessage: "Task Add Successfully",
  },
  successUpdateMessage: {
    id: `${scope}.successUpdateMessage`,
    defaultMessage: "Task Update Successfully",
  },
  successDeleteMessage: {
    id: `${scope}.successDeleteMessage`,
    defaultMessage: "Task Deleted Successfully",
  },
  deleteConfirmMessage: {
    id: `${scope}.deleteConfirmMessage`,
    defaultMessage: "Do you really want to delete this?",
  },
  addNewColumn:{
    id: `${scope}.addNewColumn`,
    defaultMessage: "Add New Column",
  }
});
