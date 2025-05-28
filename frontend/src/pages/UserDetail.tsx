import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap, Code, Send, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { UserTypeEnum } from "@/@types/user";
import { userTypeToPt } from "@/mappers/userTypeToPt";
import { useFindUserById } from "@/services/hooks/user/usefindUserById";
import { formatDateLocale } from "@/utils/formatters";
import { useSendInvite } from "@/services/hooks/invites/useSendInvite";

const UserDetail: React.FC = () => {
  const { userId } = useParams();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { sendInvite, sendInviteStatus } = useSendInvite();

  const isOwnProfile = !userId || Number(userId) === user?.id;

  const {
    userData: [userData],
  } = useFindUserById({ id: Number(userId) || user.id });

  console.log({ userData });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Buscando Usuário</h2>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  if (!userData && !isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usuário não encontrado</h2>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  const canSendInvite = user?.userType === UserTypeEnum.ADMIN && userData.userType === UserTypeEnum.CANDIDATE;

  const sendInviteHandler = async () => {
    await sendInvite({ userId: Number(userId) })
      .then(() => {
        toast({
          title: "Convite enviado!",
          description: `Convite foi enviado para ${userData.fullName}.`,
        });
      })
      .catch((e) => {
        toast({
          title: "Erro durante o envio do convite",
          description: e.message,
        });
      });
  };

  const getInitials = (name?: string) => {
    return (name || "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {isOwnProfile ? "Meu Perfil" : `Perfil de ${userData.fullName}'`}
          </h1>
          <p className="text-gray-600 mt-1">
            {isOwnProfile ? "Veja os dados da sua conta" : "Detalhes da conta do candidato"}
          </p>
        </div>
        {canSendInvite && (
          <Button
            onClick={sendInviteHandler}
            disabled={sendInviteStatus === "pending"}
            className="flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>{sendInviteStatus === "pending" ? "Enviando..." : "Enviar Convite"}</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {getInitials(userData.fullName || userData.email)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{userData.fullName}</CardTitle>
              <Badge variant="outline" className="capitalize">
                {userTypeToPt[userData.userType]}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                {userData.phone && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                )}
                {userData.address && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{userData.address}</span>
                  </div>
                )}
                {userData.birthdate && (
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {formatDateLocale(userData.birthdate)} ({calculateAge(userData.birthdate)} anos)
                    </span>
                  </div>
                )}
              </div>

              {userData.cep && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>CEP:</strong> {userData.cep}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {userData.abilities && userData.abilities.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  <span>Habilidades</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.abilities.map((ability, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {ability.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {userData.degrees && userData.degrees.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span>Educação</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.degrees.map((degree, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <h3 className="font-semibold text-lg text-gray-900">{degree.name}</h3>
                      <p className="text-blue-600 font-medium">{degree.institutionName}</p>
                      <p className="text-sm text-gray-600">Graduado em: {formatDateLocale(degree.graduationDate)}</p>
                      {index < userData.degrees!.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Informação da conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tipo Usuário:</span>
                  <Badge variant="outline" className="capitalize">
                    {userTypeToPt[userData.userType]}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
