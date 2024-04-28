import QuestionWrapper from "../components/QuestionWrapper";

type UserData = {
  answer4: string;
};

type question4Props = UserData & {
  objJson: any;
  updateAnswer: (answer: UserData) => void;
};

const Question4 = ({ objJson, answer4, updateAnswer }: question4Props) => {
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
      <QuestionWrapper title="Question 4">
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
                checked={answer4 === item}
                onChange={(e) => updateAnswer({ answer4: e.target.value })}
              />
              {item}
            </label>
          </div>
        ))}
      </QuestionWrapper>
    </div>
  );
};

export default Question4;
