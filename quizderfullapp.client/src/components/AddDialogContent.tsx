import { DialogContent, DialogContentText, TextField } from "@mui/material";

const AddDialogContent = () => (
  <DialogContent>
    <DialogContentText>
      To add a new riddle, please fill in the given fields here and make sure
      the shuffle the answers.
    </DialogContentText>
    <TextField
      autoFocus
      required
      margin="dense"
      id="question"
      name="question"
      label="Riddle Question"
      type="text"
      fullWidth
      variant="standard"
      multiline
    />
    <div className="flex justify-around">
      <TextField
        autoFocus
        required
        margin="dense"
        id="answer1"
        name="answer1"
        label="First Answer"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginRight: "10px" }}
      />

      <TextField
        autoFocus
        required
        margin="dense"
        id="answer2"
        name="answer2"
        label="Second Answer"
        type="text"
        fullWidth
        variant="standard"
      />
    </div>
    <div className="flex justify-around">
      <TextField
        autoFocus
        required
        margin="dense"
        id="answer3"
        name="answer3"
        label="Third Answer"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginRight: "10px" }}
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="answer4"
        name="answer4"
        label="Fourth Answer"
        type="text"
        fullWidth
        variant="standard"
      />
    </div>
    <TextField
      autoFocus
      required
      margin="dense"
      id="correctAnswer"
      name="correctAnswer"
      label="Correct Answer"
      type="text"
      fullWidth
      variant="standard"
    />
  </DialogContent>
);

export default AddDialogContent;
