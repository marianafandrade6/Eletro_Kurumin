const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'estoque.json');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Dados iniciais com fotos reais de alta qualidade
const SEED_DATA = {
  categorias: [
    { id_categoria: 1, nome: "Microcontroladores & Placas", icone: "cpu", descricao: "MCUs, placas de desenvolvimento e módulos de prototipagem" },
    { id_categoria: 2, nome: "Passivos & Discretos", icone: "zap", descricao: "Resistores, capacitores, indutores e componentes de precisão" },
    { id_categoria: 3, nome: "Circuitos Integrados (CIs)", icone: "layers", descricao: "Amplificadores, temporizadores, reguladores e chips lógicos" },
    { id_categoria: 4, nome: "Sensores & Módulos", icone: "radio", descricao: "Sensores de distância, temperatura, umidade, movimento e luz" },
    { id_categoria: 5, nome: "Semicondutores & Potência", icone: "shield", descricao: "Transistores MOSFET, BJT, diodos retificadores e tiristores" },
    { id_categoria: 6, nome: "Conectores & Prototipagem", icone: "link", descricao: "Jumpers, bornes, protoboards e barras de pinos" }
  ],
  usuarios: [
    { id_usuario: 1, nome: "Atendente Eletro Kurumin", cargo: "Vendas & Gestão de Catálogo" }
  ],
  componentes: [
    {
      id_componente: 1,
      nome: "ESP32 NodeMCU Wi-Fi + Bluetooth",
      categoria_nome: "Microcontroladores & Placas",
      descricao: "Módulo ESP-WROOM-32 com Wi-Fi 802.11 b/g/n e Bluetooth v4.2 BR/EDR e BLE. Ideal para projetos IoT, automação e robótica.",
      especificacoes: "30 pinos • Dual Core 240MHz • Tensão 3.3V/5V • Interface USB CP2102",
      preco: 38.50,
      quantidade_estoque: 24,
      estoque_minimo: 8,
      localizacao: "Gaveteiro A - Gaveta 01",
      id_categoria: 1,
      id_usuario: 1,
      destaque: true,
      tag: "Mais Vendido",
      imagem: "img/esp32.jpg"
    },
    {
      id_componente: 2,
      nome: "Placa Compatível Arduino Uno R3 + Cabo USB",
      categoria_nome: "Microcontroladores & Placas",
      descricao: "A placa clássica para iniciar em eletrônica e robótica. Totalmente compatível com a Arduino IDE e vasta biblioteca de sensores.",
      especificacoes: "ATmega328P • 14 pinos digitais • 6 entradas analógicas • Cristal 16MHz",
      preco: 42.90,
      quantidade_estoque: 18,
      estoque_minimo: 6,
      localizacao: "Gaveteiro A - Gaveta 02",
      id_categoria: 1,
      id_usuario: 1,
      destaque: true,
      tag: "Iniciante",
      imagem: "img/arduino.jpg"
    },
    {
      id_componente: 3,
      nome: "Kit Resistores 1/4W 10kΩ (Pacote com 50 un)",
      categoria_nome: "Passivos & Discretos",
      descricao: "Resistores de filme de carbono de alta precisão 5%, perfeitos para pull-up, pull-down e divisores de tensão.",
      especificacoes: "Potência 1/4W (0.25W) • Tolerância ±5% • Terminais axiais",
      preco: 7.50,
      quantidade_estoque: 80,
      estoque_minimo: 20,
      localizacao: "Gaveteiro B - Gaveta 04",
      id_categoria: 2,
      id_usuario: 1,
      destaque: false,
      tag: "Econômico",
      imagem: "img/resistor.png"
    },
    {
      id_componente: 4,
      nome: "Kit Capacitores Eletrolíticos 100uF 25V (10 un)",
      categoria_nome: "Passivos & Discretos",
      descricao: "Capacitores radiais para filtragem de fontes, desacoplamento e estabilização de alimentação em circuitos eletrônicos.",
      especificacoes: "100µF • Tensão máxima 25V • Temperatura até 105°C • Terminal Radial",
      preco: 4.90,
      quantidade_estoque: 65,
      estoque_minimo: 15,
      localizacao: "Gaveteiro B - Gaveta 08",
      id_categoria: 2,
      id_usuario: 1,
      destaque: false,
      tag: "",
      imagem: "img/capacitor.jpg"
    },
    {
      id_componente: 5,
      nome: "CI Temporizador NE555P Precision Timer (DIP-8)",
      categoria_nome: "Circuitos Integrados (CIs)",
      descricao: "O circuito integrado temporizador mais famoso do mundo. Gera pulsos de clock precisos e opera nos modos astável e monoestável.",
      especificacoes: "Encapsulamento DIP-8 • Alimentação 4.5V a 16V • Frequência até 500kHz",
      preco: 2.50,
      quantidade_estoque: 35,
      estoque_minimo: 12,
      localizacao: "Gaveteiro C - Gaveta 02",
      id_categoria: 3,
      id_usuario: 1,
      destaque: false,
      tag: "Clássico",
      imagem: "img/ne555.jpg"
    },
    {
      id_componente: 6,
      nome: "Sensor de Distância Ultrassônico HC-SR04",
      categoria_nome: "Sensores & Módulos",
      descricao: "Sensor de ultrassom de alta precisão para medição de distância sem contato, perfeito para robôs autônomos e radares.",
      especificacoes: "Faixa 2cm a 400cm • Precisão 3mm • Ângulo eficaz 15° • Tensão 5V DC",
      preco: 14.90,
      quantidade_estoque: 16,
      estoque_minimo: 8,
      localizacao: "Gaveteiro D - Gaveta 03",
      id_categoria: 4,
      id_usuario: 1,
      destaque: true,
      tag: "Popular",
      imagem: "img/sensor_distancia.jpg"
    },
    {
      id_componente: 7,
      nome: "Display OLED 0.96 Polegadas I2C 128x64 Azul",
      categoria_nome: "Sensores & Módulos",
      descricao: "Tela de alto contraste gráfico com excelente visibilidade sob luz ambiente. Comunicação simples por barramento I2C com apenas 4 pinos.",
      especificacoes: "Controlador SSD1306 • Resolução 128x64 pixels • Barramento I2C • Tensão 3.3V / 5V",
      preco: 24.90,
      quantidade_estoque: 12,
      estoque_minimo: 5,
      localizacao: "Gaveteiro D - Gaveta 01",
      id_categoria: 4,
      id_usuario: 1,
      destaque: true,
      tag: "Destaque",
      imagem: "img/oled.jpg"
    },
    {
      id_componente: 8,
      nome: "Kit Transistores NPN BC547B TO-92 (20 un)",
      categoria_nome: "Semicondutores & Potência",
      descricao: "Transistores bipolares NPN para chaveamento de relés, LEDs e amplificação de sinais em projetos de uso geral.",
      especificacoes: "Vce 45V • Ic 100mA • Ganho hFE 200 a 450 • Encapsulamento TO-92",
      preco: 5.80,
      quantidade_estoque: 28,
      estoque_minimo: 10,
      localizacao: "Gaveteiro C - Gaveta 05",
      id_categoria: 5,
      id_usuario: 1,
      destaque: false,
      tag: "",
      imagem: "img/transistor.jpg"
    },
    {
      id_componente: 9,
      nome: "Regulador de Tensão Positivo LM7805 5V 1.5A",
      categoria_nome: "Semicondutores & Potência",
      descricao: "Regulador linear com saída estável de 5V DC e proteção térmica contra sobrecarga interna.",
      especificacoes: "Saída 5V fixa • Corrente máx 1.5A • Encapsulamento TO-220 • Tensão entrada 7V a 25V",
      preco: 3.50,
      quantidade_estoque: 42,
      estoque_minimo: 12,
      localizacao: "Gaveteiro C - Gaveta 08",
      id_categoria: 5,
      id_usuario: 1,
      destaque: false,
      tag: "",
      imagem: "img/lm7805.png"
    },
    {
      id_componente: 10,
      nome: "Protoboard 830 Pontos com Linhas de Alimentação",
      categoria_nome: "Conectores & Prototipagem",
      descricao: "Matriz de contatos sem solda com base autoadesiva. Permite montar e testar circuitos eletrônicos com total facilidade.",
      especificacoes: "830 pontos • Compatível com fios 20-29 AWG • Barramentos laterais de energia",
      preco: 19.90,
      quantidade_estoque: 22,
      estoque_minimo: 6,
      localizacao: "Prateleira 1 - Caixa A",
      id_categoria: 6,
      id_usuario: 1,
      destaque: true,
      tag: "Essencial",
      imagem: "img/protoboard.png"
    },
    {
      id_componente: 11,
      nome: "Kit Jumpers Macho-Macho 65 Peças Flexíveis",
      categoria_nome: "Conectores & Prototipagem",
      descricao: "Cabos multicoloridos em diversos comprimentos para conexões rápidas entre protoboards, sensores e placas Arduino/ESP32.",
      especificacoes: "65 unidades • Conectores Macho-Macho prensados • Vários tamanhos flexíveis",
      preco: 12.50,
      quantidade_estoque: 30,
      estoque_minimo: 10,
      localizacao: "Prateleira 1 - Caixa B",
      id_categoria: 6,
      id_usuario: 1,
      destaque: false,
      tag: "Prático",
      imagem: "img/jumpers.jpg"
    },
    {
      id_componente: 12,
      nome: "Kit LEDs 5mm Alto Brilho Sortidos (50 un)",
      categoria_nome: "Passivos & Discretos",
      descricao: "Pacote com 50 LEDs de 5mm em 5 cores vibrantes (Vermelho, Verde, Amarelo, Azul e Branco).",
      especificacoes: "50 peças (10 de cada cor) • Diâmetro 5mm • Lente difusa",
      preco: 9.90,
      quantidade_estoque: 40,
      estoque_minimo: 15,
      localizacao: "Gaveteiro B - Gaveta 01",
      id_categoria: 2,
      id_usuario: 1,
      destaque: false,
      tag: "",
      imagem: "img/leds.jpg"
    }
  ],
  movimentacoes: [],
  pedidos: []
};

