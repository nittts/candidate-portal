import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Lock, Building2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ActivateAccount: React.FC = () => {
  const [payload, setPayload] = useState({
    token: "",
    password: "",
    previousPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { activateAccountHandler, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (payload.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    await activateAccountHandler(Number(payload.token), payload.password, payload.previousPassword)
      .then(() => {
        setSuccess(true);
        toast({
          title: "Conta ativada!",
          description: "Sua conta foi ativada com sucesso.",
        });
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((e) => {
        setError("Token de ativação inválido ou falha na ativação");
      });
  };

  const handleChange = (key: keyof typeof payload, value: string) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 px-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Conta ativada!</CardTitle>
            <CardDescription>
              Sua conta foi ativada com sucesso. Agora você pode acessar com suas credenciais.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/login")} className="w-full bg-green-600 hover:bg-green-700">
              Entrar agora
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Banco de Talentos
            </h1>
          </div>
          <p className="text-gray-600">Ative a sua conta</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Ative a sua conta</CardTitle>
            <CardDescription className="text-center">
              Digite o token de ativação do seu e-mail e defina sua senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="token">Token de ativação</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="token"
                    type="text"
                    placeholder="Entre com o token enviado via email"
                    value={payload.token}
                    onChange={(e) => handleChange("token", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Nova senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Escolha uma senha segura"
                    value={payload.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua Senha"
                    value={payload.previousPassword}
                    onChange={(e) => handleChange("previousPassword", e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Ativando..." : "Ativar Conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Precisa de Ajuda?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Voltar ao Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivateAccount;
