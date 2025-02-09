import RoundedButton from "@/components/common/rounded-button";
import { api } from "@/lib/mock/api";
import { useRef, useState } from "react";

export default function LoginPage() {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginMutation = api.loginUser();
  const registerMutation = api.registerUser();

  const formRef = useRef<HTMLFormElement>(null);

  const validateFields = (username: string, password: string): boolean => {
    let isValid = true;

    // Reset error states
    setUsernameError(false);
    setPasswordError(false);

    if (!username && !password) {
      setUsernameError(true);
      setPasswordError(true);
      alert("Username and password are required.");
      isValid = false;
    }

    if (!username && password) {
      setUsernameError(true);
      alert("Username is required.");
      isValid = false;
    }

    if (!password && username) {
      setPasswordError(true);
      alert("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (!validateFields(username, password)) return;

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => alert("Login successful!"),
        onError: (err) => {
          const errorMessage = err.message.toLowerCase();
          setUsernameError(false);
          setPasswordError(false);
          if (errorMessage.includes("username")) {
            setUsernameError(true);
          }
          if (errorMessage.includes("password")) {
            setPasswordError(true);
          }
          alert(err.message);
        },
      }
    );
  };

  const handleRegister = () => {
    const formData = new FormData(formRef.current!);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!validateFields(username, password)) return;

    registerMutation.mutate(
      { username, password },
      {
        onSuccess: () => alert("Registration successful!"),
        onError: (err) => {
          const errorMessage = err.message.toLowerCase();
          setUsernameError(false);
          setPasswordError(false);
          if (errorMessage.includes("username")) {
            setUsernameError(true);
          }
          if (errorMessage.includes("password")) {
            setPasswordError(true);
          }
          alert(err.message);
        },
      }
    );
  };

  const inputClassName = (isError: boolean) => `
    w-80 rounded-lg border p-3 focus:outline-none focus:ring-1 focus:ring-opacity-100
    ${
      isError
        ? "border-system_red focus:border-system_red ring-system_red ring-1"
        : "border-system_gray focus:border-secondary_darkteal focus:ring-secondary_darkteal"
    }
  `;

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/photos/SILA-BackCover.jpg')" }}
    >
      <form
        ref={formRef}
        className="m-auto flex max-w-96 flex-col items-center gap-3 rounded-3xl bg-supporting_lightblue bg-opacity-75 p-8"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          placeholder="Username"
          required
          name="username"
          className={inputClassName(usernameError)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          className={inputClassName(passwordError)}
        />
        <p className="text-center">
          By using this application, you agree to the State of NC's{" "}
          <a href="https://www.nc.gov/privacy" target="blank">
            Privacy Policy
          </a>
        </p>
        <div className="flex flex-row gap-4">
          <div onClick={handleRegister}>
            <RoundedButton title={"Register"} />
          </div>

          <button type="submit">
            <RoundedButton title={"Login"} color="secondary_orange" />
          </button>
        </div>
      </form>
    </div>
  );
}
