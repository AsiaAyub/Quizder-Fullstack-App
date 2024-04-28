import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateDialogContent from "../components/UpdateDialogContent";
import AddDialogContent from "../components/AddDialogContent";
import DeleteDialogContent from "../components/DeleteDialogContent";
import QuestionCard from "../components/QuestionCard";

interface Riddle {
  id: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
}
const RiddlesPage = () => {
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("");
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [idValue, setIdValue] = useState(-1);
  const [qsValue, setQsValue] = useState("");
  const [ans1Value, setAns1Value] = useState("");
  const [ans2Value, setAns2Value] = useState("");
  const [ans3Value, setAns3Value] = useState("");
  const [ans4Value, setAns4Value] = useState("");
  const [correctAnsValue, setCorrectAnsValue] = useState("");

  const handleRowSelection = (id: number) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  useEffect(() => {
    const fetchRiddles = async () => {
      try {
        const response = await fetch("http://localhost:5252/riddles");
        if (!response.ok) {
          throw new Error("Failed to fetch riddles");
        }
        const responseData = await response.json(); // Extract JSON data
        setRiddles(responseData); // Update state with the response data
      } catch (error) {
        console.error("Error fetching riddles:", error);
      }
    };

    fetchRiddles();
  }, []);

  const handleClickOpen = (mode: string) => {
    setOpen(true);
    setDialogMode(mode); // Set the dialog mode when opening the dialog
  };

  const handleClose = () => {
    setOpen(false);
  };

  const populateDataToUpdate = async (mode: string) => {
    if (!selectedRow) {
      alert("Please select a row from the table first.");
      console.log("No row selected for update");
      return;
    }

    handleClickOpen(mode);

    try {
      const selectedRiddle = riddles.find(
        (riddle) => riddle.id === selectedRow
      );
      if (!selectedRiddle) {
        console.error("Selected riddle not found");
        return;
      }

      setIdValue(selectedRiddle.id);
      setQsValue(selectedRiddle.question);

      setAns1Value(selectedRiddle.answer1);
      setAns2Value(selectedRiddle.answer2);
      setAns3Value(selectedRiddle.answer3);
      setAns4Value(selectedRiddle.answer4);
      setCorrectAnsValue(selectedRiddle.correctAnswer);
    } catch (error) {
      console.error(error);
    }
  };

  const populateDataToDelete = async (mode: string) => {
    if (!selectedRow) {
      alert("Please select a row from the table.");
      console.error("No row selected for delete");
      return;
    }

    handleClickOpen(mode);

    try {
      const selectedRiddle = riddles.find(
        (riddle) => riddle.id === selectedRow
      );
      if (!selectedRiddle) {
        console.error("Selected riddle not found");
        return;
      }

      setIdValue(selectedRiddle.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    action: "create" | "update" | "delete"
  ) => {
    event.preventDefault();
    try {
      //create obj to hold info from the form that triggered the event
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);

      let response: Response | null = null; // Define response variable

      if (action === "create") {
        // Make HTTP POST request to create a new riddle
        response = await fetch("http://localhost:5252/riddles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formJson),
        });

        if (!response.ok) {
          throw new Error("Failed to create riddle");
        }
        // Display success message
        alert("Riddle added successfully");
      } else if (action === "update") {
        const riddleId = formJson.QuestionId;

        // Make HTTP PUT request to update the riddle
        response = await fetch(`http://localhost:5252/riddles/${riddleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formJson),
        });

        if (!response.ok) {
          throw new Error("Failed to update riddle");
        }

        // Display success message
        alert("Riddle updated successfully");
      } else if (action === "delete") {
        const riddleId = formJson.QuestionId;

        // Display success message
        const confirmed = window.confirm(
          `Are you sure you want to delete the riddle with id ${riddleId} ?`
        );

        if (confirmed) {
          // Make HTTP DELETE request to delete the riddle
          response = await fetch(`http://localhost:5252/riddles/${riddleId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete riddle");
          }

          // Display success message
          alert("Riddle deleted successfully");
        } else {
          handleClose();
        }
      }

      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full bg-blend-luminosity h-fit  bg-[url('https://cdn.create.vista.com/api/media/small/402811986/stock-photo-source-codes-in-cyberspace-on-black-background-animation-inside-software-or-matrix-with-3d-walls')]">
      <h1 className="text-6xl font-bold text-white text-center pt-10 pb-4">
        Riddles
      </h1>
      <div className="flex justify-center">
        <p className="lg:text-xl text-base font-bold bg-black lg:w-1/2 w-11/12 text-cyan-400 text-center pt-4">
          Here you can Add, update or delete the riddles. Please click on the
          corresponding buttons accordingly.
        </p>
      </div>

      <div className="flex justify-end lg:mr-14 mr-3">
        <button
          onClick={() => handleClickOpen("add")}
          className="bg-cyan-400 mx-5 w-32 h-10 rounded-full my-9 hover:bg-blue-900"
        >
          Add
        </button>
        <button
          onClick={() => populateDataToUpdate("update")}
          className="bg-cyan-400 mx-5 w-32 h-10 rounded-full my-9 hover:bg-blue-900"
        >
          Update
        </button>
        <button
          onClick={() => populateDataToDelete("delete")}
          className="bg-cyan-400 mx-5 w-32 h-10 rounded-full my-9 hover:bg-blue-900"
        >
          Delete
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            handleSubmit(
              event,
              dialogMode === "add"
                ? "create"
                : dialogMode === "update"
                ? "update"
                : "delete"
            );
          },
          style: {
            backgroundColor: "aqua",
            border: "3px solid black",
          },
        }}
      >
        <DialogTitle className="text-center">
          {dialogMode === "add"
            ? "Add New Riddle"
            : dialogMode === "update"
            ? "Update a Riddle"
            : "Delete a Riddle"}
        </DialogTitle>
        <DialogContent className="">
          {dialogMode === "add" ? (
            <AddDialogContent />
          ) : dialogMode === "update" ? (
            <UpdateDialogContent
              id={idValue}
              question={qsValue}
              answer1={ans1Value}
              answer2={ans2Value}
              answer3={ans3Value}
              answer4={ans4Value}
              correctAnswer={correctAnsValue}
            />
          ) : (
            <DeleteDialogContent id={idValue} />
          )}
        </DialogContent>
        <DialogActions>
          <div className="flex justify-between w-full m-auto">
            <button
              className="bg-black rounded text-cyan-400 w-24 h-8"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-black rounded text-cyan-400 w-24 h-8"
              type="submit"
            >
              Submit
            </button>
          </div>
        </DialogActions>
      </Dialog>

      <div className="flex justify-center lg:w-screen w-12/12 mt-8">
        <table className="border-collapse border border-gray-500 bg-black lg:w-3/4 w-12/12">
          <thead>
            <tr>
              <th className="border border-gray-500">Select</th>
              <th className="border border-gray-500">ID</th>
              <th className="border border-gray-500">Question</th>
            </tr>
          </thead>
          <tbody>
            {riddles.map((riddle) => (
              <tr key={riddle.id}>
                <td className="border border-gray-500 px-2">
                  <input
                    type="checkbox"
                    name="selectedRow"
                    id={`row-${riddle.id}`}
                    checked={riddle.id === selectedRow}
                    onChange={() => handleRowSelection(riddle.id)}
                  />
                </td>
                <td className="border border-gray-500 px-2">{riddle.id}</td>
                <td className="border border-gray-500">
                  <QuestionCard
                    key={riddle.id}
                    qsNumber={riddle.id}
                    givenAnswer={riddle.correctAnswer}
                    objJson={riddle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiddlesPage;
