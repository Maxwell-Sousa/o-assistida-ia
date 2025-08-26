// Processadores de texto para cada agente de inclusão

export interface ProcessingOptions {
  context: string;
  medium: string;
  keepFormatting: boolean;
}

/**
 * Agente TDAH - Simplifica textos para melhor foco e concentração
 */
export const processTDAH = (text: string, options: ProcessingOptions): string => {
  // Divide o texto em frases
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Simplifica cada frase
  const simplifiedSentences = sentences.map(sentence => {
    let simplified = sentence.trim();
    
    // Remove palavras desnecessárias comuns
    simplified = simplified.replace(/\b(que|muito|bastante|extremamente|realmente|praticamente)\b/gi, '');
    
    // Substitui construções complexas por simples
    simplified = simplified.replace(/\b(devido ao fato de que|em virtude de|tendo em vista que)\b/gi, 'porque');
    simplified = simplified.replace(/\b(com o objetivo de|a fim de|para que)\b/gi, 'para');
    simplified = simplified.replace(/\b(no entanto|contudo|entretanto)\b/gi, 'mas');
    
    // Remove espaços duplos
    simplified = simplified.replace(/\s+/g, ' ').trim();
    
    return simplified;
  });
  
  // Limita a 3 pontos principais se o texto for muito longo
  const mainPoints = simplifiedSentences.slice(0, 5);
  
  // Formata com bullet points para facilitar a leitura
  if (mainPoints.length > 1) {
    return mainPoints.map((point, index) => `• ${point}.`).join('\n\n');
  }
  
  return mainPoints[0] + '.';
};

/**
 * Agente Surdo - Adapta para linguagem visual e estrutura clara
 */
export const processSurdo = (text: string, options: ProcessingOptions): string => {
  let processed = text;
  
  // Adiciona quebras de linha para melhor visualização
  processed = processed.replace(/\. /g, '.\n\n');
  
  // Substitui expressões por equivalentes mais visuais
  processed = processed.replace(/\b(ouvir|escutar)\b/gi, 'ver/acompanhar');
  processed = processed.replace(/\b(som|áudio|música)\b/gi, 'conteúdo visual');
  processed = processed.replace(/\b(falar|dizer)\b/gi, 'comunicar');
  processed = processed.replace(/\b(telefone|ligação)\b/gi, 'mensagem/vídeo');
  
  // Estrutura em parágrafos claros
  const paragraphs = processed.split('\n\n').filter(p => p.trim().length > 0);
  
  return paragraphs.join('\n\n');
};

/**
 * Agente Dislexia - Otimiza para facilitar a leitura
 */
export const processDislexia = (text: string, options: ProcessingOptions): string => {
  let processed = text;
  
  // Quebra frases muito longas (mais de 15 palavras)
  const sentences = processed.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const optimizedSentences = sentences.map(sentence => {
    const words = sentence.trim().split(' ');
    
    if (words.length > 15) {
      // Quebra em frases menores
      const firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(' ');
      const secondHalf = words.slice(Math.ceil(words.length / 2)).join(' ');
      return firstHalf + '.\n' + secondHalf;
    }
    
    return sentence.trim();
  });
  
  // Junta as frases otimizadas
  processed = optimizedSentences.join('. ');
  
  // Adiciona espaçamento extra após pontos
  processed = processed.replace(/\. /g, '.\n\n');
  
  // Substitui palavras complexas por sinônimos mais simples
  const wordReplacements = {
    'utilizar': 'usar',
    'implementar': 'fazer',
    'desenvolver': 'criar',
    'estabelecer': 'criar',
    'demonstrar': 'mostrar',
    'realizar': 'fazer',
    'efetuar': 'fazer',
    'proporcionar': 'dar',
    'possibilitar': 'permitir',
    'verificar': 'ver',
    'identificar': 'encontrar'
  };
  
  Object.entries(wordReplacements).forEach(([complex, simple]) => {
    const regex = new RegExp(`\\b${complex}\\b`, 'gi');
    processed = processed.replace(regex, simple);
  });
  
  return processed;
};

/**
 * Agente TEA - Estrutura com linguagem literal e objetiva
 */
export const processTEA = (text: string, options: ProcessingOptions): string => {
  let processed = text;
  
  // Remove figuras de linguagem e expressões idiomáticas
  const idioms = {
    'quebrar o galho': 'ajudar',
    'dar uma mão': 'ajudar',
    'por volta de': 'aproximadamente',
    'mais ou menos': 'aproximadamente',
    'de vez em quando': 'às vezes',
    'um monte de': 'muitos',
    'um pouco': 'pouco',
    'super': 'muito',
    'mega': 'muito',
    'hiper': 'muito'
  };
  
  Object.entries(idioms).forEach(([idiom, literal]) => {
    const regex = new RegExp(idiom, 'gi');
    processed = processed.replace(regex, literal);
  });
  
  // Remove ambiguidades
  processed = processed.replace(/\b(talvez|possivelmente|provavelmente)\b/gi, '');
  processed = processed.replace(/\b(geralmente|normalmente|tipicamente)\b/gi, 'sempre');
  
  // Estrutura em tópicos numerados se necessário
  const sentences = processed.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length > 2) {
    return sentences.map((sentence, index) => {
      const trimmed = sentence.trim();
      if (index === 0) {
        return `RESUMO: ${trimmed}.`;
      }
      return `${index}. ${trimmed}.`;
    }).join('\n\n');
  }
  
  return processed;
};

/**
 * Narrador - Otimiza texto para narração em áudio
 */
export const processNarrador = (text: string, options: ProcessingOptions): string => {
  let processed = text;
  
  // Adiciona pausas naturais
  processed = processed.replace(/[,;]/g, ', [pausa curta]');
  processed = processed.replace(/[.!?]/g, '. [pausa]');
  processed = processed.replace(/:/g, ': [pausa média]');
  
  // Expande abreviações para facilitar a narração
  const abbreviations = {
    'etc': 'e outros',
    'ex': 'exemplo',
    'p/': 'para',
    'c/': 'com',
    'q/': 'que',
    'Prof': 'Professor',
    'Dr': 'Doutor',
    'Sr': 'Senhor',
    'Sra': 'Senhora',
    'R$': 'reais'
  };
  
  Object.entries(abbreviations).forEach(([abbr, full]) => {
    const regex = new RegExp(`\\b${abbr}\\.?\\b`, 'gi');
    processed = processed.replace(regex, full);
  });
  
  // Adiciona instruções de entonação para listas
  processed = processed.replace(/^[-•]\s*/gm, '[lista] ');
  processed = processed.replace(/^\d+\.\s*/gm, '[item numerado] ');
  
  // Marca ênfases
  processed = processed.replace(/\*\*(.*?)\*\*/g, '[ênfase] $1 [fim ênfase]');
  processed = processed.replace(/\*(.*?)\*/g, '[destaque] $1 [fim destaque]');
  
  return processed;
};

/**
 * Função principal que direciona para o processador correto
 */
export const processText = (
  agentName: string, 
  text: string, 
  options: ProcessingOptions
): string => {
  switch (agentName) {
    case 'Agente TDAH':
      return processTDAH(text, options);
    case 'Agente Surdo':
      return processSurdo(text, options);
    case 'Agente Dislexia':
      return processDislexia(text, options);
    case 'Agente TEA':
      return processTEA(text, options);
    case 'Narrador':
      return processNarrador(text, options);
    default:
      return text;
  }
};