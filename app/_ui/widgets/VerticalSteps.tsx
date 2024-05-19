import clsx from "clsx";
import Steps from "../widgets/Steps";

interface VerticalSteps {
  steps: StepDataTypes[];
}

interface StepDataTypes {
  title: string;
  isDone: boolean;
}

export default function VerticalSteps({ steps }: VerticalSteps) {
  return (
    <div className="relative">
      {steps.map((step, index) => (
        <div className="relative flex items-start mt-14" key={index}>
          <Steps>{step.title}</Steps>
          <div
            className="absolute top-5 h-16 border-l-2 border-green-500 z-10"
            style={{ left: "11.5px" }}
          ></div>
        </div>
      ))}
    </div>
  );
}
