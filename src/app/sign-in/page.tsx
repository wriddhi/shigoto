"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Credentials, useAuth } from "@/providers/auth";
import { Button, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Paths } from "@/constants/paths";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";
import Loader from "@/components/Loader";
import { STORAGE } from "@/constants/storage";

export default function SignIn() {
  const { user, isFetchingUser, signIn, isSigningIn } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [validation, setValidation] = useState<Credentials>({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (username) {
      setValidation((prev) => ({
        ...prev,
        username: "",
      }));
    }
  }, [username]);

  useEffect(() => {
    if (password) {
      setValidation((prev) => ({
        ...prev,
        password: "",
      }));
    }
  }, [password]);

  useEffect(() => {
    const savedCredentials = localStorage.getItem(STORAGE.CREDENTIALS);

    if (savedCredentials) {
      const { username, password } = JSON.parse(
        savedCredentials
      ) as Credentials;
      setUsername(username);
      setPassword(password);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      if (!username) {
        setValidation((prev) => ({
          ...prev,
          username: "Username cannot be empty",
        }));
      }
      if (!password) {
        setValidation((prev) => ({
          ...prev,
          password: "Password cannot be empty",
        }));
      }
      return;
    }
    if (remember) {
      localStorage.setItem(
        STORAGE.CREDENTIALS,
        JSON.stringify({ username, password })
      );
    } else {
      localStorage.removeItem(STORAGE.CREDENTIALS);
    }
    signIn({ username, password });
  };

  if (isFetchingUser) {
    return <Loader />;
  }

  if (user) {
    return router.push(Paths.Workspaces.root);
  }

  return (
    <main className="w-screen h-screen grid place-items-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-2/3 lg:w-1/3 bg-white flex flex-col p-8 gap-8 rounded-l-md"
      >
        <h1 className="font-serif">Login.</h1>
        <p className="text-xs">
          Fields marked with <b className="text-danger-500">*</b> are required.
        </p>
        <Input
          type="text"
          label="Username"
          placeholder="Enter your username"
          radius="sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          isInvalid={!!validation.username}
          errorMessage={validation.username}
          isRequired
        />
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          radius="sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          isInvalid={!!validation.password}
          errorMessage={validation.password}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
              aria-label="toggle password visibility"
            >
              {showPassword ? (
                <PiEyeSlashDuotone className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <PiEyeDuotone className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          isRequired
        />
        <Checkbox
          defaultChecked={remember}
          checked={remember}
          onChange={(e) => {
            setRemember(e.target.checked);
          }}
        >
          Remember me?
        </Checkbox>
        <Button
          className="bg-black text-white"
          type="submit"
          radius="sm"
          isLoading={isSigningIn}
        >
          {isSigningIn ? "Signing in ->" : "Sign in ->"}
        </Button>
      </form>
    </main>
  );
}
