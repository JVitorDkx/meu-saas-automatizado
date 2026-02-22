import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, TrendingUp, Zap, DollarSign, Users, Clock, Target, Mail, Phone, Building2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createLeadMutation = trpc.leads.create.useMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createLeadMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
      });

      if (result.success) {
        toast.success("Lead capturado com sucesso! Entraremos em contato em breve.");
        setFormData({ name: "", email: "", phone: "", company: "" });
      }
    } catch (error) {
      toast.error("Erro ao capturar lead. Tente novamente.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Agência de Automação de IA
                </h1>
                <p className="text-2xl text-emerald-600 font-semibold">
                  Do Zero a R$100K/mês
                </p>
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Modelo de negócio 100% digital, validado em 2026, com <span className="font-semibold text-emerald-600">95% de margem de lucro</span> e <span className="font-semibold text-emerald-600">lucro imediato</span>.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Investimento inicial: R$ 300-500/mês</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">Primeira venda em 2-3 semanas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700">R$ 1.500-3.000/mês por cliente</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 w-full sm:w-auto"
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Comece Agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-700 font-semibold">Automação de Leads via IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="lead-form" className="py-20 bg-white">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Receba uma Análise Gratuita
            </h2>
            <p className="text-xl text-slate-600">
              Descubra quanto você pode economizar com automação de leads
            </p>
          </div>

          <Card className="p-8 border-2 border-emerald-200">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="border-slate-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Sua empresa"
                    value={formData.company}
                    onChange={handleFormChange}
                    className="border-slate-300"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Receber Análise Gratuita"}
              </Button>

              <p className="text-sm text-slate-600 text-center">
                Responderemos em até 24 horas. Sem compromisso.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Calculadora de ROI
            </h2>
            <p className="text-xl text-slate-600">
              Descubra quanto você economizaria com automação
            </p>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-8"
            onClick={() => navigate('/roi-calculator')}
          >
            Abrir Calculadora Interativa
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Comece Hoje: Seu Primeiro Cliente Está a 1 Mensagem de Distância
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            Modelo completo, validado, com ferramentas já em produção. Tudo que você precisa para começar está aqui.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-emerald-600 hover:bg-slate-100 gap-2"
            onClick={() => navigate('/admin')}
          >
            Acessar Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-2">Modelo de Negócio: Agência de Automação de IA (AAA)</p>
            <p className="text-sm">Validado em 2026 | Autor: Manus AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
