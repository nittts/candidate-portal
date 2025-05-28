import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mail, User, MapPin, Calendar, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Candidate } from "@/@types/candidate";
import { AbilityName } from "@/@types/Ability";
import { formatDate } from "@/utils/formatters";
import { useSendInvite } from "@/services/hooks/invites/useSendInvite";
import { useListCandidates } from "@/services/hooks/user/useListCandidates";

const allTags = Array.from(Object.keys(AbilityName)) as AbilityName[];

const CandidatesList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<AbilityName[]>([]);

  const { sendInvite, sendInviteStatus } = useSendInvite();
  const { candidates, listCandidatesStatus } = useListCandidates({ abilities: selectedTags, name: searchTerm });

  const toggleTag = (tag: AbilityName) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const sendInviteHandler = async (userId: number, candidateName: string) => {
    await sendInvite({ userId })
      .then(() => {
        toast({
          title: "Convite enviado!",
          description: `Convite foi enviado para ${candidateName}.`,
        });
      })
      .catch((e) => {
        toast({
          title: "Erro durante o envio do convite",
          description: e.message,
        });
      });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidatos</h1>
          <p className="text-gray-600 mt-1">Gerenciar e revisar perfis de talentos</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar candidatos por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Filtrar por habilidades:</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])} className="mt-2 text-xs">
                  Limpar Filtros
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(candidates || []).map((candidate) => (
          <Card key={candidate.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(candidate.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{candidate.fullName}</CardTitle>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {candidate.email}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {candidate.address}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Born {formatDate(candidate.birthdate)}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.abilities.slice(0, 3).map((ability) => (
                    <Badge key={ability.name} variant="secondary" className="text-xs">
                      {ability.name}
                    </Badge>
                  ))}
                  {candidate.abilities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{candidate.abilities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/profile/${candidate.id}`)}
                  className="flex-1"
                >
                  <User className="h-3 w-3 mr-1" />
                  Ver Perfil
                </Button>
                <Button
                  size="sm"
                  onClick={() => sendInviteHandler(candidate.id, candidate.fullName)}
                  className="flex-1"
                >
                  {sendInviteStatus === "pending" ? (
                    "Enviando.."
                  ) : (
                    <>
                      <Send className="h-3 w-3 mr-1" />
                      Enviar Convite
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {listCandidatesStatus === "pending" && (
        <Card className="shadow-sm">
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Buscando Candidatos</h3>
          </CardContent>
        </Card>
      )}

      {(candidates || []).length === 0 && listCandidatesStatus !== "pending" && (
        <Card className="shadow-sm">
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Candidatos não encontrados</h3>
            <p className="text-gray-600">
              {searchTerm || selectedTags.length > 0
                ? "Tente ajustar o seu filtro e pesquisa."
                : "Não à candidatos cadastrados."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidatesList;
