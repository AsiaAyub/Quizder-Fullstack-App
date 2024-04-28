import { FormEvent, useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import { useMultistepForm } from "../useMultistepForm";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import { useNavigate } from "react-router";

// type questionDisplayProps = {
//   randomNumbers: number[];
// };

type FormData = {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
};

const INITIAL_DATA: FormData = {
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
};

interface Riddle {
  id: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
}

const QuestionsDisplay = () => {
  //use state for updating and storing the given answers
  const [data, setData] = useState(INITIAL_DATA);
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const navigate = useNavigate();

  const qsArray: string[] = [];
  const correctAnsArray: string[] = [];

  //function which will update the given answers list; it is a parameter for each question.
  function updateAnswer(answers: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...answers };
    });
  }

  useEffect(() => {
    const fetchRiddles = async () => {
      try {
        const response = await fetch("http://localhost:5252/riddles/random");
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

  useEffect(() => {
    // Ensure riddles has data before accessing its properties
    if (riddles.length > 0) {
      qsArray.push(
        riddles[0].question,
        riddles[1].question,
        riddles[2].question,
        riddles[3].question,
        riddles[4].question
      );
    }
  }, [riddles]);

  const { step, currentQsIndex, isFirstStep, isLastStep, nextQs, prevQs } =
    useMultistepForm([
      <Question1 {...data} updateAnswer={updateAnswer} objJson={riddles[0]} />,
      <Question2 objJson={riddles[1]} {...data} updateAnswer={updateAnswer} />,
      <Question3 objJson={riddles[2]} {...data} updateAnswer={updateAnswer} />,
      <Question4 objJson={riddles[3]} {...data} updateAnswer={updateAnswer} />,
      <Question5 objJson={riddles[4]} {...data} updateAnswer={updateAnswer} />,
    ]);

  const nextPage = () => {
    const dataToSend = {
      givenAnswers: data,
      riddlesArr: riddles,
    };
    navigate("/feedback", { state: { data: dataToSend } });
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return nextQs();
    nextPage();
  }

  return (
    <div className="w-screen h-screen flex space-x-56 bg-[url('/assets/images/qsbg.jpg')]">
      <div className="border-2 rounded-lg bg-black border-cyan-400 bg-opacity-90 h-fit md:h-3/4 lg:h-fit w-full md:w-1/2 lg:w-1/2 m-auto">
        <form onSubmit={onSubmit}>
          <Stepper step={currentQsIndex + 1} />
          {step}

          <div className="mb-4 mr-2 md:my-10 flex justify-end">
            {!isFirstStep && (
              <button
                type="button"
                className="bg-cyan-800 hover:bg-teal-900 text-white p-2 rounded-md w-32 "
                onClick={prevQs}
              >
                Back
              </button>
            )}

            <button
              type="submit"
              className="bg-cyan-800 hover:bg-teal-900 text-white p-2 rounded-md mx-3 w-32 "
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionsDisplay;
