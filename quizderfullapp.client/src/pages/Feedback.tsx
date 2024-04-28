import { useLocation } from "react-router";
import QuestionCard from "../components/QuestionCard";
import ScoreCard from "../components/ScoreCard";

const Feedback = () => {
  const location = useLocation();
  const receivedData = location.state?.data;
  const riddlesArr = receivedData?.riddlesArr;
  const answersList = receivedData?.givenAnswers;
  const givenAnswersArr: string[] = [];
  var score = 0;
  var counter = 0;
  const correctAnsArray: string[] = [];

  for (const key in answersList) {
    const value = answersList[key];
    givenAnswersArr.push(value);
  }

  correctAnsArray.push(
    riddlesArr[0].correctAnswer,
    riddlesArr[1].correctAnswer,
    riddlesArr[2].correctAnswer,
    riddlesArr[3].correctAnswer,
    riddlesArr[4].correctAnswer
  );

  console.log(correctAnsArray);
  correctAnsArray.forEach(function (value: string) {
    // Riddles[value].correct === givenAnswersArr[counter]
    value === givenAnswersArr[counter]
      ? (score = score + 1)
      : console.log(value);
    counter++;
  });

  score = score * 20;

  return (
    <div className="w-screen h-fit bg-cover pb-6 lg:flex justify-between bg-[url('https://www.shutterstock.com/shutterstock/videos/1108479139/thumb/1.jpg?ip=x480')]">
      <ScoreCard score={score}></ScoreCard>

      <div className="text-white lg:w-3/4 lg:mx-4 xl:w-1/3  xl:mx-20 mx-7 my-8 space-y-10 bg-black">
        <h1 className="font-extrabold text-md text-center">
          Questions And Answers
        </h1>
        <QuestionCard
          //qsId={questionList[0]}
          givenAnswer={answersList.answer1}
          qsNumber={1}
          objJson={riddlesArr[0]}
        />
        <QuestionCard
          //qsId={questionList[1]}
          givenAnswer={answersList.answer2}
          qsNumber={2}
          objJson={riddlesArr[1]}
        />
        <QuestionCard
          //qsId={questionList[2]}
          givenAnswer={answersList.answer3}
          qsNumber={3}
          objJson={riddlesArr[2]}
        />
        <QuestionCard
          //qsId={questionList[3]}
          givenAnswer={answersList.answer4}
          qsNumber={4}
          objJson={riddlesArr[3]}
        />
        <QuestionCard
          //qsId={questionList[4]}
          givenAnswer={answersList.answer5}
          qsNumber={5}
          objJson={riddlesArr[4]}
        />
      </div>
    </div>
  );
};

export default Feedback;
