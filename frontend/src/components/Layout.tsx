import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Users, Mail, User } from "lucide-react";
import { UserType, UserTypeEnum } from "@/@types/user";
import { userTypeToPt } from "@/mappers/userTypeToPt";

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Banco de Talentos
              </h1>
              <nav className="flex space-x-6">
                {user?.userType === UserTypeEnum.ADMIN && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/candidates")}
                    className="flex items-center space-x-2 hover:bg-blue-50"
                  >
                    <Users className="h-4 w-4" />
                    <span>Candidatos</span>
                  </Button>
                )}
                {user?.userType === UserTypeEnum.CANDIDATE && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/invites")}
                    className="flex items-center space-x-2 hover:bg-blue-50"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Convites</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => navigate("/profile/")}
                  className="flex items-center space-x-2 hover:bg-blue-50"
                >
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(user?.fullName || user?.email || "U")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.fullName || user?.email}</p>
                  <p className="text-gray-500 capitalize">{userTypeToPt[user?.userType]}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
