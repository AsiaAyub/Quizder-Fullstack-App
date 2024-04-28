import QuestionWrapper from "../components/QuestionWrapper";

//property to update the given answers list
type UserData = {
  answer5: string;
};

//property for the question to be displayed and the function to update the given answer
type question5Props = UserData & {
  objJson: any;
  updateAnswer: (answer: UserData) => void;
};

const Question5 = ({ objJson, answer5, updateAnswer }: question5Props) => {
  if (!objJson) {
    return null;
  }
  //const answers = Riddles[qsNumber].answers;

  const ansArray: string[] = [];
  ansArray.push(
    objJson.answer1,
    objJson.answer2,
    objJson.answer3,
    objJson.answer4
  );
  return (
    <div className="md:text-xl ml-8 mr-8 w-11/12 items-center">
      <QuestionWrapper title="Question 5">
        <p className="text-white my-8 text-lg ">{objJson.question}</p>

        {/**array map to loop through the answers array */}
        {ansArray.map((item: string) => (
          <div key={item} className=" text-white text-lg flex">
            <label className=" ">
              <input
                required
                type="radio"
                name="Radios"
                className="mr-2 accent-cyan-300"
                value={item}
                checked={answer5 === item}
                onChange={(e) => updateAnswer({ answer5: e.target.value })}
              />
              {item}
            </label>
          </div>
        ))}
      </QuestionWrapper>
    </div>
  );
};

export default Question5;
