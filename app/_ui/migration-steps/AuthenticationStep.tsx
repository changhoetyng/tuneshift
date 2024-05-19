import FloatingCard from "../card/FloatingCard";
import NavigationButton from "../buttons/NavigationButton";
import VerticalSteps from "../widgets/VerticalSteps";

interface AuthenticationStepProps {
  title: string;
}

export default function AuthenticationStep({ title }: AuthenticationStepProps) {
  return (
    <div>
      <FloatingCard
        className="pl-14 pr-14 pb-14 pt-8"
        optionsBar={<NavigationButton>Back to Options</NavigationButton>}
      >
        <h1 className="text-2xl">{title}</h1>
        <VerticalSteps
          steps={[
            { title: "1", isDone: true },
            { title: "2", isDone: true },
          ]}
        ></VerticalSteps>
      </FloatingCard>
    </div>
  );
}
