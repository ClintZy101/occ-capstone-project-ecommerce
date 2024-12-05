import { useAuthListener } from "../../utils/useAuthHook";

const AuthProvider = ({ children }) => {
  useAuthListener(); // Sync Zustand with Firebase Auth state
  return children;
};

export default AuthProvider;
