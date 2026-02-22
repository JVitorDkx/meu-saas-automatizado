import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Download, RefreshCw, Users, TrendingUp, DollarSign, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [leads, setLeads] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const leadsQuery = trpc.leads.list.useQuery();
  const statsQuery = trpc.leads.stats.useQuery();
  const metricsQuery = trpc.admin.metrics.useQuery();
  const exportQuery = trpc.admin.exportLeads.useQuery();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
      return;
    }

    if (user?.role !== "admin") {
      toast.error("Acesso negado. Apenas administradores podem acessar.");
      navigate("/");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        if (leadsQuery.data) setLeads(leadsQuery.data);
        if (metricsQuery.data) setMetrics(metricsQuery.data);
      } catch (error) {
        toast.error("Erro ao carregar dados");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, loading, user, leadsQuery.data, metricsQuery.data, navigate]);

  const handleExport = async () => {
    try {
      if (exportQuery.data) {
        const dataStr = JSON.stringify(exportQuery.data.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `leads-export-${new Date().toISOString().split("T")[0]}.json`;
        link.click();
        toast.success("Leads exportados com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao exportar leads");
    }
  };

  const handleRefresh = () => {
    leadsQuery.refetch();
    statsQuery.refetch();
    metricsQuery.refetch();
    toast.success("Dados atualizados!");
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              className="mb-4 gap-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <h1 className="text-4xl font-bold text-slate-900">
              Dashboard de Administração
            </h1>
            <p className="text-slate-600 mt-2">
              Bem-vindo, {user?.name || "Admin"}
            </p>
          </div>
          <Button
            size="lg"
            className="gap-2"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-5 h-5" />
            Atualizar
          </Button>
        </div>

        {/* Metrics Cards */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Leads */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-700 font-semibold mb-2">Total de Leads</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {metrics.leads?.total || 0}
                  </p>
                </div>
                <Users className="w-12 h-12 text-blue-300" />
              </div>
            </Card>

            {/* Qualified Leads */}
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-700 font-semibold mb-2">Qualificados</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {metrics.leads?.qualified || 0}
                  </p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-emerald-300" />
              </div>
            </Card>

            {/* Conversion Rate */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-700 font-semibold mb-2">Taxa de Conversão</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {metrics.leads?.conversionRate || 0}%
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-300" />
              </div>
            </Card>

            {/* Subscription Status */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-700 font-semibold mb-2">Plano Ativo</p>
                  <p className="text-2xl font-bold text-orange-600 capitalize">
                    {metrics.subscription?.plan || "Nenhum"}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    R$ {metrics.subscription?.monthlyPrice || "0"}/mês
                  </p>
                </div>
                <DollarSign className="w-12 h-12 text-orange-300" />
              </div>
            </Card>
          </div>
        )}

        {/* Leads Table */}
        <Card className="border-2 border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Leads Capturados</h2>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={handleExport}
                disabled={exportQuery.isLoading}
              >
                <Download className="w-4 h-4" />
                Exportar JSON
              </Button>
            </div>

            <Input
              type="text"
              placeholder="Buscar por nome, email ou empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-slate-300"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Nome</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Empresa</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Score</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-slate-200 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{lead.email}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {lead.company || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            lead.status === "qualified"
                              ? "bg-emerald-100 text-emerald-700"
                              : lead.status === "converted"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{
                                width: `${lead.automationScore}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-semibold text-slate-900">
                            {lead.automationScore}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-slate-600">
                        {searchTerm ? "Nenhum lead encontrado" : "Nenhum lead capturado ainda"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Total: {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
