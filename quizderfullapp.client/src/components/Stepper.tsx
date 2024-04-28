type stepperProps = {
  step: number;
};

const Stepper = ({ step }: stepperProps) => {
  const arr = [1, 2, 3, 4, 5];

  return (
    <div className="flex justify-center items-center w-full h-28">
      {arr.map((item) => {
        const isActive = item === step;
        const isFinalStep = item === arr.length;
        return (
          <div key={item} className=" flex items-center">
            <div
              className={`rounded-full w-6 h-6 ${
                isActive ? "bg-cyan-100 " : "bg-cyan-900"
              }`}
            ></div>
            {isFinalStep ? null : (
              <span
                className={`h-1 w-10 md:w-20 lg:w-16 ${
                  isActive ? "bg-cyan-100" : "bg-cyan-900"
                }`}
              ></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
