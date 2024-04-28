import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]){
    const [currentQsIndex, setCurrentQsIndex] = useState(0)


    function nextQs(){
        setCurrentQsIndex(i => {
            if(i >=steps.length -1 ) return i
            return i+1
        })
    }

    function prevQs(){
        setCurrentQsIndex(i => {
            if(i <= 0 ) return i
            return i-1
        })
    }


    return{
        currentQsIndex,
        step: steps[currentQsIndex],
        isFirstStep: currentQsIndex === 0,
        isLastStep: currentQsIndex === steps.length-1,
        steps,
        nextQs,
        prevQs,
    }

}