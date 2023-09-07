import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user?.auth) {
    return <div>You don't have permission to access this route!</div>;
  }
  return <>{children}</>;
};

export default PrivateRoutes;
