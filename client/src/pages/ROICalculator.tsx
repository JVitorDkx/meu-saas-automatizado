import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, DollarSign, TrendingUp, Clock, Users } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function ROICalculator() {
  const [, navigate] = useLocation();
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [conversionRate, setConversionRate] = useState(35);
  const [averageTicket, setAverageTicket] = useState(1000);
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateMutation = trpc.roi.calculate.useMutation();

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const res = await calculateMutation.mutateAsync({
        hoursPerDay,
        hourlyRate,
        conversionRate,
        averageTicket,
      });
      setResult(res);
      toast.success("ROI calculado com sucesso!");
    } catch (error) {
      toast.error("Erro ao calcular ROI");
      console.error("Error:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8 gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Calculadora de ROI
          </h1>
          <p className="text-xl text-slate-600">
            Descubra quanto você economizaria automatizando a triagem de leads
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-8 border-2 border-emerald-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Seus Dados
            </h2>

            <div className="space-y-8">
              {/* Hours Per Day */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Horas perdidas por dia em triagem
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[hoursPerDay]}
                    onValueChange={(value) => setHoursPerDay(value[0])}
                    min={1}
                    max={8}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-emerald-600 min-w-12">
                    {hoursPerDay}h
                  </span>
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Seu valor/hora (R$)
                </Label>
                <Input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="border-slate-300 text-lg"
                  min="50"
                  step="50"
                />
                <p className="text-sm text-slate-600">
                  Valor que você cobra por hora de trabalho
                </p>
              </div>

              {/* Conversion Rate */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <Users className="w-5 h-5 text-emerald-600" />
                  Taxa de conversão (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[conversionRate]}
                    onValueChange={(value) => setConversionRate(value[0])}
                    min={5}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-emerald-600 min-w-12">
                    {conversionRate}%
                  </span>
                </div>
              </div>

              {/* Average Ticket */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Ticket médio (R$)
                </Label>
                <Input
                  type="number"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Number(e.target.value))}
                  className="border-slate-300 text-lg"
                  min="100"
                  step="100"
                />
                <p className="text-sm text-slate-600">
                  Valor médio de cada venda
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleCalculate}
                disabled={isCalculating}
              >
                {isCalculating ? "Calculando..." : "Calcular ROI"}
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Savings Card */}
                <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300">
                  <div className="space-y-2">
                    <p className="text-slate-700 font-semibold">Economia Mensal</p>
                    <p className="text-4xl font-bold text-emerald-600">
                      R$ {result.estimatedSavings.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-sm text-slate-600">
                      {result.hoursPerMonth} horas/mês × R$ {result.hourlyRate}/hora
                    </p>
                  </div>
                </Card>

                {/* Sales Card */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
                  <div className="space-y-2">
                    <p className="text-slate-700 font-semibold">Receita Adicional</p>
                    <p className="text-4xl font-bold text-blue-600">
                      R$ {result.estimatedMonthlySales.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-sm text-slate-600">
                      {result.qualifiedLeads} leads qualificados × R$ {result.averageTicket}
                    </p>
                  </div>
                </Card>

                {/* ROI Card */}
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300">
                  <div className="space-y-2">
                    <p className="text-slate-700 font-semibold">ROI da Solução</p>
                    <p className="text-4xl font-bold text-purple-600">
                      {result.roi}%
                    </p>
                    <p className="text-sm text-slate-600">
                      Retorno sobre investimento (vs R$ 2.500/mês)
                    </p>
                  </div>
                </Card>

                {/* Breakdown */}
                <Card className="p-6 border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">Resumo</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Leads/mês</span>
                      <span className="font-semibold">{result.leadsPerMonth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Taxa de conversão</span>
                      <span className="font-semibold">{result.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Leads qualificados</span>
                      <span className="font-semibold">{result.qualifiedLeads}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Total mensal</span>
                      <span className="text-emerald-600">
                        R$ {(result.estimatedSavings + result.estimatedMonthlySales).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </Card>

                <Button
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => navigate("/")}
                >
                  Voltar para Home
                </Button>
              </>
            ) : (
              <Card className="p-8 border-2 border-slate-200 flex items-center justify-center h-full">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">
                    Preencha os dados e clique em "Calcular ROI" para ver os resultados
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
