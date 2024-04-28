import { DialogContent, DialogContentText, TextField } from "@mui/material";

type UpdateDialogContentProps = {
  id: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
};

const UpdateDialogContent = ({
  id,
  question,
  answer1,
  answer2,
  answer3,
  answer4,
  correctAnswer,
}: UpdateDialogContentProps) => (
  <DialogContent>
    <DialogContentText>
      To update an existing riddle, please fill in the given fields here and
      make sure the shuffle the answers.
    </DialogContentText>

    <TextField
      autoFocus
      required
      margin="dense"
      id="QuestionId"
      name="QuestionId"
      label="Question Id"
      type="number"
      fullWidth
      variant="standard"
      sx={{ marginRight: "10px" }}
      value={id}
    />
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
      placeholder={question}
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
        placeholder={answer1}
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
        placeholder={answer2}
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
        placeholder={answer3}
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
        placeholder={answer4}
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
      placeholder={correctAnswer}
    />
  </DialogContent>
);

export default UpdateDialogContent;
