import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { Ear, Eye, Heart, Volume2, Target, Zap } from "lucide-react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import AgentCard from "@/components/AgentCard";
import AgentInterface from "@/components/AgentInterface";

const agents = [
  {
    name: "Agente TDAH",
    description: "Simplifica textos longos e complexos para torná-los mais diretos e fáceis de focar, beneficiando pessoas com Transtorno de Déficit de Atenção com Hiperatividade.",
    icon: Target,
    color: "bg-gradient-tdah",
  },
  {
    name: "Agente Surdo",
    description: "Converte textos em imagens com suporte à Libras ou linguagem visual acessível para a comunidade surda.",
    icon: Ear,
    color: "bg-gradient-surdo",
  },
  {
    name: "Agente Dislexia",
    description: "Adapta textos com fontes, espaçamentos e estrutura otimizados para facilitar a leitura de pessoas com dislexia.",
    icon: Eye,
    color: "bg-gradient-dislexia",
  },
  {
    name: "Agente TEA",
    description: "Oferece uma versão de texto com recursos específicos para o Transtorno do Espectro Autista, como linguagem objetiva, ícones e divisões visuais por tópicos.",
    icon: Heart,
    color: "bg-gradient-tea",
  },
  {
    name: "Narrador",
    description: "Converte textos em áudio com vozes naturais para pessoas com deficiência visual ou baixa visão.",
    icon: Volume2,
    color: "bg-gradient-narrador",
  },
];

const Index = () => {
  const location = useLocation();
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const agentFromQuery = params.get('agent')
    if (agentFromQuery) {
      const found = agents.find(a => a.name === agentFromQuery)
      if (found) setSelectedAgent(found as any)
    }
  }, [location.search])

  if (selectedAgent) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-gradient-gentle">
          <Header />
          <AgentInterface
            agent={selectedAgent}
            onBack={() => setSelectedAgent(null)}
          />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-gradient-gentle">
        <Header />
        
        <main className="container mx-auto px-4 py-8" role="main">
          {/* Hero Section */}
          <section className="text-center py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center mb-8">
                <img src="/Logo.png" alt="Logo Agentes da Inclusão" className="h-24 w-24 mb-6 animate-fade-in object-contain anim-float" />
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Agentes da Inclusão
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                  Quebrando barreiras digitais, texto por texto
                </p>
              </div>


            </div>
          </section>

          {/* Agents Grid */}
          <section 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto animate-slide-up"
            aria-label="Lista de agentes de inclusão disponíveis"
          >
            {agents.map((agent, index) => (
              <div
                key={agent.name}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AgentCard
                  name={agent.name}
                  description={agent.description}
                  icon={agent.icon}
                  color={agent.color}
                  onClick={() => setSelectedAgent(agent)}
                />
              </div>
            ))}
          </section>

          {/* Features Section */}
          <section className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Por que escolher os Agentes da Inclusão?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <img src="/Logo.png" alt="Logo Agentes da Inclusão" className="h-12 w-12 mx-auto object-contain" />
                <h4 className="font-semibold text-foreground">Inteligência Artificial</h4>
                <p className="text-sm text-muted-foreground">
                  Tecnologia avançada para adaptações precisas e contextuais.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground">Inclusão Real</h4>
                <p className="text-sm text-muted-foreground">
                  Desenvolvido com base em pesquisas e necessidades reais.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground">Fácil de Usar</h4>
                <p className="text-sm text-muted-foreground">
                  Interface intuitiva e acessível para todos os usuários.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;