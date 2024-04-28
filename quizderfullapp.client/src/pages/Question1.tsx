import QuestionWrapper from "../components/QuestionWrapper";

type UserData = {
  answer1: string;
};

type question1Props = UserData & {
  updateAnswer: (answer: UserData) => void;
  objJson: any;
};

const Question1 = ({ answer1, updateAnswer, objJson }: question1Props) => {
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
      {/**questionwrapper component to display the specific question */}
      <QuestionWrapper title="Question 1">
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
                checked={answer1 === item}
                onChange={(e) => updateAnswer({ answer1: e.target.value })}
              />
              {item}
            </label>
          </div>
        ))}

        {/* <div className=" text-white text-lg flex">
          <label className=" ">
            <input
              required
              type="radio"
              name="Radios"
              className="mr-2 accent-cyan-300"
              value={objJson.answer1}
              checked={answer1 === objJson.answer1}
              onChange={(e) => updateAnswer({ answer1: e.target.value })}
            />
            {objJson.answer1}
          </label>
        </div>
        <div className=" text-white text-lg flex">
          <label className=" ">
            <input
              required
              type="radio"
              name="Radios"
              className="mr-2 accent-cyan-300"
              value={objJson.answer2}
              checked={answer1 === objJson.answer2}
              onChange={(e) => updateAnswer({ answer1: e.target.value })}
            />
            {objJson.answer2}
          </label>
        </div>
        <div className=" text-white text-lg flex">
          <label className=" ">
            <input
              required
              type="radio"
              name="Radios"
              className="mr-2 accent-cyan-300"
              value={objJson.answer3}
              checked={answer1 === objJson.answer3}
              onChange={(e) => updateAnswer({ answer1: e.target.value })}
            />
            {objJson.answer3}
          </label>
        </div>
        <div className=" text-white text-lg flex">
          <label className=" ">
            <input
              required
              type="radio"
              name="Radios"
              className="mr-2 accent-cyan-300"
              value={objJson.answer4}
              checked={answer1 === objJson.answer4}
              onChange={(e) => updateAnswer({ answer1: e.target.value })}
            />
            {objJson.answer4}
          </label>
        </div> */}
      </QuestionWrapper>
    </div>
  );
};

export default Question1;
