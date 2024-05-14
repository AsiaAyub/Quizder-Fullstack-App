import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateDialogContent from "../components/UpdateDialogContent";
import AddDialogContent from "../components/AddDialogContent";
import DeleteDialogContent from "../components/DeleteDialogContent";
import QuestionCard from "../components/QuestionCard";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [searched, setSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const receivedData = location.state?.data;
  const token = receivedData?.token;
  const userName = receivedData?.username;
  const navigate = useNavigate();

  const handleRowSelection = (id: number) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  const handleSearch = () => {
    setSearched(true);
  };

  const fetchRiddles = async (sTerm: string) => {
    try {
      const url = "http://localhost:5252/riddles";
      const queryParams = searchTerm
        ? `?SearchTerm=${encodeURIComponent(sTerm)}`
        : "";
      const response = await fetch(`${url}${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch riddles");
      }
      const responseData = await response.json(); // Extract JSON data
      setRiddles(responseData); // Update state with the response data
    } catch (error) {
      console.error("Error fetching riddles:", error);
    }
  };

  useEffect(() => {
    if (searched) {
      fetchRiddles(searchTerm)
        .then(() => setSearched(false))
        .catch((error) => {
          console.error("Error fetching riddles:", error);
          setSearched(false); // Reset searched state if an error occurs
        });
      return;
    }
    fetchRiddles(searchTerm);
  }, [searched]);

  const handleClickOpen = (mode: string) => {
    setOpen(true);
    setDialogMode(mode); // Set the dialog mode when opening the dialog
  };

  const handleClose = () => {
    setOpen(false);
  };

  const populateDataToUpdate = async (mode: string, num: number) => {
    // if (!selectedRow) {
    //   alert("Please select a row from the table first.");
    //   console.log("No row selected for update");
    //   return;
    // }

    handleClickOpen(mode);

    try {
      const selectedRiddle = riddles.find(
        // (riddle) => riddle.id === selectedRow
        (riddle) => riddle.id === num
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

  const populateDataToDelete = async (mode: string, num: number) => {
    // if (!selectedRow) {
    //   alert("Please select a row from the table.");
    //   console.error("No row selected for delete");
    //   return;
    // }

    handleClickOpen(mode);

    try {
      const selectedRiddle = riddles.find(
        // (riddle) => riddle.id === selectedRow
        (riddle) => riddle.id === num
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
            Authorization: token ? `Bearer ${token}` : "",
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
            Authorization: token ? `Bearer ${token}` : "",
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
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
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

      fetchRiddles(searchTerm);

      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login page
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className=" w-full bg-blend-darken h-fit bg-[url('https://cdn.create.vista.com/api/media/small/402811986/stock-photo-source-codes-in-cyberspace-on-black-background-animation-inside-software-or-matrix-with-3d-walls')]">
      <div className="absolute flex justify-end p-1 w-screen">
        <div className="w-fit h-fit mx-4 mt-1">
          <img
            src="\assets\images\user.png"
            alt="image"
            className="w-7 h-7"
            onClick={handleProfile}
          />
          {userName ? (
            <p className="text-xs font-extrabold text-center">{userName}</p>
          ) : (
            <p>Not Loged In</p>
          )}
        </div>

        <button
          className="text-sm w-28 h-8 text-white focus:outline-none"
          onClick={handleLogout}
        >
          <img
            src="\assets\images\logout.png"
            alt="img"
            className="w-7 h-7 m-auto"
          />
          Logout
        </button>
      </div>
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
          className="border-cyan-400 bg-black border-2 mx-5 w-48 h-10 rounded my-9 hover:bg-blue-900"
        >
          Add New Riddle
        </button>
        {/* <button
          onClick={() => populateDataToUpdate("update", 12)}
          className="bg-cyan-400 mx-5 w-32 h-10 rounded-full my-9 hover:bg-blue-900"
        >
          Update
        </button>
        <button
          onClick={() => populateDataToDelete("delete", 11)}
          className="bg-cyan-400 mx-5 w-32 h-10 rounded-full my-9 hover:bg-blue-900"
        >
          Delete
        </button> */}
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

      <div className="flex justify-center mt-4 lg:w-screen">
        <input
          type="text"
          placeholder="Search with words from the questions..."
          className="border border-gray-500 px-2 mr-2 w-8/12 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-cyan-500 text-sm w-20 h-7 rounded hover:bg-blue-900 px-4"
        >
          Search
        </button>
      </div>

      <div className="flex justify-center lg:w-screen w-12/12 mt-8 pb-3">
        <table className="border-collapse border border-gray-500 bg-black lg:w-3/4 w-12/12">
          <thead>
            <tr>
              <th className="border border-gray-500 px-2">Question</th>
              <th className="border border-gray-500 px-1">Update</th>
              <th className="border border-gray-500 px-1">Delete</th>
            </tr>
          </thead>
          {riddles.length > 0 ? (
            <tbody>
              {riddles.map((riddle) => (
                <tr key={riddle.id}>
                  <td className="border border-gray-500">
                    <QuestionCard
                      key={riddle.id}
                      qsNumber={riddle.id}
                      givenAnswer={riddle.correctAnswer}
                      objJson={riddle}
                    />
                  </td>

                  <td className="border border-gray-500">
                    {/* {riddle.id} */}
                    <button
                      className="m-auto w-full"
                      onClick={() => populateDataToUpdate("update", riddle.id)}
                    >
                      <img
                        src="/assets/images/edit.png"
                        alt="edit img"
                        className="w-6 h-6 m-auto"
                      />
                    </button>
                  </td>
                  <td className="border border-gray-500">
                    {/* <input
                    type="checkbox"
                    name="selectedRow"
                    id={`row-${riddle.id}`}
                    checked={riddle.id === selectedRow}
                    onChange={() => handleRowSelection(riddle.id)}
                  /> */}
                    <button
                      className="w-full"
                      onClick={() => populateDataToDelete("delete", riddle.id)}
                    >
                      <img
                        src="/assets/images/delete.png"
                        alt="edit img"
                        className="w-6 h-6 m-auto"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr className="text-end">No records found</tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default RiddlesPage;