// Funções de Persistência
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readData() {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    saveData(SEED_DATA);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erro ao ler base de dados:', err);
    return JSON.parse(JSON.stringify(SEED_DATA));
  }
}

function saveData(data) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Inicializa arquivo atualizado
saveData(SEED_DATA);

// ==========================================
// ROTAS DA LOJA & API
// ==========================================

// Status da Loja
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    loja: 'Eletro Kurumin',
    versao: '2.0.0 (Loja com Fotos Reais)'
  });
});

// Listar categorias
app.get('/api/categorias', (req, res) => {
  const db = readData();
  res.json(db.categorias || []);
});

// Listar catálogo de componentes para clientes
app.get('/api/componentes', (req, res) => {
  const db = readData();
  const { categoria, busca, apenasEstoque } = req.query;

  let lista = (db.componentes || []).map(comp => {
    const cat = db.categorias.find(c => c.id_categoria === Number(comp.id_categoria));
    return {
      ...comp,
      categoria_nome: cat ? cat.nome : (comp.categoria_nome || 'Geral'),
      em_estoque: (Number(comp.quantidade_estoque) || 0) > 0
    };
  });

  if (categoria && categoria !== 'todos') {
    lista = lista.filter(c => c.id_categoria === Number(categoria));
  }

  if (busca) {
    const termo = busca.toLowerCase();
    lista = lista.filter(c =>
      c.nome.toLowerCase().includes(termo) ||
      (c.descricao && c.descricao.toLowerCase().includes(termo)) ||
      (c.especificacoes && c.especificacoes.toLowerCase().includes(termo))
    );
  }

  if (apenasEstoque === 'true') {
    lista = lista.filter(c => c.em_estoque);
  }

  res.json(lista);
});

