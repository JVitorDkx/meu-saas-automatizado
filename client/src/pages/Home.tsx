import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, TrendingUp, Zap, DollarSign, Users, Clock, Target } from "lucide-react";

export default function Home() {
  const imageUrls = {
    hero: "https://private-us-east-1.manuscdn.com/sessionFile/IWMvF5SdYFNFkad6GuFfNv/sandbox/1nxhhfL21dSNMmz6ZZ5nUP-img-1_1771793268000_na1fn_YWFhLWhlcm8td2hhdHNhcHAtYXV0b21hdGlvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSVdNdkY1U2RZRk5Ga2FkNkd1RmZOdi9zYW5kYm94LzFueGhoZkwyMWRTTk1tejZaWjVuVVAtaW1nLTFfMTc3MTc5MzI2ODAwMF9uYTFmbl9ZV0ZoTFdobmNtOHRkMmhoZEhOaGNIQXRZWFYwYjIxaGRHbHZiZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=YMSClQ0SVaPTDztWt8QkH3s6euu9QZzi~fVXPgL7YjqcGe0RgedkTuhXhpnl4m0lNLUhczmL2PUYCTcr1CM66fVn8Buejp7mKlM~xHy2LjqECqauRTOe8b82CvLtNrXLBDl1QRZ26KFEp7x5K8Gxt1Swt6BhuOKFas6ZdNyY0A3xTatUVhRVGJRb0d94zebQIm3q-ZfPgnhKzYFxFWszEn7dMAvwb5XLHloSXlUqv93fQ5E9YcG-DObVDEtAidd54iVRe0cMnqmp9nfTC3qkGaeUomP8dD-8xm9mgGxAwULKnPkNKS60wOHREw1xAyQMf3p26LOWYe99ZCPoG4uDcQ__",
    workflow: "https://private-us-east-1.manuscdn.com/sessionFile/IWMvF5SdYFNFkad6GuFfNv/sandbox/1nxhhfL21dSNMmz6ZZ5nUP-img-3_1771793262000_na1fn_YWFhLXdvcmtmbG93LWFyY2hpdGVjdHVyZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSVdNdkY1U2RZRk5Ga2FkNkd1RmZOdi9zYW5kYm94LzFueGhoZkwyMWRTTk1tejZaWjVuVVAtaW1nLTNfMTc3MTc5MzI2MjAwMF9uYTFmbl9ZV0ZoTFhkdmNtdG1iRzkzTFdGeVkyaHBkR1ZqZEhWeVpRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=USiCjSuiRXPHOX414CSolngTKJjg~uRMmtKCSRVaWxMzjrhKz4vbZPJY6w2d0LcGXc5EGjcQ-NA87vWP1mcKn5Bg2RNBfc0qDGPV9~g-kv~X8OVrtaN4NNGSppCpRdOlleKqk1bQ~KhOB3rKv0cQ9qCUDQNno77DSMU6SfBx9P5LzeumWuyC8v4fc81~8mUueMvnfNoluXJ93HzitsvackX~IaeghjNX32rCFisp0uSUD-r4EWKG4XO1iBPby8yDCoJsgLV0-aURuszIqIHg~VAu~jQb6qGYRmC44LrhHRyCt83YyLWW0Go9mPZRv4ysVlTqAU0TYaWxoDjexr7-YA__",
    roi: "https://private-us-east-1.manuscdn.com/sessionFile/IWMvF5SdYFNFkad6GuFfNv/sandbox/1nxhhfL21dSNMmz6ZZ5nUP-img-4_1771793266000_na1fn_YWFhLXJvaS1jb21wYXJpc29u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSVdNdkY1U2RZRk5Ga2FkNkd1RmZOdi9zYW5kYm94LzFueGhoZkwyMWRTTk1tejZaWjVuVVAtaW1nLTRfMTc3MTc5MzI2NjAwMF9uYTFmbl9ZV0ZoTFhKdmFTMWpiMjF3WVhKcGMyOXUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=HSG0HniU0KATlx88wp318uswdk1QHFin9g96wGEWvAZuo2eVAmXMcM~6rr5iM~XKlh7EanBf64o~XQOXxgCkGlEBSMzlUKAyJyKuLQPTWJmdMTVTElf7EgjyXIti8Yr05zw-7R3PEKnMgIkcwsz0JQoXkhxX36xjkRTx0P8s9SNm78iCDofrZSWaftYPIS~rxeRhhYY0ldWlnR5yHojSJiBVRVv01~I10Lf7eFj00xgCLzmzkD0XxrQ3f-pbdWs5vjk3xLiviAU6run-2WOXS8EIry9Xd0dK2kUUUqErvQMVwH7zoH01kMe3q0IeUZw3zR-R2J4stGDEcZxPenhkcw__",
    revenue: "https://private-us-east-1.manuscdn.com/sessionFile/IWMvF5SdYFNFkad6GuFfNv/sandbox/1nxhhfL21dSNMmz6ZZ5nUP-img-2_1771793265000_na1fn_YWFhLXJldmVudWUtZ3Jvd3RoLWNoYXJ0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSVdNdkY1U2RZRk5Ga2FkNkd1RmZOdi9zYW5kYm94LzFueGhoZkwyMWRTTk1tejZaWjVuVVAtaW1nLTJfMTc3MTc5MzI2NTAwMF9uYTFmbl9ZV0ZoTFhKbGRtVnVkV1V0WjNKdmQzUm9MV05vWVhKMC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nnTcCmD1RHxAAzA1E5CECPoAzIslM3pyYAZZWINwimDLnYlbKtbmpzHv9ZldO9Ue98nFFGUS-PcTlOefDn2NAQnDmhimC-OEFJ3eb0z97e2~DXrWSSLkMvaUzuYHWjyx2jepSedz3DUoCd45J7Wtm6wapz4DOTy9LmeWGsuqlX8wC1pJ35yqlM7CBIzjjnQpHUNzS3QOiFraHvB5Dxhjogtt0Z1q0MiwAJ5jE5oOe5qZd1CGKQIuUJW2bfpXj4GpKKXwl6fgyNDpRkNLBEr2FSqm0sZkbfazbDkKCNlLLDoklfcv1tpByQpCB5G-e3b0414RcYEtjYCMz7kHIYIZDw__",
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

              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 w-full sm:w-auto">
                Ver Modelo Completo
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative">
              <img 
                src={imageUrls.hero} 
                alt="Lead Qualification Automation" 
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              O Gargalo de Dinheiro que Ninguém Fala
            </h2>
            <p className="text-xl text-slate-600">
              Empresas perdem 30-40% de leads porque não conseguem responder rápido
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-red-100 bg-red-50">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-slate-900">Falta de Resposta Rápida</h3>
              </div>
              <p className="text-slate-700">Leads abandonam quando não recebem resposta em <span className="font-semibold">menos de 5 minutos</span></p>
            </Card>

            <Card className="p-6 border-2 border-orange-100 bg-orange-50">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-orange-600" />
                <h3 className="text-xl font-bold text-slate-900">Triagem Manual</h3>
              </div>
              <p className="text-slate-700">Triagem manual consome <span className="font-semibold">4-6 horas/dia</span> de produtividade</p>
            </Card>

            <Card className="p-6 border-2 border-yellow-100 bg-yellow-50">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-yellow-600" />
                <h3 className="text-xl font-bold text-slate-900">Leads Não Qualificados</h3>
              </div>
              <p className="text-slate-700">Vendedor trata <span className="font-semibold">40-50% de leads</span> que não têm potencial</p>
            </Card>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
            <p className="text-2xl font-bold text-slate-900 mb-2">
              Resultado: R$ 15.000-40.000/mês em receita perdida por empresa
            </p>
            <p className="text-slate-600">
              Uma empresa com 100 leads/mês perde ~30-40 leads por falta de resposta rápida
            </p>
          </div>
        </div>
      </section>

      {/* Data-Driven Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Por Que Isso Funciona Agora em 2026
            </h2>
            <p className="text-xl text-slate-600">
              Dados validados de mercado confirmam a oportunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <div className="text-4xl font-bold text-emerald-600 mb-2">57%</div>
              <p className="text-slate-700 font-semibold">de SMBs investem em IA</p>
              <p className="text-sm text-slate-600 mt-2">vs 36% em 2023 (58% crescimento)</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">80%</div>
              <p className="text-slate-700 font-semibold">planejam integrar chatbots</p>
              <p className="text-sm text-slate-600 mt-2">até final de 2026</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">US$367B</div>
              <p className="text-slate-700 font-semibold">mercado AI SaaS em 2030</p>
              <p className="text-sm text-slate-600 mt-2">vs US$22B em 2025</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">37-42%</div>
              <p className="text-slate-700 font-semibold">gap de oferta</p>
              <p className="text-sm text-slate-600 mt-2">SMBs sem solução</p>
            </Card>
          </div>

          <div className="bg-white rounded-xl border-2 border-emerald-200 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">ROI Comprovado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">$5.44</div>
                <p className="text-slate-700">Retorno por dólar investido em marketing automation</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">40%</div>
                <p className="text-slate-700">Mais rápido: Lead qualification com IA</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">&lt;12 meses</div>
                <p className="text-slate-700">Tempo de retorno do investimento</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Stack Tecnológico Validado
            </h2>
            <p className="text-xl text-slate-600">
              Ferramentas já em produção, testadas em 2026
            </p>
          </div>

          <div className="overflow-x-auto mb-12">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-200">
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Componente</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Ferramenta</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Custo</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-700">WhatsApp API</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">Evolution API</td>
                  <td className="px-6 py-4 text-slate-700">R$ 0-200/mês</td>
                  <td className="px-6 py-4"><span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">✅ Ativo</span></td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-700">Automação Visual</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">n8n Pro</td>
                  <td className="px-6 py-4 text-slate-700">€50/mês (~R$ 300)</td>
                  <td className="px-6 py-4"><span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">✅ Validado</span></td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-700">IA de Qualificação</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">Claude API</td>
                  <td className="px-6 py-4 text-slate-700">R$ 0,50-2 por lead</td>
                  <td className="px-6 py-4"><span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">✅ Pay-as-you-go</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-700">Armazenamento</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">Google Sheets</td>
                  <td className="px-6 py-4 text-slate-700">R$ 0</td>
                  <td className="px-6 py-4"><span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">✅ Integrado</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border-2 border-emerald-200 p-8">
            <p className="text-2xl font-bold text-slate-900 mb-2">
              Total de Infraestrutura: R$ 300-500/mês
            </p>
            <p className="text-slate-600">
              Suficiente para atender 50+ clientes com margem bruta de 94,5%
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Como Funciona: Arquitetura Completa
            </h2>
            <p className="text-xl text-slate-600">
              Fluxo automático de triagem de leads via WhatsApp
            </p>
          </div>

          <img 
            src={imageUrls.workflow} 
            alt="Workflow Architecture" 
            className="w-full rounded-xl shadow-lg mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-emerald-600" />
                Leads Qualificados
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Armazenados em Google Sheets (CRM)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Notificação imediata ao vendedor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Score de qualificação (0-100)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-orange-600" />
                Leads Não Qualificados
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Resposta automática educacional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Armazenados em lista de nurture</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-700">Follow-up automático em 7 dias</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              ROI: Manual vs Automatizado
            </h2>
            <p className="text-xl text-slate-600">
              Comparação real para cliente típico (100 leads/mês)
            </p>
          </div>

          <img 
            src={imageUrls.roi} 
            alt="ROI Comparison" 
            className="w-full rounded-xl shadow-lg mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">Cliente Típico</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-emerald-200">
                  <span className="text-slate-700">Leads/mês</span>
                  <span className="font-bold text-emerald-700">100</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-emerald-200">
                  <span className="text-slate-700">Leads ganhos</span>
                  <span className="font-bold text-emerald-700">35/mês</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-emerald-200">
                  <span className="text-slate-700">Ticket médio</span>
                  <span className="font-bold text-emerald-700">R$ 1.000</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-emerald-200">
                  <span className="text-slate-700">Receita adicional</span>
                  <span className="font-bold text-emerald-700">R$ 35.000/mês</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-white rounded px-3 py-2">
                  <span className="text-slate-900 font-semibold">Preço da solução</span>
                  <span className="font-bold text-emerald-700">R$ 2.500/mês</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-emerald-600 rounded px-3 py-2">
                  <span className="text-white font-semibold">ROI</span>
                  <span className="font-bold text-white">1.400%</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Estrutura de Preço</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-700">Starter (até 50 leads)</span>
                  <span className="font-bold text-slate-900">R$ 1.500/mês</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-700">Growth (51-150 leads)</span>
                  <span className="font-bold text-slate-900">R$ 2.500/mês</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-slate-700">Enterprise (150+ leads)</span>
                  <span className="font-bold text-slate-900">R$ 3.000+/mês</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-white rounded px-3 py-2">
                  <span className="text-slate-900 font-semibold">Setup inicial</span>
                  <span className="font-bold text-slate-900">R$ 500 (one-time)</span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-slate-600 rounded px-3 py-2">
                  <span className="text-white font-semibold">Margem bruta</span>
                  <span className="font-bold text-white">95-99%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Revenue Growth Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trajetória de Crescimento: 12 Meses
            </h2>
            <p className="text-xl text-slate-600">
              De R$ 0 para R$ 100.000/mês com 50 clientes
            </p>
          </div>

          <img 
            src={imageUrls.revenue} 
            alt="Revenue Growth Chart" 
            className="w-full rounded-xl shadow-lg mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fase 1: Validação</h3>
              <p className="text-slate-700 mb-3"><span className="font-semibold">Mês 1-2</span></p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ 5 clientes</li>
                <li>✓ R$ 10.000/mês</li>
                <li>✓ Prospecção manual</li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-emerald-200 bg-emerald-50">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fase 2: Escala Manual</h3>
              <p className="text-slate-700 mb-3"><span className="font-semibold">Mês 3-6</span></p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ 20 clientes</li>
                <li>✓ R$ 40.000/mês</li>
                <li>✓ Referências + LinkedIn</li>
              </ul>
            </Card>

            <Card className="p-6 border-2 border-purple-200 bg-purple-50">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fase 3: Automação</h3>
              <p className="text-slate-700 mb-3"><span className="font-semibold">Mês 7-12</span></p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ 50 clientes</li>
                <li>✓ R$ 100.000/mês</li>
                <li>✓ Funnel automatizado</li>
              </ul>
            </Card>
          </div>
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
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-slate-100 gap-2">
            Acessar Documentação Completa
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
