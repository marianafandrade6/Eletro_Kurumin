/**
 * ELETRO KURUMIN - LOJA VIRTUAL COM FOTOS REAIS
 * Frontend Application Controller
 * Catálogo com fotos, Carrinho Interativo, Checkout com Pix/WhatsApp e Integração
 */

// ==========================================
// DADOS DE FALLBACK COM FOTOS
// ==========================================
const DEFAULT_SEED_DATA = {
  categorias: [
    { id_categoria: 1, nome: "Microcontroladores & Placas", icone: "cpu" },
    { id_categoria: 2, nome: "Passivos & Discretos", icone: "zap" },
    { id_categoria: 3, nome: "Circuitos Integrados (CIs)", icone: "layers" },
    { id_categoria: 4, nome: "Sensores & Módulos", icone: "radio" },
    { id_categoria: 5, nome: "Semicondutores & Potência", icone: "shield" },
    { id_categoria: 6, nome: "Conectores & Prototipagem", icone: "link" }
  ],
  componentes: [
    {
      id_componente: 1,
      nome: "ESP32 NodeMCU Wi-Fi + Bluetooth",
      categoria_nome: "Microcontroladores & Placas",
      descricao: "Módulo ESP-WROOM-32 com Wi-Fi 802.11 b/g/n e Bluetooth v4.2 BR/EDR e BLE. Ideal para projetos IoT, automação e robótica.",
      especificacoes: "30 pinos • Dual Core 240MHz • Tensão 3.3V/5V • USB CP2102",
      preco: 38.50,
      quantidade_estoque: 24,
      id_categoria: 1,
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
      id_categoria: 1,
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
      id_categoria: 2,
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
      id_categoria: 2,
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
      id_categoria: 3,
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
      id_categoria: 4,
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
      id_categoria: 4,
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
      id_categoria: 5,
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
      id_categoria: 5,
      tag: "",
      imagem: "img/lm7805.png"
    },
    {
      id_componente: 10,
      nome: "Protoboard 830 Pontos com Linhas de Alimentação",
      categoria_nome: "Conectores & Prototipagem",
      descricao: "Matriz de contatos sem solda com base autoadesiva. Permite montar e testar circuitos eletrônicos com total facilidade.",
      especificacoes: "830 pontos • Compatível com fios 20-29 AWG • Barramentos laterais",
      preco: 19.90,
      quantidade_estoque: 22,
      id_categoria: 6,
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
      id_categoria: 6,
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
      id_categoria: 2,
      tag: "",
      imagem: "img/leds.jpg"
    }
  ]
};

// ==========================================
// ESTADO DO CLIENTE
// ==========================================
const storeState = {
  isApiMode: false,
  produtos: [],
  carrinho: [],
  categoriaAtiva: 'todos',
  termoBusca: '',
  ordenacao: 'populares',
  formaPagamentoSelecionada: 'pix'
};

