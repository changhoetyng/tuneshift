import clsx from "clsx";
import Steps from "../widgets/Steps";

interface VerticalSteps {
  steps: StepDataTypes[];
  height: number;
  className?: string;
}

interface StepDataTypes {
  step: string;
  isDone: boolean;
  element: (props: any) => React.ReactNode;
}

export default function VerticalSteps({
  height,
  steps,
  className,
}: VerticalSteps) {
  function isStepDone(index: number) {
    return steps.every((e, idx) => (idx > index ? true : e.isDone));
  }

  function shouldDisableStep(index: number) {
    if (index === 0) return false; // The first step is never disabled
    const previousStepDone = isStepDone(index - 1);
    // If the previous step is not done then the current step should be disabled
    return !previousStepDone;
  }

  return (
    <div className={clsx("relative w-full sm:min-w-[370px]", className)}>
      {steps.map((step, index) => (
        <div
          className="relative flex items-start w-full"
          key={index}
          style={{ marginTop: `${index == 0 ? 0 : height - 24}px` }}
        >
          <div className="flex flex-row items-center w-full">
            <Steps
              className={clsx(
                "mr-5",

                isStepDone(index) ? "bg-green-500" : "bg-primary"
              )}
            >
              {step.step}
            </Steps>
            <div className="w-full">
              {step.element({
                disabled: shouldDisableStep(index),
              })}
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div
              className={clsx(
                "absolute top-5 border-l-2 z-10",
                steps[index].isDone ? "border-green-500" : "border-primary"
              )}
              style={{ left: "11.5px", height: `${height}px` }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