// Buscar detalhe de um produto
app.get('/api/componentes/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = readData();
  const comp = db.componentes.find(c => c.id_componente === id);

  if (!comp) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }

  const cat = db.categorias.find(c => c.id_categoria === Number(comp.id_categoria));
  res.json({
    ...comp,
    categoria_nome: cat ? cat.nome : 'Geral',
    em_estoque: (Number(comp.quantidade_estoque) || 0) > 0
  });
});

// Checkout / Finalização de Compra pelo Cliente
app.post('/api/pedidos', (req, res) => {
  const { cliente, itens, formaPagamento } = req.body;

  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ erro: 'O carrinho está vazio.' });
  }

  if (!cliente || !cliente.nome) {
    return res.status(400).json({ erro: 'Nome do cliente é obrigatório.' });
  }

  const db = readData();
  let subtotal = 0;
  const itensProcessados = [];

  // Validar estoque disponível de cada item antes de processar
  for (const item of itens) {
    const comp = db.componentes.find(c => c.id_componente === Number(item.id_componente));
    if (!comp) {
      return res.status(400).json({ erro: `Componente "${item.nome || item.id_componente}" não encontrado no catálogo.` });
    }

    const qtdComprada = parseInt(item.quantidade, 10) || 1;
    if (comp.quantidade_estoque < qtdComprada) {
      return res.status(400).json({
        erro: `Estoque insuficiente para "${comp.nome}". Disponível no momento: ${comp.quantidade_estoque} un.`
      });
    }

    subtotal += (Number(comp.preco) || 0) * qtdComprada;
    itensProcessados.push({
      id_componente: comp.id_componente,
      nome: comp.nome,
      preco_unitario: comp.preco,
      quantidade: qtdComprada,
      subtotal: (Number(comp.preco) || 0) * qtdComprada,
      imagem: comp.imagem || ''
    });
  }

  // Desconto no Pix (5%)
  const desconto = formaPagamento === 'pix' ? subtotal * 0.05 : 0;
  const totalFinal = subtotal - desconto;

  // Gerar ID do Pedido
  const idPedido = (db.pedidos ? db.pedidos.length : 0) + 1001;
  const codigoPedido = `EK-${new Date().getFullYear()}-${idPedido}`;
  const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 16);

  // Deduzir estoque e registrar movimentação de saída para cada item
  for (const item of itensProcessados) {
    const comp = db.componentes.find(c => c.id_componente === item.id_componente);
    comp.quantidade_estoque -= item.quantidade;

    if (!db.movimentacoes) db.movimentacoes = [];
    const idMov = db.movimentacoes.length > 0
      ? Math.max(...db.movimentacoes.map(m => Number(m.id_movimentacao) || 0)) + 1
      : 1;

    db.movimentacoes.push({
      id_movimentacao: idMov,
      id_componente: comp.id_componente,
      id_usuario: 1,
      tipo: 'saida',
      quantidade: item.quantidade,
      data_movimentacao: dataHora,
      justificativa: `Venda Loja Online - Pedido #${codigoPedido} (${cliente.nome})`
    });
  }

  const novoPedido = {
    id_pedido: idPedido,
    codigo: codigoPedido,
    data: dataHora,
    cliente: {
      nome: cliente.nome,
      whatsapp: cliente.whatsapp || '',
      email: cliente.email || '',
      endereco: cliente.endereco || ''
    },
    formaPagamento: formaPagamento || 'pix',
    itens: itensProcessados,
    subtotal: parseFloat(subtotal.toFixed(2)),
    desconto: parseFloat(desconto.toFixed(2)),
    total: parseFloat(totalFinal.toFixed(2)),
    status: 'confirmado'
  };

  if (!db.pedidos) db.pedidos = [];
  db.pedidos.push(novoPedido);

  saveData(db);

  res.status(201).json({
    sucesso: true,
    mensagem: 'Pedido realizado com sucesso!',
    pedido: novoPedido
  });
});

// Resetar dados para o padrão de demonstração
app.post('/api/reset', (req, res) => {
  saveData(SEED_DATA);
  res.json({ mensagem: 'Catálogo restaurado com fotos de produtos.' });
});

// Servir frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicialização
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🛍️ Eletro Kurumin - Loja com Fotos Reais dos Produtos Ativa!`);
  console.log(`🌐 Acesse em: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
