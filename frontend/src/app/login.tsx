import RoundedButton from "@/components/common/rounded-button";
import { api } from "@/lib/mock/api";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [errors, setErrors] = useState({ username: false, password: false });
  const [ searchParams ] = useSearchParams();
  if (!searchParams.get('redirect')) searchParams.set('redirect', '/');
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const loginMutation = api.loginUser();
  const registerMutation = api.registerUser();

  const validateFields = (username: string, password: string): boolean => {
    const newErrors = { username: !username, password: !password };
    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      const missingFields = [];
      if (newErrors.username) missingFields.push("Username");
      if (newErrors.password) missingFields.push("Password");
      toast.error(
        `${missingFields.join(" and ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required.`
      );
      return false;
    }
    return true;
  };

  const handleAuth = (isLogin: boolean) => (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!validateFields(username, password)) return;

    const mutation = isLogin ? loginMutation : registerMutation;
    mutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          // Redirect to the root path after successful login or registration
          toast.success(`Successfully ${isLogin ? 'logged in' : 'registered'} as ${username}`)
          navigate(searchParams.get('redirect') || '/');
        },
        onError: (err) => {
          const errorMessage = err.message.toLowerCase();
          setErrors({
            username: errorMessage.includes("username"),
            password: errorMessage.includes("password"),
          });
          toast.error(err.message);
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
        onSubmit={handleAuth(true)}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={inputClassName(errors.username)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={inputClassName(errors.password)}
        />
        <p className="text-center">
          By using this application, you agree to the State of NC's{" "}
          <a
            href="https://www.nc.gov/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </p>
        <div className="flex flex-row gap-4">
          <button type="button" onClick={handleAuth(false)}>
            <RoundedButton title="Register" />
          </button>
          <button type="submit">
            <RoundedButton title="Login" color="secondary_orange" />
          </button>
        </div>
      </form>
    </div>
  );
}
