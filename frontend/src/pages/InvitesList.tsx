import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Building, Calendar, CheckCircle, Clock, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Invite } from "@/@types/invite";
import { useListAllInvitesByUserId } from "@/services/hooks/invites/useListAllInvitesByUserId";
import { useAuth } from "@/contexts/AuthContext";
import { useMarkAsSeen } from "@/services/hooks/invites/useMarkAsSeen";
import { formatDateLocale } from "@/utils/formatters";
import { getNextBusinessDay } from "@/utils/date";

const InvitesList: React.FC = () => {
  const { user } = useAuth();

  const {
    invites: { invites, count },
  } = useListAllInvitesByUserId({ id: user.id }, !!user);
  const { markInviteAsSeen } = useMarkAsSeen();

  const handleAcceptInvite = async (inviteId: number) => {
    await markInviteAsSeen({ inviteIds: [inviteId] });
    toast({
      title: "Convite Aceito!",
      description: "Você Aceito com sucesso este convite.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case "declined":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        );
      default:
        return null;
    }
  };

  console.log({ invites });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Convites de Entrevistas</h1>
          <p className="text-gray-600 mt-1">Revisar Convites</p>
        </div>
      </div>

      {(invites || []).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Convites</h2>
          <div className="grid gap-6">
            {invites.map((invite) => (
              <Card key={invite.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl text-blue-700">Enviado por: {invite.admin.fullName}</CardTitle>
                      <div className="flex items-center text-gray-600">
                        <Building className="h-4 w-4 mr-2" />
                        <span className="font-medium">Data de Seleção: {formatDateLocale(invite.selectedDate)}</span>
                        <span className="mx-2">•</span>
                        <span>{invite.location}</span>
                      </div>
                    </div>
                    {getStatusBadge(invite.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>Data da entrevista: {formatDateLocale(getNextBusinessDay(invite.selectedDate, 3))}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={() => handleAcceptInvite(invite.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={invite.seen}
                    >
                      {" "}
                      {invite.seen ? (
                        <>
                          {" "}
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Aceito
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Aceitar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {(invites || []).length === 0 && (
        <Card className="shadow-sm">
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sem convites ainda</h3>
            <p className="text-gray-600">Quando as empresas lhe enviarem convites de emprego, eles aparecerão aqui.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InvitesList;
