type questionCardProps = {
  //qsId: number;
  givenAnswer: string;
  qsNumber?: number;
  objJson: any;
};

const QuestionCard = ({
  //qsId,
  givenAnswer,
  qsNumber,
  objJson,
}: questionCardProps) => {
  //Answers of the qs and the correct amswer
  // const answers = Riddles[qsId].answers;
  // const correctAnswer = Riddles[qsId].correct;

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
  const answers = ansArray;
  const correctAnswer = objJson.correctAnswer;

  return (
    <div className="md:text-xl ml-8 w-fit items-center">
      {/**paragraph to display the question */}
      <p className="text-white my-8 text-lg mr-8">
        <span className="text-cyan-400">Question {qsNumber} : </span>
        {objJson.question}
      </p>

      {/**array map to loop through the answers array */}
      {answers.map((item: string) => (
        <div key={item}>
          <label
            className={`${
              item === correctAnswer
                ? "text-green-500 text-lg flex"
                : item === givenAnswer && item != correctAnswer
                ? "text-red-500 text-lg flex"
                : "text-white text-lg flex"
            }`}
          >
            <input
              type="radio"
              name="Radios"
              className="mr-2 accent-cyan-300"
              value={item}
              disabled
            />
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