// ==========================================
// SERVIÇO DE DADOS
// ==========================================
const StoreService = {
  async init() {
    this.carregarCarrinhoSalvo();

    try {
      const res = await fetch('/api/status', { method: 'GET', signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        storeState.isApiMode = true;
        await this.carregarProdutosApi();
        return;
      }
    } catch (e) {
      // Abre direto do navegador local
    }

    storeState.isApiMode = false;
    this.carregarProdutosLocal();
  },

  carregarCarrinhoSalvo() {
    try {
      const saved = localStorage.getItem('kurumin_cart');
      if (saved) {
        storeState.carrinho = JSON.parse(saved);
      }
    } catch {
      storeState.carrinho = [];
    }
  },

  salvarCarrinho() {
    localStorage.setItem('kurumin_cart', JSON.stringify(storeState.carrinho));
  },

  async carregarProdutosApi() {
    try {
      const res = await fetch('/api/componentes');
      storeState.produtos = await res.json();
    } catch (err) {
      console.warn('Fallback para local:', err);
      this.carregarProdutosLocal();
    }
  },

  carregarProdutosLocal() {
    try {
      const data = JSON.parse(localStorage.getItem('kurumin_data'));
      if (data && data.componentes && data.componentes.length > 0) {
        storeState.produtos = data.componentes;
        return;
      }
    } catch { }
    storeState.produtos = DEFAULT_SEED_DATA.componentes;
  },

  async enviarPedido(pedidoPayload) {
    if (storeState.isApiMode) {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoPayload)
      });
      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro.erro || 'Erro ao processar o pedido.');
      }
      return await res.json();
    } else {
      const idPedido = Math.floor(1000 + Math.random() * 9000);
      const codigo = `EK-2026-${idPedido}`;

      pedidoPayload.itens.forEach(item => {
        const prod = storeState.produtos.find(p => p.id_componente === item.id_componente);
        if (prod) {
          prod.quantidade_estoque = Math.max(0, prod.quantidade_estoque - item.quantidade);
        }
      });

      return {
        sucesso: true,
        pedido: {
          id_pedido: idPedido,
          codigo: codigo,
          cliente: pedidoPayload.cliente,
          formaPagamento: pedidoPayload.formaPagamento,
          itens: pedidoPayload.itens,
          total: pedidoPayload.total
        }
      };
    }
  }
};

