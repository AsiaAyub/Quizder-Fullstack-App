import QuestionWrapper from "../components/QuestionWrapper";

type UserData = {
  answer3: string;
};

type question3Props = UserData & {
  updateAnswer: (answer: UserData) => void;
  objJson: any;
};

const Question3 = ({ objJson, answer3, updateAnswer }: question3Props) => {
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
      <QuestionWrapper title="Question 3">
        <p className="text-white my-8 text-lg ">{objJson.question}</p>

        {ansArray.map((item: string) => (
          <div key={item} className=" text-white text-lg flex">
            <label className=" ">
              <input
                required
                type="radio"
                name="Radios"
                className="mr-2 accent-cyan-300"
                value={item}
                checked={answer3 === item}
                onChange={(e) => updateAnswer({ answer3: e.target.value })}
              />
              {item}
            </label>
          </div>
        ))}
      </QuestionWrapper>
    </div>
  );
};

export default Question3;
