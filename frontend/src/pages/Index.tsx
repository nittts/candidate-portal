import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserTypeEnum } from "@/@types/user";

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const redirectPath = user.userType === UserTypeEnum.ADMIN ? "/candidates" : "/invites";
  return <Navigate to={redirectPath} replace />;
};

export default Index;