// ==========================================
// RENDERIZAÇÃO DA INTERFACE (CLEAN UI)
// ==========================================
const StoreUI = {
  formatCurrency(val) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
  },

  renderAll() {
    this.renderProducts();
    this.renderCart();
  },

  getComponentSvgIcon(idCategoria) {
    switch (Number(idCategoria)) {
      case 1:
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`;
      case 2:
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
      case 3:
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
      case 4:
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>`;
      case 5:
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      case 6:
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
      default:
        return `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
    }
  },

  getFilteredAndSortedProducts() {
    let prods = [...storeState.produtos];

    if (storeState.categoriaAtiva !== 'todos') {
      prods = prods.filter(p => Number(p.id_categoria) === Number(storeState.categoriaAtiva));
    }

    if (storeState.termoBusca) {
      const termo = storeState.termoBusca.toLowerCase();
      prods = prods.filter(p =>
        (p.nome && p.nome.toLowerCase().includes(termo)) ||
        (p.descricao && p.descricao.toLowerCase().includes(termo)) ||
        (p.especificacoes && p.especificacoes.toLowerCase().includes(termo)) ||
        (p.categoria_nome && p.categoria_nome.toLowerCase().includes(termo))
      );
    }

    if (storeState.ordenacao === 'menor-preco') {
      prods.sort((a, b) => Number(a.preco) - Number(b.preco));
    } else if (storeState.ordenacao === 'maior-preco') {
      prods.sort((a, b) => Number(b.preco) - Number(a.preco));
    } else if (storeState.ordenacao === 'nome') {
      prods.sort((a, b) => a.nome.localeCompare(b.nome));
    } else {
      prods.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
    }

    return prods;
  },

  renderProducts() {
    const grid = document.getElementById('products-grid');
    const countText = document.getElementById('catalog-count-text');
    const prods = this.getFilteredAndSortedProducts();

    countText.textContent = `(${prods.length} ${prods.length === 1 ? 'produto encontrado' : 'produtos encontrados'})`;

    if (prods.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: white; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Nenhum componente encontrado</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 400px; margin: 0 auto 1.25rem auto;">
            Não encontramos nenhum produto com o termo pesquisado. Tente buscar por outro componente ou limpe os filtros.
          </p>
          <button class="cat-pill-btn active" onclick="StoreApp.resetFilters()">Ver todos os produtos</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = prods.map(prod => {
      const preco = Number(prod.preco) || 0;
      const precoPix = preco * 0.95;
      const qtdEstoque = Number(prod.quantidade_estoque) || 0;

      let stockTagClass = 'in-stock';
      let stockTagLabel = 'Em Estoque';
      let isDisabled = false;

      if (qtdEstoque === 0) {
        stockTagClass = 'out-of-stock';
        stockTagLabel = 'Indisponível';
        isDisabled = true;
      } else if (qtdEstoque <= 5) {
        stockTagClass = 'low-stock';
        stockTagLabel = `Últimas ${qtdEstoque} un`;
      }

      return `
        <article class="product-card">
          <div class="product-card-top" onclick="StoreApp.openProductDetails(${prod.id_componente})" style="cursor: pointer;">
            ${prod.tag ? `<span class="product-badge-tag">${this.escapeHTML(prod.tag)}</span>` : ''}
            <span class="product-stock-tag ${stockTagClass}">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: currentColor;"></span>
              ${stockTagLabel}
            </span>
            <img 
              src="${this.escapeHTML(prod.imagem || 'img/arduino.jpg')}" 
              alt="${this.escapeHTML(prod.nome)}" 
              class="product-image"
              loading="lazy"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >
            <div class="component-visual-icon" style="display: none;">
              ${this.getComponentSvgIcon(prod.id_categoria)}
            </div>
          </div>

          <div class="product-card-body">
            <span class="product-category-name">${this.escapeHTML(prod.categoria_nome || 'Geral')}</span>
            <h3 class="product-title" onclick="StoreApp.openProductDetails(${prod.id_componente})">
              ${this.escapeHTML(prod.nome)}
            </h3>
            <div class="product-specs-pill" title="${this.escapeHTML(prod.especificacoes || prod.descricao)}">
              ${this.escapeHTML(prod.especificacoes || prod.descricao)}
            </div>

            <div class="product-card-footer">
              <div class="price-box">
                <span class="price-main">${this.formatCurrency(preco)}</span>
                <span class="price-pix-hint">${this.formatCurrency(precoPix)} no Pix</span>
              </div>
              <button 
                class="btn-add-cart" 
                ${isDisabled ? 'disabled' : ''} 
                onclick="StoreApp.addToCart(${prod.id_componente})"
                title="${isDisabled ? 'Produto fora de estoque' : 'Adicionar ao Carrinho'}"
              >
                ${isDisabled ? 'Esgotado' : `
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Comprar
                `}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  },

  renderCart() {
    const list = document.getElementById('cart-items-list');
    const headerCount = document.getElementById('header-cart-count');
    const drawerCount = document.getElementById('drawer-items-count');
    const subtotalText = document.getElementById('cart-subtotal-text');
    const discountText = document.getElementById('cart-discount-text');
    const totalText = document.getElementById('cart-total-text');
    const footer = document.getElementById('cart-drawer-footer');
    const shippingProgressFill = document.getElementById('shipping-progress-fill');
    const shippingProgressText = document.getElementById('shipping-progress-text');

    const totalItems = storeState.carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    headerCount.textContent = totalItems;
    drawerCount.textContent = `(${totalItems} ${totalItems === 1 ? 'item' : 'itens'})`;

    if (storeState.carrinho.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 3.5rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.8rem; margin-bottom: 0.75rem; opacity: 0.6;">🛒</div>
          <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Seu carrinho está vazio</h4>
          <p style="font-size: 0.82rem; margin-bottom: 1.25rem;">Nenhum componente eletrónico selecionado ainda.</p>
          <button class="cat-pill-btn active" onclick="StoreApp.closeCartDrawer()">Explorar Componentes</button>
        </div>
      `;
      footer.style.display = 'none';
      shippingProgressFill.style.width = '0%';
      shippingProgressText.innerHTML = `Adicione mais R$ 99,00 para ter <strong>Frete Grátis</strong>!`;
      return;
    }

    footer.style.display = 'block';

    const subtotal = storeState.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const descontoPix = subtotal * 0.05;
    const totalPix = subtotal - descontoPix;

    subtotalText.textContent = this.formatCurrency(subtotal);
    discountText.textContent = `- ${this.formatCurrency(descontoPix)}`;
    totalText.textContent = this.formatCurrency(totalPix);

    // Barra de Frete Grátis
    const FRETE_GRATIS_META = 99.00;
    if (subtotal >= FRETE_GRATIS_META) {
      shippingProgressFill.style.width = '100%';
      shippingProgressFill.style.background = '#059669';
      shippingProgressText.innerHTML = `🎉 Parabéns! Você ganhou <strong>Frete Grátis</strong>!`;
    } else {
      const falta = FRETE_GRATIS_META - subtotal;
      const pct = Math.min(100, Math.round((subtotal / FRETE_GRATIS_META) * 100));
      shippingProgressFill.style.width = `${pct}%`;
      shippingProgressFill.style.background = '#2563eb';
      shippingProgressText.innerHTML = `Faltam apenas <strong>${this.formatCurrency(falta)}</strong> para você ter <strong>Frete Grátis</strong>!`;
    }

    list.innerHTML = storeState.carrinho.map(item => `
      <div class="cart-item">
        <img 
          src="${this.escapeHTML(item.imagem || 'img/arduino.jpg')}" 
          alt="${this.escapeHTML(item.nome)}" 
          class="cart-item-img"
          onerror="this.src='img/arduino.jpg'"
        >
        <div class="cart-item-info">
          <div class="cart-item-title">${this.escapeHTML(item.nome)}</div>
          <div class="cart-item-price">${this.formatCurrency(item.preco)} cada</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="StoreApp.updateItemQty(${item.id_componente}, -1)">-</button>
          <span class="qty-display">${item.quantidade}</span>
          <button class="qty-btn" onclick="StoreApp.updateItemQty(${item.id_componente}, 1)">+</button>
          <button class="btn-remove-item" onclick="StoreApp.removeFromCart(${item.id_componente})" title="Remover item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    `).join('');
  },

  showToast(mensagem, tipo = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast`;

    let icon = '✓';
    if (tipo === 'warning') icon = '⚠️';
    if (tipo === 'info') icon = 'ℹ️';

    toast.innerHTML = `
      <span style="color: #38bdf8; font-weight: 700;">${icon}</span>
      <span>${this.escapeHTML(mensagem)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  },

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

// ==========================================
// CONTROLADOR DE EVENTOS DA LOJA
// ==========================================
const StoreApp = {
  async init() {
    this.setupListeners();
    await StoreService.init();
    StoreUI.renderAll();
  },

  setupListeners() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
      storeState.termoBusca = e.target.value.trim();
      StoreUI.renderProducts();
    });

    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        storeState.categoriaAtiva = btn.getAttribute('data-category');
        StoreUI.renderProducts();
      });
    });

    document.getElementById('sort-select').addEventListener('change', (e) => {
      storeState.ordenacao = e.target.value;
      StoreUI.renderProducts();
    });

    document.getElementById('btn-open-cart').addEventListener('click', () => this.openCartDrawer());
    document.getElementById('btn-close-cart').addEventListener('click', () => this.closeCartDrawer());
    document.getElementById('cart-drawer-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'cart-drawer-overlay') this.closeCartDrawer();
    });

    document.getElementById('btn-proceed-checkout').addEventListener('click', () => this.openCheckoutModal());
    document.getElementById('btn-close-checkout').addEventListener('click', () => this.closeCheckoutModal());
    document.getElementById('btn-close-detail').addEventListener('click', () => this.closeDetailModal());

    document.querySelectorAll('.payment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.payment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        storeState.formaPagamentoSelecionada = btn.getAttribute('data-payment');
        this.updateCheckoutTotals();
      });
    });

    document.getElementById('form-checkout').addEventListener('submit', (e) => this.handleCheckoutSubmit(e));

    document.getElementById('link-open-admin-dialog').addEventListener('click', () => {
      alert("Acesso restrito ao lojista da Eletro Kurumin. Como desenvolvedor, você pode consultar o histórico de estoque e APIs através do arquivo README.md ou na rota /api/componentes.");
    });
  },

  resetFilters() {
    storeState.categoriaAtiva = 'todos';
    storeState.termoBusca = '';
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === 'todos');
    });
    StoreUI.renderProducts();
  },

  addToCart(idProduto) {
    const prod = storeState.produtos.find(p => p.id_componente === Number(idProduto));
    if (!prod) return;

    const estoqueDisponivel = Number(prod.quantidade_estoque) || 0;
    if (estoqueDisponivel <= 0) {
      StoreUI.showToast('Desculpe, este componente está esgotado no momento.', 'warning');
      return;
    }

    const itemExistente = storeState.carrinho.find(item => item.id_componente === prod.id_componente);

    if (itemExistente) {
      if (itemExistente.quantidade + 1 > estoqueDisponivel) {
        StoreUI.showToast(`Limite de estoque atingido (${estoqueDisponivel} un disponíveis).`, 'warning');
        return;
      }
      itemExistente.quantidade += 1;
    } else {
      storeState.carrinho.push({
        id_componente: prod.id_componente,
        nome: prod.nome,
        preco: Number(prod.preco) || 0,
        quantidade: 1,
        id_categoria: prod.id_categoria,
        imagem: prod.imagem || 'img/arduino.jpg'
      });
    }

    StoreService.salvarCarrinho();
    StoreUI.renderCart();
    StoreUI.showToast(`"${prod.nome}" adicionado ao carrinho!`);
  },

  updateItemQty(idProduto, delta) {
    const item = storeState.carrinho.find(i => i.id_componente === Number(idProduto));
    if (!item) return;

    const prod = storeState.produtos.find(p => p.id_componente === Number(idProduto));
    const estoqueDisponivel = prod ? Number(prod.quantidade_estoque) : 999;

    const novaQtd = item.quantidade + delta;

    if (novaQtd <= 0) {
      this.removeFromCart(idProduto);
      return;
    }

    if (novaQtd > estoqueDisponivel) {
      StoreUI.showToast(`Apenas ${estoqueDisponivel} un disponíveis em estoque.`, 'warning');
      return;
    }

    item.quantidade = novaQtd;
    StoreService.salvarCarrinho();
    StoreUI.renderCart();
  },

  removeFromCart(idProduto) {
    storeState.carrinho = storeState.carrinho.filter(i => i.id_componente !== Number(idProduto));
    StoreService.salvarCarrinho();
    StoreUI.renderCart();
    StoreUI.showToast('Item removido do carrinho.', 'info');
  },

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer-overlay');
    drawer.classList.add('open');
  },

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer-overlay');
    drawer.classList.remove('open');
  },

  openCheckoutModal() {
    if (storeState.carrinho.length === 0) {
      StoreUI.showToast('Seu carrinho está vazio!', 'warning');
      return;
    }
    this.closeCartDrawer();
    this.updateCheckoutTotals();
    const modal = document.getElementById('checkout-modal');
    modal.classList.add('open');
  },

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('open');
  },

  updateCheckoutTotals() {
    const subtotal = storeState.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const isPix = storeState.formaPagamentoSelecionada === 'pix';
    const desconto = isPix ? subtotal * 0.05 : 0;
    const total = subtotal - desconto;

    document.getElementById('modal-subtotal-val').textContent = StoreUI.formatCurrency(subtotal);
    const pixLine = document.getElementById('modal-pix-line');

    if (isPix) {
      pixLine.style.display = 'flex';
      document.getElementById('modal-discount-val').textContent = `- ${StoreUI.formatCurrency(desconto)}`;
    } else {
      pixLine.style.display = 'none';
    }

    document.getElementById('modal-total-val').textContent = StoreUI.formatCurrency(total);
  },

  async handleCheckoutSubmit(e) {
    e.preventDefault();

    const nome = document.getElementById('client-name').value.trim();
    const whatsapp = document.getElementById('client-whatsapp').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const endereco = document.getElementById('client-address').value.trim();

    if (!nome || !whatsapp || !endereco) {
      StoreUI.showToast('Preencha os campos obrigatórios.', 'warning');
      return;
    }

    const subtotal = storeState.carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const isPix = storeState.formaPagamentoSelecionada === 'pix';
    const desconto = isPix ? subtotal * 0.05 : 0;
    const totalFinal = subtotal - desconto;

    const payload = {
      cliente: { nome, whatsapp, email, endereco },
      formaPagamento: storeState.formaPagamentoSelecionada,
      itens: storeState.carrinho,
      subtotal,
      desconto,
      total: totalFinal
    };

    try {
      const resposta = await StoreService.enviarPedido(payload);
      const pedido = resposta.pedido;

      storeState.carrinho = [];
      StoreService.salvarCarrinho();
      StoreUI.renderCart();

      if (storeState.isApiMode) {
        await StoreService.carregarProdutosApi();
      }
      StoreUI.renderProducts();

      this.renderOrderSuccessScreen(pedido);

    } catch (err) {
      StoreUI.showToast(err.message, 'danger');
    }
  },

  renderOrderSuccessScreen(pedido) {
    const modalTitle = document.getElementById('checkout-modal-title');
    const modalBody = document.getElementById('checkout-modal-body');

    modalTitle.textContent = `Pedido Confirmado! 🎉`;

    const itensListText = pedido.itens.map(i => `• ${i.quantidade}x ${i.nome} (${StoreUI.formatCurrency(i.preco_unitario || i.preco)})`).join('\n');

    const msgWhatsApp = encodeURIComponent(
      `Olá Eletro Kurumin! 👋\nAcabei de realizar o pedido *${pedido.codigo}* pelo site!\n\n` +
      `*Cliente:* ${pedido.cliente.nome}\n` +
      `*Telefone:* ${pedido.cliente.whatsapp}\n` +
      `*Entrega:* ${pedido.cliente.endereco}\n` +
      `*Pagamento:* ${pedido.formaPagamento.toUpperCase()}\n\n` +
      `*Itens:* \n${itensListText}\n\n` +
      `*Total Final:* ${StoreUI.formatCurrency(pedido.total)}\n\n` +
      `Poderiam confirmar o recebimento? Obrigado!`
    );

    const pixSimulado = `00020126580014BR.GOV.BCB.PIX0136eletrokurumin@pix.com.br520400005303986540${pedido.total.toFixed(2)}5802BR5914Eletro Kurumin6009Sao Paulo62070503***6304`;

    modalBody.innerHTML = `
      <div class="success-screen">
        <div class="success-icon-wrap">✓</div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">
          Obrigado, ${StoreUI.escapeHTML(pedido.cliente.nome.split(' ')[0])}!
        </h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
          Seu pedido <strong>#${pedido.codigo}</strong> foi registrado com sucesso.
        </p>

        ${pedido.formaPagamento === 'pix' ? `
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-md); padding: 1rem; text-align: left; margin-bottom: 1rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #166534; margin-bottom: 0.3rem;">
              ⚡ Chave Pix Copia-e-Cola (Valor: ${StoreUI.formatCurrency(pedido.total)})
            </div>
            <div class="pix-copy-box">
              <span class="pix-code-text" id="pix-key-val">${pixSimulado}</span>
              <button class="cat-pill-btn active" style="padding: 0.3rem 0.75rem; font-size: 0.75rem;" onclick="StoreApp.copyPixKey()">Copiar Pix</button>
            </div>
            <p style="font-size: 0.72rem; color: #15803d;">
              O comprovante pode ser enviado diretamente pelo WhatsApp da loja para agilizar o envio.
            </p>
          </div>
        ` : `
          <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem; text-align: left;">
            <p style="font-size: 0.85rem; color: var(--text-main);">
              <strong>Forma de Pagamento:</strong> ${pedido.formaPagamento === 'cartao' ? 'Cartão de Crédito' : 'Boleto Bancário'}<br>
              <strong>Total a Pagar:</strong> ${StoreUI.formatCurrency(pedido.total)}
            </p>
          </div>
        `}

        <a 
          href="https://wa.me/5511987654321?text=${msgWhatsApp}" 
          target="_blank" 
          class="btn-whatsapp-order"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          Enviar Pedido no WhatsApp da Loja
        </a>

        <div style="margin-top: 1.25rem;">
          <button class="cat-pill-btn" onclick="location.reload()">Continuar Comprando</button>
        </div>
      </div>
    `;
  },

  copyPixKey() {
    const text = document.getElementById('pix-key-val').textContent;
    navigator.clipboard.writeText(text).then(() => {
      StoreUI.showToast('Código Pix copiado com sucesso!');
    });
  },

  openProductDetails(idProduto) {
    const prod = storeState.produtos.find(p => p.id_componente === Number(idProduto));
    if (!prod) return;

    const modal = document.getElementById('product-detail-modal');
    const title = document.getElementById('detail-product-title');
    const body = document.getElementById('detail-modal-body');

    title.textContent = prod.nome;

    const preco = Number(prod.preco) || 0;
    const precoPix = preco * 0.95;
    const qtdEstoque = Number(prod.quantidade_estoque) || 0;

    body.innerHTML = `
      <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; margin-bottom: 1.25rem; align-items: center;">
        <img 
          src="${StoreUI.escapeHTML(prod.imagem || 'img/arduino.jpg')}" 
          alt="${StoreUI.escapeHTML(prod.nome)}" 
          class="product-detail-img"
          onerror="this.src='img/arduino.jpg'"
        >
        <div style="flex: 1; min-width: 200px;">
          <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: var(--text-light);">${StoreUI.escapeHTML(prod.categoria_nome || 'Componentes')}</span>
          <h2 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.4rem;">${StoreUI.escapeHTML(prod.nome)}</h2>
          <div style="display: flex; align-items: baseline; gap: 0.6rem;">
            <span style="font-size: 1.4rem; font-weight: 800; color: var(--text-main);">${StoreUI.formatCurrency(preco)}</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: #059669;">(${StoreUI.formatCurrency(precoPix)} no Pix)</span>
          </div>
          <div style="font-size: 0.78rem; color: ${qtdEstoque > 0 ? '#059669' : '#dc2626'}; font-weight: 600; margin-top: 0.3rem;">
            ${qtdEstoque > 0 ? `✓ Em estoque (${qtdEstoque} unidades prontas para envio)` : '❌ Fora de estoque no momento'}
          </div>
        </div>
      </div>

      <div style="background: #f8fafc; border-radius: var(--radius-md); padding: 1rem; border: 1px solid var(--border-color); margin-bottom: 1rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Especificações Técnicas:</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">${StoreUI.escapeHTML(prod.especificacoes || 'Consulte o datasheet oficial do componente.')}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Descrição do Produto:</h4>
        <p style="font-size: 0.85rem; color: #334155; line-height: 1.6;">${StoreUI.escapeHTML(prod.descricao || 'Componente eletrónico de alta qualidade para montagem de circuitos.')}</p>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="cat-pill-btn" onclick="StoreApp.closeDetailModal()">Fechar</button>
        <button 
          class="btn-add-cart" 
          ${qtdEstoque <= 0 ? 'disabled' : ''} 
          onclick="StoreApp.addToCart(${prod.id_componente}); StoreApp.closeDetailModal();"
        >
          ${qtdEstoque <= 0 ? 'Indisponível' : 'Adicionar ao Carrinho 🛒'}
        </button>
      </div>
    `;

    modal.classList.add('open');
  },

  closeDetailModal() {
    const modal = document.getElementById('product-detail-modal');
    modal.classList.remove('open');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  StoreApp.init();
});
