import MainPageWelcomeText from "@/app/_ui/main-page/MainPageWelcomeTextv2";
import RountedButton from "@/app/_ui/buttons/RoundedButton";
import Link from "next/link";

export default async function IndexPage() {
  // const [showButton, setShowButton] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowButton(true);
  //   }, 3000);

  //   return () => clearTimeout(timer); // Clean up on unmount
  // }, []);

  return (
    <div className="flex flex-col items-left md:items-center justify-center w-full h-full pl-10 md:p-0">
      <MainPageWelcomeText
        text="Welcome to TuneShift"
        className="text-7xl text-center"
        // bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text
      />
      <p className="text-left w-full md:text-center mt-10 animate-fadeInUp">
        The easiest way to transfer your music between streaming services.
      </p>

      <Link href="/migrate">
        <RountedButton className="flex-start mt-10 animate-fadeInUp mb-20">
          Get Started
        </RountedButton>
      </Link>
    </div>
  );
}
