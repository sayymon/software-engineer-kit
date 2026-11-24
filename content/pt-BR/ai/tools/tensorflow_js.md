---
id: tensorflow_js
tipo: ferramenta
nome: TensorFlow.js
tipos:
  - BIBLIOTECA
  - FRAMEWORK
empresa: "[[google|Google]]"
aliases:
  - TensorFlow.js
  - TensorFlowJS
  - tfjs
categorias:
  - "[[ml_framework|Framework de ML]]"
  - "[[inferencia_local|Inferência local]]"
funcionalidades:
  - "[[execucao_local|Execução local]]"
  - "[[fine_tuning|Fine-tuning]]"
  - "[[multimodal|Multimodal]]"
casosDeUso:
  - "[[aprendizado_de_ml|Aprendizado de ML]]"
  - "[[inferencia_privada_local|Inferência privada local]]"
  - "[[modelos_de_decisao_e_fine_tuning|Modelos de decisão e fine-tuning]]"
modelos: []
modeloContratacao:
  - open-source
precoUSD: 0
plataformas:
  - web
  - self-hosted
linguagens:
  - javascript
porte:
  - pessoa-fisica
  - pequena
  - media
  - grande
segmentos:
  - geral
restricoes:
  - performance limitada vs treino em Python/GPU dedicada
  - modelos grandes pesam no browser
  - gerenciamento manual de memoria de tensores (dispose)
dataVerificacao: 2026-11-20
fontePreco: https://www.tensorflow.org/js
precoMedio: 0
tags:
  - ferramenta
  - ia
  - machine-learning
  - deep-learning
  - tensorflow
  - javascript
  - tensores
  - web-ml
---
# TensorFlow.js

## 📋 Informações Básicas
- **Tipos:** Biblioteca, Framework de Machine Learning
- **Empresa/Fabricante:** [[google|Google]]
- **Website:** https://www.tensorflow.org/js
- **Categorias:** Framework de ML, Inferência local
- **Modelo de contratação:** open-source
- **Preço (USD):** Gratuito (open source, Apache 2.0)
- **Data de verificação:** 2026-11-20
- **Fonte do preço:** https://www.tensorflow.org/js
- **Nível de domínio (pessoal):** Básico

## 📝 Descrição

Biblioteca de Machine Learning do Google para rodar modelos diretamente no browser ou em Node.js. O nome vem do conceito central: tensores, estruturas de dados numéricas em formato de vetores multidimensionais (tabelas de números) que fluem (flow) através de operações matemáticas.

### Conceitos-Chave

**Tensores:** a unidade fundamental de dados no TensorFlow.js. São arrays multidimensionais de números organizados em tabelas. Podem ser escalares (0D), vetores (1D), matrizes (2D) ou tensores de dimensões superiores (3D+). Toda entrada de dados precisa ser convertida para tensores antes de ser processada.

**One-Hot Encoding:** padrão usado para variáveis categóricas onde só existe uma opção válida entre várias. Cada categoria vira uma coluna binária (0 ou 1). Ex: cor do carro [vermelho, azul, preto] vira `[1, 0, 0]` para vermelho. Sempre valores exatos de 0 e 1, sem decimais.

**Normalização:** para variáveis contínuas (numéricas), os valores são escalados para o intervalo entre 0 e 1, podendo assumir valores decimais. Ex: idade de 33 anos num range de 0-100 vira `0.33`. Isso garante que features com magnitudes diferentes não distorçam o treinamento: idade (0-100) e salário (0-100.000) precisam estar na mesma escala para o modelo aprender corretamente.

### Construção de Modelo (API Prática)

**Modelo Sequencial (`tf.sequential`):** modelo onde as camadas são empilhadas linearmente, uma após a outra. Cada camada tem exatamente uma entrada e uma saída.

**Camadas Densas (`tf.layers.dense`):** camada totalmente conectada onde cada neurônio recebe entrada de todos os neurônios da camada anterior.
- `inputShape` define o formato dos dados de entrada (ex: `[7]` para 7 features)
- `units` quantidade de neurônios na camada
- `activation` função de ativação aplicada na saída dos neurônios

**Funções de Ativação:**
- **ReLU (Rectified Linear Unit):** introduz não-linearidade, permitindo que a rede aprenda padrões complexos. Retorna 0 para valores negativos e o próprio valor para positivos. Usada nas camadas ocultas.
- **Softmax:** converte as saídas da rede em probabilidades que somam 1. Usada na camada de saída para classificação multi-classe. Ex: `[0.85, 0.10, 0.05]` vira 85% premium, 10% medium, 5% basic.

### Compilação (`model.compile`)

