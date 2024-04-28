import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const nextPage = () => {
    navigate("/questions");
  };

  const riddlesPage = () => {
    navigate("/Riddles");
  };

  return (
    <>
      <div className=" w-screen bg-blend-luminosity h-screen bg-[url('/assets/images/welcomeImg.jpg')]">
        <div className="flex justify-end absolute  mt-4 w-full border-black">
          <button
            className="mr-14 bg-black w-44 h-14 border-4 border-cyan-500 rounded my-9 hover:bg-blue-900 text-white"
            onClick={riddlesPage}
          >
            Go To Riddles
          </button>
        </div>

        <div className="text-white absolute bg-black bg-opacity-75 my-44 mx-10 w-fit md:w-3/4 lg:w-3/4 h-fit p-10">
          <h1 className=" font-extrabold text-4xl">
            Welcome To <span className="text-cyan-400">Quizder</span>
          </h1>
          <hr className="border-cyan-400 border-2" />
          <p className="pt-6">
            This is Quizder quize. You will get 5 random general knowledge
            questions on each ATTEMPT. Once you finish, your results will be
            displayed on next page. Click get started to proceed. All the best.
          </p>
          <div className="flex justify-end">
            <button
              className="bg-cyan-400 w-32 h-10 rounded-full my-5 lg:my-9 hover:bg-blue-900"
              onClick={nextPage}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
