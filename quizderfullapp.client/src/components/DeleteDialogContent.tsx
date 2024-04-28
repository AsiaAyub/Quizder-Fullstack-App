import { DialogContent, DialogContentText, TextField } from "@mui/material";

type DeleteDialogContentProps = {
  id: number;
};
const DeleteDialogContent = ({ id }: DeleteDialogContentProps) => (
  <DialogContent>
    <DialogContentText>
      To delete a riddle, please enter the ID of the riddle you want to delete.
    </DialogContentText>
    <TextField
      autoFocus
      required
      margin="dense"
      id="QuestionId"
      name="QuestionId"
      label="QuestionId"
      type="text"
      fullWidth
      variant="standard"
      value={id}
    />
  </DialogContent>
);

export default DeleteDialogContent;