Configura como o modelo vai aprender:
- **Otimizador `adam`:** algoritmo de otimização adaptativo que ajusta os pesos da rede de forma eficiente. Combina as vantagens do AdaGrad e RMSProp.
- **Função de perda `categoricalCrossentropy`:** mede o quão errada está a previsão em problemas de classificação multi-classe com labels em one-hot encoding. Quanto menor, melhor.
- **Métrica `accuracy`:** percentual de previsões corretas durante o treinamento. Serve para monitorar o desempenho.

### Treinamento (`model.fit`)

Função que efetivamente inicia o treinamento do modelo:
- `epochs` número de vezes que o modelo passa por todo o dataset (ex: 100 épocas)
- `shuffle: true` embaralha os dados a cada época para evitar que o modelo memorize a ordem
- `verbose: 0` desativa logs automáticos do progresso
- `callbacks.onEpochEnd` função executada ao final de cada época, útil para logar loss e accuracy

### Predição (`model.predict`)

Após treinado, o modelo recebe novos dados (como tensor) e retorna as probabilidades de cada classe. O `prediction.array()` converte o tensor de saída em array JavaScript para manipulação.

### Gerenciamento de Memória

Tensores ocupam memória GPU/CPU. Usar `tensor.dispose()` libera a memória manualmente quando os tensores não são mais necessários.

## 🎯 Para Que Serve
Treinar e rodar modelos de Machine Learning em JavaScript, no browser ou em Node.js, aproveitando dados e interação do lado do cliente.

### Casos de Uso
1. ML no browser (classificação, visão por webcam)
2. Transfer learning com modelos pré-treinados
3. Inferência local sem enviar dados para servidor
4. Aprendizado prático de ML em JavaScript

## ⏰ Quando Utilizar
- Quando o app é web e quer ML rodando no cliente
- Quando quer inferência local (dados não saem do browser)
- Quando o time domina JavaScript e quer ML sem Python
- Para aprender fundamentos de redes neurais na prática

### Quando NÃO utilizar
- Quando precisa treinar modelos grandes com GPU dedicada (prefira TensorFlow/PyTorch em Python)
- Quando o modelo é pesado demais para o browser
- Quando já existe pipeline de ML em Python consolidado

## 🧩 Categorias e Funcionalidades
- **Categorias:** [[ml_framework|Framework de ML]], [[inferencia_local|Inferência local]]
- **Funcionalidades:** [[execucao_local|Execução local]], [[fine_tuning|Fine-tuning]], [[multimodal|Multimodal]]
- **Casos de uso mapeados:** [[aprendizado_de_ml|Aprendizado de ML]], [[inferencia_privada_local|Inferência privada local]]
Notas atômicas e legendas em [[hub_ai_tools|Mapa de Ferramentas de IA]].

## 🖥️ Compatibilidade e Plataformas
- **Plataformas:** javascript, web (browser), self-hosted (Node.js)
- **Integra com:** navegador (WebGL/WebGPU), Node.js (`@tensorflow/tfjs-node`), Teachable Machine
- **Requisitos:** JavaScript; para treino pesado, GPU via backend Node

## 🔒 Restrições e Especificações
- **Context window / limites:** não aplicável; limitado por memória do browser/CPU/GPU.
- **Residência de dados / privacidade:** inferência local mantém dados no cliente.
- **Offline:** sim (modelo carregado roda offline).
- **ToS / licença:** Apache 2.0.
- **Outras restrições:** performance inferior a treino em Python/GPU; gerenciamento manual de memória de tensores.

## 🔧 Como Utilizar

### Instalação
```bash
npm install @tensorflow/tfjs-node
```

### Exemplo Prático Completo

Projeto de classificação de pessoas em categorias (premium, medium, basic) baseado em idade, cor preferida e localização:

```javascript
import tf from '@tensorflow/tfjs-node';

// Modelo sequencial com 2 camadas
const model = tf.sequential()
model.add(tf.layers.dense({ inputShape: [7], units: 80, activation: 'relu' }))
model.add(tf.layers.dense({ units: 3, activation: 'softmax' }))

// Compilação
model.compile({
  optimizer: 'adam',
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
})

// Dados normalizados + one-hot encoded
// [idade_norm, azul, vermelho, verde, SP, Rio, Curitiba]
const inputXs = tf.tensor2d([
  [0.33, 1, 0, 0, 1, 0, 0], // Erick
  [0, 0, 1, 0, 0, 1, 0],    // Ana
  [1, 0, 0, 1, 0, 0, 1]     // Carlos
])

// Labels one-hot: [premium, medium, basic]
const outputYs = tf.tensor2d([
  [1, 0, 0], // premium
  [0, 1, 0], // medium
  [0, 0, 1]  // basic
])

// Treinamento com 100 épocas
await model.fit(inputXs, outputYs, {
  epochs: 100,
  shuffle: true,
  callbacks: {
    onEpochEnd: (epoch, logs) => {
      console.log(`Epoch ${epoch + 1}: loss=${logs.loss.toFixed(4)}, acc=${logs.acc.toFixed(4)}`)
    }
  }
})

// Predição para nova pessoa
const novaPessoa = tf.tensor2d([[0.47, 1, 0, 0, 1, 0, 0]])
const prediction = model.predict(novaPessoa)
const resultado = await prediction.array() // Converte tensor em array JS
```

