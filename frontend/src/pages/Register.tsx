import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Code, Plus, X, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useConsultUserCEPAddress } from "@/services/hooks/user/useConsultUserCEPAddress";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    birthdate: "",
    email: "",
    phone: "",
    address: "",
    cep: "",
  });
  const [abilities, setAbilities] = useState<string[]>([]);
  const [newAbility, setNewAbility] = useState("");
  const [degrees, setDegrees] = useState<
    Array<{
      name: string;
      institutionName: string;
      graduationDate: string;
    }>
  >([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { consultCep, consultCepStatus } = useConsultUserCEPAddress();
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "cep") handleCepSearch(e.target.value);
  };

  const handleCepSearch = async (value) => {
    if (value.length === 0) {
      return setFormData({
        ...formData,
        address: "",
        cep: value,
      });
    }

    if (value.length === 8) {
      const address = await consultCep({ cep: value });

      return setFormData({
        ...formData,
        address,
        cep: value,
      });
    }
  };

  const addAbility = () => {
    if (newAbility.trim() && !abilities.includes(newAbility.trim())) {
      setAbilities([...abilities, newAbility.trim()]);
      setNewAbility("");
    }
  };

  const removeAbility = (ability: string) => {
    setAbilities(abilities.filter((a) => a !== ability));
  };

  const addDegree = () => {
    setDegrees([...degrees, { name: "", institutionName: "", graduationDate: "" }]);
  };

  const updateDegree = (index: number, field: string, value: string) => {
    const updatedDegrees = degrees.map((degree, i) => (i === index ? { ...degree, [field]: value } : degree));
    setDegrees(updatedDegrees);
  };

  const removeDegree = (index: number) => {
    setDegrees(degrees.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const registrationData = {
      ...formData,
      birthdate: new Date(formData.birthdate).toISOString(),
      abilities: abilities.map((name) => ({ name })),
      degrees: degrees.map((degree) => ({
        ...degree,
        graduationDate: new Date(degree.graduationDate).toISOString(),
      })),
    };

    await register(registrationData)
      .then(() => {
        setSuccess(true);
        toast({
          title: "Registro bem-sucedido!",
          description: "Verifique seu e-mail para obter instruções de ativação.",
        });
      })
      .catch(() => {
        setError("O registro falhou. Tente novamente.");
      });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 px-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Verifique seu e-mail</CardTitle>
            <CardDescription>
              Enviamos um link de ativação. Verifique seu e-mail e siga as instruções para ativar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/login")} className="w-full">
              Retornar ao Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Banco de Talentos
            </h1>
          </div>
          <p className="text-gray-600">Junte-se a nossa comunidade</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Crie o seu perfil de candidato</CardTitle>
            <CardDescription>Preencha com os dados para juntar-se a nossa rede de conexões</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Informação Pessoal
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthdate">Data de nascimento</Label>
                    <Input
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      disabled={consultCepStatus === "pending"}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" name="cep" value={formData.cep} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>

              {/* Abilities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-600" />
                  Habilidades
                </h3>

                <div className="flex gap-2">
                  <Input
                    placeholder="Adicione uma habilidade (e.g., React, Java, Python)"
                    value={newAbility}
                    onChange={(e) => setNewAbility(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAbility())}
                  />
                  <Button type="button" onClick={addAbility} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {abilities.map((ability) => (
                    <Badge key={ability} variant="secondary" className="flex items-center gap-1">
                      {ability}
                      <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeAbility(ability)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Degrees */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                    Educação
                  </h3>
                  <Button type="button" onClick={addDegree} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar Graduação
                  </Button>
                </div>

                {degrees.map((degree, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Graduação {index + 1}</h4>
                      <Button type="button" onClick={() => removeDegree(index)} variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>Nome da Graduação</Label>
                        <Input
                          value={degree.name}
                          onChange={(e) => updateDegree(index, "name", e.target.value)}
                          placeholder="e.g., Computer Science"
                        />
                      </div>
                      <div>
                        <Label>Instituição</Label>
                        <Input
                          value={degree.institutionName}
                          onChange={(e) => updateDegree(index, "institutionName", e.target.value)}
                          placeholder="e.g., MIT"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Data de graduação</Label>
                      <Input
                        type="date"
                        value={degree.graduationDate}
                        onChange={(e) => updateDegree(index, "graduationDate", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já possui uma conta?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Entrar
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
