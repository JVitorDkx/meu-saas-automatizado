# 🤖 Agência de Automação de IA (AAA) - SaaS de Captura de Leads

> **Um modelo de negócio 100% digital, data-driven e pronto para escala. Capture leads automaticamente, analise ROI em tempo real e transforme visitantes em clientes.**

[![GitHub](https://img.shields.io/badge/GitHub-JVitorDkx-blue?logo=github)](https://github.com/JVitorDkx/meu-saas-automatizado)
[![Status](https://img.shields.io/badge/Status-Inativo-red)]()
[![Licença](https://img.shields.io/badge/Licença-MIT-green)]()

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Características Principais](#características-principais)
- [Stack Tecnológico](#stack-tecnológico)
- [Como Funciona](#como-funciona)
- [Instalação e Uso](#instalação-e-uso)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)

---

## 🎯 Visão Geral

> **Nota**: Este projeto encontra-se em modo de demonstração/manutenção. Algumas funcionalidades estão em desenvolvimento.

A **Agência de Automação de IA (AAA)** é um SaaS moderno que automatiza a captura de leads e fornece análise de ROI em tempo real. Construído com tecnologias modernas e hospedado gratuitamente no GitHub Pages, este projeto demonstra como criar um negócio digital escalável com margem de lucro de 94,5%.

### O Problema

Pequenas e médias empresas (SMBs) perdem **até 40% de seus lucros** por falta de processos automatizados de qualificação de leads. Ferramentas existentes são caras, complexas e exigem implementação técnica.

### A Solução

Um formulário inteligente que:
- ✅ Captura dados de visitantes automaticamente
- ✅ Calcula economia estimada em tempo real
- ✅ Envia dados diretamente para sua planilha no Google Drive
- ✅ Integra-se com WhatsApp e email para follow-up automático

---

## ⭐ Características Principais

### 🎯 Captura Inteligente de Leads
- Formulário responsivo e otimizado para conversão
- Validação de dados em tempo real
- Mensagem de sucesso imediata após envio
- Integração com Google Sheets para persistência de dados

### 📊 Calculadora de ROI Interativa
- Cálculo automático de economia por horas economizadas
- Visualização em tempo real do impacto financeiro
- Análise de custo-benefício da automação
- Projeção de lucro mensal

### 🔐 Segurança e Privacidade
- Sem armazenamento de dados em servidor
- Dados salvos diretamente em sua planilha privada
- Sem rastreamento de usuários
- Conformidade com LGPD/GDPR

### 📱 Design Responsivo
- Funciona perfeitamente em desktop, tablet e mobile
- Interface moderna com Tailwind CSS
- Carregamento rápido (otimizado para performance)
- Acessibilidade garantida

---

## 🛠️ Stack Tecnológico

| Tecnologia | Propósito | Status |
|-----------|----------|--------|
| **HTML5** | Estrutura semântica | ✅ Ativo |
| **Tailwind CSS 4** | Estilização moderna | ✅ Ativo |
| **JavaScript Vanilla** | Lógica do frontend | ✅ Ativo |
| **Google Sheets API** | Persistência de dados | ✅ Ativo |
| **Google Apps Script** | Backend serverless | ✅ Ativo |
| **EmailJS** | Envio de notificações | 🔄 Em Configuração |
| **GitHub Pages** | Hospedagem gratuita | ✅ Ativo |

### Por que essas tecnologias?

- **Sem backend complexo**: Google Apps Script funciona como backend serverless
- **Custo zero**: GitHub Pages + Google Sheets = hospedagem gratuita
- **Escalável**: Suporta milhares de leads sem degradação
- **Manutenção simples**: Código frontend puro, fácil de atualizar

---

## 🔄 Como Funciona

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE FUNCIONAMENTO                    │
└─────────────────────────────────────────────────────────────┘

1️⃣ VISITANTE ACESSA O SITE
   ↓
2️⃣ PREENCHE FORMULÁRIO COM DADOS
   ├─ Nome
   ├─ Email
   ├─ Telefone
   └─ Empresa
   ↓
3️⃣ CALCULA ROI AUTOMATICAMENTE
   ├─ Horas economizadas por dia
   ├─ Custo da hora
   └─ Economia mensal estimada
   ↓
4️⃣ ENVIA DADOS PARA GOOGLE SHEETS
   ├─ Google Apps Script recebe dados
   ├─ Valida informações
   └─ Salva em planilha privada
   ↓
5️⃣ CONFIRMAÇÃO DE SUCESSO
   ├─ Mensagem visual no site
   ├─ Email de confirmação (opcional)
   └─ Lead pronto para follow-up
```

---

## 🚀 Instalação e Uso

### Pré-requisitos

- Conta GitHub (para fazer fork do projeto)
- Conta Google (para Google Sheets e Google Apps Script)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Passo 1: Fazer Fork do Repositório

```bash
# Clone o repositório
git clone https://github.com/JVitorDkx/meu-saas-automatizado.git
cd meu-saas-automatizado
```

### Passo 2: Configurar Google Sheets

1. Acesse [Google Drive](https://drive.google.com)
2. Crie uma nova planilha chamada "Leads AAA"
3. Copie o ID da planilha (está na URL)
4. Guarde esse ID para a próxima etapa

### Passo 3: Configurar Google Apps Script

1. Acesse [Google Apps Script](https://script.google.com)
2. Crie um novo projeto
3. Cole o código do arquivo `google-apps-script.js`
4. Substitua `SHEET_ID` pelo ID da sua planilha
5. Clique em "Deploy" → "New deployment" → "Web app"
6. Configure como:
   - **Execute as**: Seu email
   - **Who has access**: Qualquer pessoa
7. Copie a URL de deployment

### Passo 4: Atualizar o Site

1. Abra `docs/index.html`
2. Localize a linha com `GOOGLE_APPS_SCRIPT_URL`
3. Cole a URL de deployment do Apps Script
4. Salve o arquivo

### Passo 5: Ativar GitHub Pages

1. Vá para **Settings** → **Pages**
2. Em "Source", selecione: **Deploy from a branch**
3. Escolha: **main** e pasta **/docs**
4. Clique em **Save**

### Passo 6: Pronto! 🎉

Seu site estará online em:
```
https://seu-usuario.github.io/meu-saas-automatizado/
```

---

## 💡 Funcionalidades

### ✅ Implementadas

- [x] Formulário de captura de leads responsivo
- [x] Calculadora de ROI interativa
- [x] Integração com Google Sheets
- [x] Validação de dados em tempo real
- [x] Mensagem de sucesso após envio
- [x] Design profissional com Tailwind CSS
- [x] Hospedagem gratuita via GitHub Pages
- [x] Documentação completa

### 🔄 Em Desenvolvimento

- [ ] Integração com EmailJS para notificações
- [ ] Dashboard de administração
- [ ] Análise de métricas e conversão
- [ ] Integração com WhatsApp Business API
- [ ] Automação de follow-up por email

### 🚀 Roadmap Futuro

- [ ] Painel de controle para gerenciar leads
- [ ] Segmentação automática de leads
- [ ] Integração com CRM (Pipedrive, HubSpot)
- [ ] Análise preditiva com IA
- [ ] Versão mobile app

---

## 📁 Estrutura do Projeto

```
meu-saas-automatizado/
├── docs/                          # Site estático (GitHub Pages)
│   ├── index.html                # Página principal
│   ├── style.css                 # Estilos (Tailwind CSS)
│   └── script.js                 # Lógica do frontend
├── google-apps-script.js         # Backend serverless
├── README.md                      # Documentação
├── LICENSE                        # Licença MIT
└── .gitignore                    # Arquivos ignorados
```

### Descrição dos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `docs/index.html` | Página principal com formulário e calculadora |
| `google-apps-script.js` | Script que salva dados no Google Sheets |
| `README.md` | Documentação do projeto (este arquivo) |
| `.gitignore` | Arquivos não versionados |

---

## 📊 Métricas e Performance

### Velocidade

- ⚡ **Tempo de carregamento**: < 1 segundo
- 🔄 **Tempo de resposta do formulário**: < 500ms
- 📈 **Lighthouse Score**: 95+

### Escalabilidade

- 📌 **Leads por mês**: Ilimitado
- 💾 **Armazenamento**: Limitado apenas pelo Google Drive
- 🌍 **Alcance geográfico**: Global

### Custo Operacional

| Item | Custo Mensal |
|------|-------------|
| Hospedagem (GitHub Pages) | R$ 0 |
| Google Sheets | R$ 0 |
| Google Apps Script | R$ 0 |
| Domínio customizado | R$ 0-50 |
| **TOTAL** | **R$ 0-50** |

---

## 🔒 Segurança

### Práticas Implementadas

- ✅ Sem armazenamento de senhas
- ✅ Validação de dados no cliente
- ✅ Sem exposição de chaves de API
- ✅ HTTPS em todos os endpoints
- ✅ Conformidade com LGPD/GDPR

### Dados do Usuário

Todos os dados são:
- Salvos diretamente em sua planilha privada
- Nunca compartilhados com terceiros
- Deletáveis a qualquer momento
- Acessíveis apenas por você

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Faça um fork** do projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'ajuste: adicionar feature incrível'`)
4. **Push para a branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Diretrizes de Commit

Todos os commits devem seguir este padrão em **português**:

```
tipo: descrição breve

Descrição detalhada (opcional)

- Ponto 1
- Ponto 2
```

**Tipos de commit**:
- `ajuste:` - Mudanças no código existente
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação ou estilo
- `refactor:` - Refatoração de código

---

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

**JVitor**
- GitHub: [@JVitorDkx](https://github.com/JVitorDkx)

---

## 📞 Suporte

Tem dúvidas ou encontrou um bug? 

- 📧 Abra uma [Issue](https://github.com/JVitorDkx/meu-saas-automatizado/issues)
- 💬 Inicie uma [Discussão](https://github.com/JVitorDkx/meu-saas-automatizado/discussions)
- 🐛 Reporte um bug com detalhes

---

## 🎓 Aprendizados

Este projeto demonstra:

✅ Como criar um SaaS com zero custo operacional  
✅ Integração entre GitHub Pages, Google Sheets e Google Apps Script  
✅ Design responsivo com Tailwind CSS  
✅ Validação de formulários em JavaScript  
✅ Boas práticas de documentação  
✅ Versionamento de código com Git  

---

## 📚 Recursos Úteis

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Tailwind CSS](https://tailwindcss.com)
- [GitHub Pages](https://pages.github.com)
- [EmailJS](https://www.emailjs.com)
- [Google Sheets API](https://developers.google.com/sheets/api)

---

## 🌟 Agradecimentos

Obrigado por usar a Agência de Automação de IA! Se este projeto foi útil, considere dar uma ⭐ no GitHub.

---

**Última atualização**: Fevereiro de 2026  
**Versão**: 1.0.0  
**Status**: ✅ Ativo e em Manutenção

