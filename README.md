# Horizon Digital — Site Oficial

Site estático (HTML, CSS e JavaScript puro, sem frameworks ou dependências externas de build) desenvolvido a partir das 4 especificações do projeto: UX/UI, Serviços & Conversão, e Animações/Funcionalidades Técnicas.

## Estrutura

```
horizon-digital/
├── index.html                     → página principal (todas as secções)
├── politica-de-privacidade.html
├── termos-de-servico.html
├── css/
│   └── style.css                  → tokens de design + todos os estilos
├── js/
│   └── main.js                    → animações, contadores, FAQ, pesquisa, WhatsApp
├── assets/
│   └── favicon.svg
├── robots.txt
└── sitemap.xml
```

## O que está implementado

- Hero com animação letra a letra, partículas de fundo em canvas, pesquisa inteligente
- 6 blocos de serviços com tabelas de preços e CTAs diretos para WhatsApp (mensagem pré-preenchida por serviço)
- Secção de Mentoria de Importação com os 4 níveis
- Contadores animados (Intersection Observer)
- Galeria de marcas parceiras
- FAQ em acordeão acessível
- Botão flutuante de WhatsApp com submenu de serviços
- Rodapé com contactos, redes sociais, política de privacidade e termos
- SEO: meta tags, Open Graph, canonical, sitemap.xml, robots.txt, hierarquia H1/H2/H3
- Acessibilidade: skip-link, foco visível, `prefers-reduced-motion` respeitado, `aria-*` em componentes interativos
- Responsivo mobile-first

## Pendente antes de publicar

1. **Logótipos reais**: os cartões de marcas (Bybit, Pexx, RedotPay, Jeton, Alibaba, AliExpress, SHEIN, Temu, eBay, Vinted, 1688, Netflix, Prime Video, HBO Max, Disney+, Spotify, YouTube Premium) estão como texto — substituir por ficheiros SVG/PNG oficiais em `/assets/logos/` e trocar os `<span class="brand-chip">` e cartões de preço por `<img>`.
2. **Imagem Open Graph**: adicionar `/assets/og-cover.jpg` (1200×630px).
3. **Redes sociais**: substituir os `href="#"` do rodapé pelos links reais do Instagram/Facebook/TikTok.
4. **Domínio**: confirmar `https://horizondigital.co.ao/` nas tags canonical/OG/sitemap ou ajustar para o domínio final.

## Sequência de commits sugerida (Claude Code)

```
feat: estrutura inicial do projeto e design tokens
feat: hero section com animação e pesquisa
feat: secção de cartões visa e streaming
feat: secção de tráfego pago, sites e design digital
feat: secção de importação e galeria de marcas
feat: mentoria de importação
feat: contadores, faq e avaliações
feat: whatsapp flutuante inteligente
feat: paginas legais (privacidade e termos)
chore: seo (meta tags, sitemap, robots.txt)
chore: acessibilidade e responsividade
```

## Publicar

Site 100% estático — pode ser publicado em qualquer hosting (GitHub Pages, Netlify, Vercel, cPanel). Não requer build nem `npm install`.
