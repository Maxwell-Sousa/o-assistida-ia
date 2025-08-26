import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Copy, Volume2, Download, RefreshCw, Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { processText } from "@/utils/textProcessors";

interface Agent {
  name: string;
  description: string;
  color: string;
}

interface AgentInterfaceProps {
  agent: Agent;
  onBack: () => void;
}

const AgentInterface = ({ agent, onBack }: AgentInterfaceProps) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [context, setContext] = useState("geral");
  const [medium, setMedium] = useState("web");
  const [keepFormatting, setKeepFormatting] = useState(true);
  const [audioSpeed, setAudioSpeed] = useState([1.0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const simulateProcessing = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Texto necessário",
        description: "Por favor, insira um texto para processar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simular tempo de processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Usar os processadores reais de texto
      const processingOptions = {
        context,
        medium,
        keepFormatting
      };
      
      const result = processText(agent.name, inputText, processingOptions);
      
      setOutputText(result);
      setIsProcessing(false);
      
      toast({
        title: "Processamento concluído!",
        description: `Texto adaptado pelo ${agent.name}.`,
      });
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar o texto. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window && outputText) {
      // Para o Narrador, removemos as instruções de áudio antes da síntese
      let textToSpeak = outputText;
      if (agent.name === 'Narrador') {
        textToSpeak = outputText
          .replace(/\[pausa[^\]]*\]/g, ' ')
          .replace(/\[ênfase\]/g, '')
          .replace(/\[fim ênfase\]/g, '')
          .replace(/\[destaque\]/g, '')
          .replace(/\[fim destaque\]/g, '')
          .replace(/\[lista\]/g, '')
          .replace(/\[item numerado\]/g, '');
      }
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'pt-BR';
      utterance.rate = audioSpeed[0];
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    toast({
      title: "Texto limpo",
      description: "Campos de texto foram limpos.",
    });
  };

  const resetToBalanced = () => {
    setContext("geral");
    setMedium("web");
    setKeepFormatting(true);
    setAudioSpeed([1.0]);
    toast({
      title: "Configurações redefinidas",
      description: "Voltando às configurações balanceadas.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            // Limpa o parâmetro de query ao voltar
            window.history.pushState({}, "", "/")
            onBack()
          }}
          aria-label="Voltar para lista de agentes"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${agent.color}`}>
            <div className="h-6 w-6 bg-primary-foreground rounded" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{agent.name}</h1>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>
        </div>
      </div>

      {/* Advanced Controls */}
      <Card className="shadow-card mb-6 min-h-[480px] md:min-h-0">
        <CardHeader>
          <CardTitle className="text-lg">Configurações Avançadas</CardTitle>
          <CardDescription>
            Personalize o processamento conforme suas necessidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Context Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="context">Contexto</Label>
              <Select value={context} onValueChange={setContext}>
                <SelectTrigger id="context">
                  <SelectValue placeholder="Selecione o contexto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="geral">Geral</SelectItem>
                  <SelectItem value="academico">Acadêmico</SelectItem>
                  <SelectItem value="corporativo">Corporativo</SelectItem>
                  <SelectItem value="educacional">Educacional</SelectItem>
                  <SelectItem value="jornalistico">Jornalístico</SelectItem>
                  <SelectItem value="literario">Literário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Medium Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="medium">Médio</Label>
              <Select value={medium} onValueChange={setMedium}>
                <SelectTrigger id="medium">
                  <SelectValue placeholder="Selecione o médio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="print">Impresso</SelectItem>
                  <SelectItem value="presentation">Apresentação</SelectItem>
                  <SelectItem value="social">Redes Sociais</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Keep Formatting Toggle */}
            <div className="space-y-2">
              <Label htmlFor="formatting">Manter formatação</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="formatting"
                  checked={keepFormatting}
                  onCheckedChange={setKeepFormatting}
                />
                <span className="text-sm text-muted-foreground">
                  {keepFormatting ? "Ativado" : "Desativado"}
                </span>
              </div>
            </div>

            {/* Reset Button */}
            <div className="space-y-2">
              <Label className="invisible">Reset</Label>
              <Button
                variant="outline"
                onClick={resetToBalanced}
                className="w-full gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Balanceado
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Controls - Only for Narrador */}
      {agent.name === "Narrador" && (
        <Card className="shadow-card mb-6 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <Volume2 className="h-5 w-5" />
              Controles de Áudio
            </CardTitle>
            <CardDescription>
              Ajuste a velocidade e controle a reprodução do áudio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="speed" className="min-w-[80px]">Velocidade:</Label>
              <div className="flex-1 px-3">
                <Slider
                  id="speed"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={audioSpeed}
                  onValueChange={setAudioSpeed}
                  className="w-full"
                />
              </div>
              <Badge variant="secondary" className="min-w-[50px] text-center">
                {audioSpeed[0]}x
              </Badge>
              <Button
                variant="outline"
                size="icon"
                onClick={isPlaying ? stopSpeech : speakText}
                disabled={!outputText}
                className="min-w-[40px]"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Texto Original
            </CardTitle>
            <CardDescription>
              Digite ou cole o texto que deseja adaptar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Cole seu texto aqui..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] resize-vertical"
              aria-label="Texto para processar"
            />
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {inputText.length} caracteres
              </Badge>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearText}
                  disabled={!inputText && !outputText}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Limpar
                </Button>
                
                <Button
                  onClick={simulateProcessing}
                  disabled={isProcessing || !inputText.trim()}
                  className="gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Adaptar Texto
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`p-1 rounded ${agent.color}`}>
                <div className="h-4 w-4 bg-primary-foreground rounded-sm" />
              </div>
              Texto Adaptado
            </CardTitle>
            <CardDescription>
              Resultado processado pelo {agent.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="min-h-[200px] p-4 border border-border rounded-lg bg-muted/30">
              {outputText ? (
                <div className="whitespace-pre-line text-sm leading-relaxed">
                  {outputText}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Resultado aparecerá aqui após o processamento
                </div>
              )}
            </div>
            
            {outputText && (
              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copiar
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isPlaying ? stopSpeech : speakText}
                  className="gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {isPlaying ? "Parar" : "Ouvir"}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Baixar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentInterface;