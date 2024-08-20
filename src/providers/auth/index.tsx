import { Api } from "@/constants/endpoints";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { createContext, useContext } from "react";
import { queryClient } from "..";
import { useRouter } from "next/navigation";
import { Paths } from "@/constants/paths";
import { ApiError } from "@/types/api-error";
import { toast } from "sonner";
import { TOASTS } from "@/constants/toasts";

export type Credentials = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isFetchingUser: boolean;
  signIn: ({ username, password }: Credentials) => void;
  isSigningIn: boolean;
  signOut: () => void;
  isSigningOut: boolean;
};

const initialContext: AuthContextType = {
  user: null,
  isFetchingUser: false,
  signIn: () => {},
  isSigningIn: false,
  signOut: () => {},
  isSigningOut: false,
};

const AuthContext = createContext<AuthContextType>(initialContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryKey = ["user"];

  const router = useRouter();

  const { data: user, isFetching: isFetchingUser } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await axios.get<User>(Api.auth.user);
      return data;
    },
    initialData: () => {
      return null;
    },
  });

  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: async (credentials: Credentials) => {
      const { data } = await axios.post<User>(Api.auth.signIn, credentials);
      return data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(queryKey, user);
      toast.success(TOASTS.SUCCESS, {
        description: "You have successfully signed in",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(TOASTS.ERROR, {
        description: error.response?.data.message ?? "An error occurred",
      });
    },
  });

  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: async () => {
      return axios.get(Api.auth.signOut);
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKey, null);
      toast.success(TOASTS.SUCCESS, {
        description: "You have successfully signed out",
      });
      router.push(Paths.SignIn);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(TOASTS.ERROR, {
        description: error.response?.data.message ?? "An error occurred",
      });
    },
  });

  const value = {
    user,
    isFetchingUser,
    signIn,
    isSigningIn,
    signOut,
    isSigningOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
