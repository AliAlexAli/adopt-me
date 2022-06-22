import { createContext } from "react";
import Owner from "../services/dto/Owner";

const AuthContext = createContext<{
  isLoggedin: boolean;
  user?: Owner;
  login: (user: Owner) => void;
  logout: () => void;
  updateUser: (user: Owner) => void;
}>({
  isLoggedin: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export default AuthContext;
