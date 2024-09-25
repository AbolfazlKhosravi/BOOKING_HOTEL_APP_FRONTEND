import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

interface UserType {
  name: string;
  email: string;
  password: string;
}
interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  err: string|null;
  login: (email:string,password:string) => Promise<void>;
  logout: () => void;
  signup: (email:string,password:string,name:string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
  err: "",
  login: async() => {},
  logout: async() => {},
  signup: async() => {},
});

interface StateType {
  user: UserType | null;
  isAuthenticated: boolean;
  err:string|null,
  loading: boolean;
}
interface ResponsType {
    message: string;
    user: UserType;
  
}

type ActionType =
  | { type: "PENDING" }
  | { type: "SUCESS"; payload: UserType }
  | { type: "REJECTED"; payload: string }
  | { type: "LOGOUT/SUCESS"}

const initialState = {
  user: null,
  isAuthenticated: false,
  err:null,
  loading:false
};

function authReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
        loading: true,
      };
    case "SUCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "REJECTED": {
      return {
        ...state,
        loading: false,
        err: action.payload,
        isAuthenticated: false,
        user: null,
      };
    }
    case "LOGOUT/SUCESS": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    default:
      throw new Error("Unknown action!");
  }
}
type PropsType = {
  children: React.ReactNode;
};
const BASE_URL: string = "http://localhost:3000/api";
export default function AuthProvier({ children }: PropsType) {
  const [{ user, isAuthenticated, loading, err }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(()=>{
   async function fetchUser() {
      dispatch({ type: "PENDING" });
    try {
      const { data } = await axios.get<ResponsType>(
        `${BASE_URL}/users/user`
      );
      
      dispatch({ type: "SUCESS", payload: data.user });
      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: "REJECTED",
          payload: error.response?.data.message,
        });
        // toast.error(error?.response?.data.message || "An error occurred.");
      }
    }
    }
    fetchUser()
  },[])

 async function login(email:string, password:string):Promise<void> {
    dispatch({ type: "PENDING" });
    try {
      const { data } = await axios.post<ResponsType>(
        `${BASE_URL}/users/login`,{
            email,
            password,
        }
      );
      
      dispatch({ type: "SUCESS", payload: data.user });
      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: "REJECTED",
          payload: error.response?.data.message,
        });
        toast.error(error?.response?.data.message || "An error occurred.");
      }
    }
  }
   const signup = async(name:string,email:string, password:string):Promise<void> => {
    dispatch({ type: "PENDING" });
    try {
      
      const { data } = await axios.post<ResponsType>(
        `${BASE_URL}/users/register`,{
            email,
            password,
            name
        }
      );
      
      dispatch({ type: "SUCESS", payload: data.user });
      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: "REJECTED",
          payload: error.response?.data.message,
        });
        toast.error(error?.response?.data.message || "An error occurred.");
      }
    }
  }

 async function logout() {
    dispatch({ type: "PENDING" });
    try {
      
      const { data } = await axios.post<{message:string}>(
        `${BASE_URL}/users/logout`,{}
      );
      
      dispatch({ type: "LOGOUT/SUCESS" });
      toast.success(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: "REJECTED",
          payload: error.response?.data.message,
        });
        toast.error(error?.response?.data.message || "An error occurred.");
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        err,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