## 🆚 Alternativas
- [[pytorch|PyTorch]] - padrão para treino em Python
- TensorFlow (Python) - versão principal, treino pesado
- Teachable Machine - treino no-code no browser
- ONNX Runtime Web - inferência de modelos ONNX no browser

### Vantagens sobre alternativas
- Roda no browser sem backend
- JavaScript puro, sem Python
- Inferência local e privada
- Ótimo para aprender fundamentos de forma visual

### Desvantagens
- Performance inferior para treino pesado
- Modelos grandes pesam no browser
- Ecossistema de ML ainda centrado em Python

## 💰 Custo e Contratação

### Planos (USD)
- **Gratuito:** open source, Apache 2.0, sem custo
- **Fonte:** https://www.tensorflow.org/js (verificado em 2026-11-20)

## 🧩 Conceitos Relacionados
- Machine Learning - Framework para ML na web
- Deep Learning - Suporta redes neurais profundas no browser
- Redes Neurais - Arquitetura base dos modelos (camadas, neurônios, ativação)
- Transfer Learning - Reutilização de modelos pré-treinados
- Regressão Logística - Softmax é uma generalização multi-classe da regressão logística

## 🧠 Conhecimentos Necessários
- JavaScript - Linguagem base
- Matemática - Álgebra linear, tensores
- Machine Learning - Conceitos fundamentais

## 🎓 Como Aprendi

### Fonte Principal
- **Tipo:** Pós-Graduação
- **Nome:** AI Engineer - Módulo 1: Fundamentos de IA e LLMs
- **Data:** 03/2026
- **Contexto:** Estudo de Web Machine Learning na pós da UNIPDS

### Fontes Complementares
- Practical Machine Learning in JavaScript (Gerard, C. - Apress, 2020)

## 🛠️ Aplicações Práticas

### Projeto 1: Classificação de Pessoas (Aula Prática)
Modelo sequencial treinado com `@tensorflow/tfjs-node` para classificar pessoas em categorias (premium, medium, basic) usando idade normalizada, cor e localização como features com one-hot encoding. Aplicou ReLU + Softmax, adam, categoricalCrossentropy e 100 épocas de treinamento.
- **Data:** 19/03/2026
- **Contexto:** Aula prática da pós AI Engineer - UNIPDS

### Projeto 2: Webcam Transfer Learning (Pac-Man)
Usa Deep Learning com TensorFlow.js para capturar movimentos pela câmera e controlar o Pac-Man via processamento de imagem em tempo real.
- Código: https://github.com/tensorflow/tfjs-examples/tree/master/webcam-transfer-learning

## 📚 Recursos

### Documentação
- TensorFlow.js - https://www.tensorflow.org/js
- Exemplos oficiais - https://github.com/tensorflow/tfjs-examples

## 📊 Nível de Domínio

### Iniciante
- [x] Entendo os conceitos básicos (tensores, normalização, categorização)
- [x] Consigo explicar para outros

### Básico
- [x] Construí modelo sequencial com camadas densas
- [x] Treinei modelo com fit (epochs, shuffle, callbacks)
- [x] Fiz predição com model.predict
- [x] Usei funções de ativação (ReLU, Softmax)
- [x] Compilei com adam + categoricalCrossentropy + accuracy

### Intermediário
- [ ] Aplico em projetos reais
- [ ] Resolvo problemas complexos

## 🔄 Evolução do Conhecimento

### 18/03/2026
- **Nível:** Iniciante
- **Contexto:** Aula teórica da pós AI Engineer
- **Aprendizado:** Conceitos de tensores, normalização, one-hot encoding

### 19/03/2026
- **Nível:** Básico
- **Contexto:** Aula prática da pós AI Engineer, projeto de classificação com `@tensorflow/tfjs-node`
- **Aprendizado:** Construção de modelo sequencial, camadas densas (ReLU/Softmax), compilação (adam, categoricalCrossentropy, accuracy), treinamento com fit (epochs, shuffle, callbacks) e predição com model.predict

## 🔗 Relacionamentos
- **Contexto:** Ferramentas
- **Área:** [[hub_ai|Inteligência Artificial]]
- **Empresa:** [[google|Google]]
- **Pré-requisitos:** JavaScript, Machine Learning
- **Alternativas:** [[pytorch|PyTorch]], Teachable Machine
- **Usado em:** AI Engineer
- **Mapa:** [[hub_ai_tools|Mapa de Ferramentas de IA]]
