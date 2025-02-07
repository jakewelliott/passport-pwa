import RoundedButton from "@/components/common/rounded-button";

export default function LoginPage() {
  return (
    <div
      className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/photos/SILA-BackCover.jpg')" }}
    >
      <form className="flex flex-col items-center p-8 gap-3 m-auto max-w-96 bg-supporting_lightblue rounded-3xl bg-opacity-75">
        <input
          type="text"
          placeholder="Username"
          required
          className="p-2 border border-system_gray rounded-lg w-80"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="p-2 border border-system_gray rounded-lg w-80"
        />
        <p className="text-center">
          By using this application, you agree to the State of NC's{" "}
          <a href="https://www.nc.gov/privacy" target="blank">
            Privacy Policy
          </a>
        </p>
        <div className="flex flex-row gap-4">
          <RoundedButton title={"Register"} />
          <RoundedButton title={"Login"} color="secondary_orange" />
        </div>
      </form>
    </div>
  );
}
