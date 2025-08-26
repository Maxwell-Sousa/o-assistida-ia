import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { Ear, Eye, Heart, Volume2, Target, Zap } from "lucide-react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import AgentCard from "@/components/AgentCard";
import AgentInterface from "@/components/AgentInterface";
import logo from "@/assets/logo.png";

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
                <div className="h-24 w-24 mb-6 animate-fade-in rounded-2xl flex items-center justify-center">
                  <img src={logo} alt="Agentes da Inclusão" className="h-24 w-24 rounded-2xl" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Agentes da Inclusão
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  Quebrando barreiras digitais com inteligência artificial
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Transformamos textos complexos em conteúdo acessível para pessoas com TDAH, dislexia, 
                  deficiência auditiva, TEA e deficiência visual, promovendo verdadeira inclusão digital.
                </p>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-16 px-4 bg-card/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-4">
                A Realidade da Acessibilidade no Brasil
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Dados que demonstram a urgência de soluções inclusivas para conteúdo digital
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">45 milhões</div>
                  <p className="text-sm text-muted-foreground">Brasileiros com algum tipo de deficiência</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">17%</div>
                  <p className="text-sm text-muted-foreground">Da população com dislexia</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5%</div>
                  <p className="text-sm text-muted-foreground">Crianças e adolescentes com TDAH</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">2 milhões</div>
                  <p className="text-sm text-muted-foreground">Pessoas no espectro autista</p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem & Solution Section */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    O Desafio da Inclusão Digital
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      A maior parte do conteúdo digital não é adaptada para pessoas com diferentes 
                      necessidades cognitivas e sensoriais, criando barreiras desnecessárias ao acesso à informação.
                    </p>
                    <p>
                      Textos longos, formatações inadequadas e linguagem complexa excluem milhões 
                      de brasileiros da experiência digital completa.
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Nossa Solução Inteligente
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Utilizamos inteligência artificial avançada para adaptar automaticamente 
                      qualquer texto às necessidades específicas de cada grupo.
                    </p>
                    <p>
                      Cada agente é especializado em uma condição específica, garantindo 
                      adaptações precisas e eficazes baseadas em pesquisas científicas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="py-16 px-4 bg-card/50">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Tecnologia de Ponta para Inclusão
              </h2>
              <p className="text-muted-foreground mb-12 max-w-3xl mx-auto">
                Nossa plataforma combina inteligência artificial com conhecimento especializado 
                em acessibilidade para oferecer adaptações precisas e contextuais.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-card rounded-lg border border-border">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">IA Especializada</h3>
                  <p className="text-sm text-muted-foreground">
                    Modelos treinados especificamente para cada tipo de adaptação necessária
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Adaptação Precisa</h3>
                  <p className="text-sm text-muted-foreground">
                    Cada agente segue diretrizes científicas específicas para sua área de atuação
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Impacto Real</h3>
                  <p className="text-sm text-muted-foreground">
                    Desenvolvido com base em pesquisas e feedback de comunidades atendidas
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Escolha Seu Agente de Inclusão
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Cada agente é especializado em adaptar textos para necessidades específicas. 
                Selecione o que melhor atende às suas necessidades ou de quem você deseja ajudar.
              </p>
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

          {/* Impact Section */}
          <section className="mt-16 py-8 text-center bg-gradient-primary/5 rounded-2xl">
            <div className="max-w-4xl mx-auto px-4">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Transformando Vidas Através da Tecnologia
              </h3>
              <p className="text-muted-foreground mb-8">
                Cada adaptação que fazemos representa uma barreira a menos no acesso à informação
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center mx-auto">
                    <img src={logo} alt="Agentes da Inclusão" className="h-12 w-12 rounded-full" />
                  </div>
                  <h4 className="font-semibold text-foreground">Baseado em Ciência</h4>
                  <p className="text-sm text-muted-foreground">
                    Todas as adaptações seguem diretrizes científicas e melhores práticas de acessibilidade
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground">Inclusão Verdadeira</h4>
                  <p className="text-sm text-muted-foreground">
                    Desenvolvido com e para as comunidades que atendemos, garantindo relevância real
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Eye className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground">Acesso Universal</h4>
                  <p className="text-sm text-muted-foreground">
                    Interface intuitiva que respeita os princípios de design universal e acessibilidade
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;