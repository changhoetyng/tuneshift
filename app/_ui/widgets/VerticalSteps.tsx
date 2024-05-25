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
  element: React.ReactNode;
}

export default function VerticalSteps({
  height,
  steps,
  className,
}: VerticalSteps) {
  return (
    <div className={clsx("relative", className)}>
      {steps.map((step, index) => (
        <div
          className="relative flex items-start"
          key={index}
          style={{ marginTop: `${index == 0 ? 0 : height - 24}px` }}
        >
          <div className="flex flex-row items-center">
            <Steps
              className={clsx(
                "mr-5",
                step.isDone ? "bg-green-500" : "bg-primary"
              )}
            >
              {step.step}
            </Steps>
            <div>{step.element}</div>
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
