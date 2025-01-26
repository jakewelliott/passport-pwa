import { PassportHeader } from "../components/common/passport-header";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center bg-no-repeat" style={{
      backgroundImage: "url('./photos/CRMO_FrontCover.jpg')",
      backgroundSize: '150%',
      backgroundPosition: "center 25%",
      zIndex: 9999
    }}>
      <PassportHeader />
    </div>
  );
};

export default SplashScreen;
