import FloatingCard from "../card/FloatingCard";
import NavigationButton from "../buttons/NavigationButton";
import VerticalSteps from "../widgets/VerticalSteps";
import LongRoundedButton from "../buttons/LongRoundedButton";

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
        <h1 className="text-2xl text-center">{title}</h1>
        <VerticalSteps
          className="mt-6"
          height={80}
          steps={[
            {
              step: "1",
              isDone: true,
              element: (
                <LongRoundedButton>Log In to Apple Music</LongRoundedButton>
              ),
            },
            {
              step: "2",
              isDone: true,
              element: <LongRoundedButton>Log In to Spotify</LongRoundedButton>,
            },
            {
              step: "3",
              isDone: false,
              element: (
                <LongRoundedButton disabled={true}>
                  Select Playlists
                </LongRoundedButton>
              ),
            },
          ]}
        ></VerticalSteps>
      </FloatingCard>
    </div>
  );
}
