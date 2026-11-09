# LP Armanni Marmoraria (padrão QH4)

Landing page estática, sem build, pronta pra Vercel. Cliente: Armanni Marmoraria, São Bernardo do Campo/SP. Produto: Método Stones Low Ticket + Social Media Orbia 1.

## Estrutura

```
index.html            LP
obrigado.html         página de obrigado (dispara thank_you_view e abre o WhatsApp)
404.html              página de erro personalizada
assets/css/style.css  estilos da LP
assets/css/paginas.css estilos da obrigado e da 404
assets/js/tracking.js CONFIG (WhatsApp, webhook, conversões) + função de rastreamento
assets/js/main.js     menu, animações, galeria em tela cheia, lista de serviços, formulário
assets/img/           logo, ícones e fotos de obra (arquivos reais, sem base64)
favicon.ico / favicon.png
robots.txt  sitemap.xml  site.webmanifest  vercel.json
TRACKING-QH4.md       onde colar GTM, Pixel e demais códigos + eventos
```

## Publicar na Vercel

1. Descompacte o zip.
2. vercel.com > Add New > Project > arraste a pasta (ou `vercel --prod` dentro dela).
3. Framework Preset: Other. Sem build command, sem output directory.
4. Em Domains, adicione `armannimarmoraria.com.br` e `www.armannimarmoraria.com.br`.

## Pendências antes de publicar

- [ ] **Domínio:** hoje `armannimarmoraria.com.br` está com a agência anterior e a cliente não tem acesso. Recuperar o acesso ao Registro.br (ou o DNS) para apontar pra Vercel. Enquanto isso, publicar em um subdomínio da Vercel.
- [ ] **Canonical / OG / sitemap:** estão apontando para `https://www.armannimarmoraria.com.br/`. Se o domínio final for outro, trocar em `index.html`, `robots.txt` e `sitemap.xml`.
- [ ] **GTM / Pixel / Google Ads:** colar nos slots (ver TRACKING-QH4.md).
- [ ] **WhatsApp:** conferir os dois números em `assets/js/tracking.js`.
- [ ] **Apps Script:** se for usar, colar a URL em `WEBHOOK_URL`.
- [ ] **Fotos:** a LP mistura dois tipos de imagem. (1) Hero, lista de serviços e fundo da seção de materiais usam fotos de banco (Unsplash, licença gratuita, uso comercial liberado), arquivos `foto-*.jpg`, só como ambientação, sem dizer que são obras da Armanni. (2) A galeria "Obras entregues" usa 8 fotos REAIS do site antigo (`obra-*.jpg`), recortadas e tratadas. Quando a Armanni mandar fotos boas de obras, trocar primeiro as do hero e dos serviços por obras reais, mantendo os nomes de arquivo.
- [ ] **Nome:** a marca usada é **Armanni** (logo, domínio e briefing). O contrato está como "Armani"; confirmar com o comercial.

## Fonte do conteúdo

Tudo veio do briefing respondido pela Fernanda (09/11/2026), do resumo comercial da conta e dos dados de contato do site atual (endereço e e-mail). Nada foi inventado:

- Mais de 20 anos de história: briefing diz 8 anos de gestão atual + 13 anos da marmoraria adquirida.
- Prazo de 20 dias úteis, garantia de 12 meses, medição sem custo, orçamento em até 24h, pagamento em até 18x (até 6x sem juros), entrada de 50%: FAQ do briefing.
- Café e pão de queijo na loja: diferenciais do briefing.
- 105 avaliações no Google: resumo da conta. Link de avaliações do briefing.
- A comissão de 10% para parceiros NÃO aparece na LP (a cliente pediu cuidado com essa comunicação). Fica para o atendimento.
- Fotos de banco (Unsplash): lista e IDs em `assets/img/CREDITOS.txt`.
- O site antigo dizia "desde 1998"; não usei porque conflita com o briefing.
- Sem depoimentos escritos na página: nenhum foi enviado. A LP leva pro link de avaliações do Google.

Paleta do briefing: café #3B302B, bege #B49A7A, areia #E8DFD2, off-white #F7F5F0, grafite #292725. Fundo claro (pedido no briefing). Fontes: Poppins + Inter (padrão QH4, cliente sem preferência). Motivo visual: a moldura aberta embaixo, tirada do próprio logo.

## Checklist de SEO

- [x] Title e meta description com cidade e nicho
- [x] H1 com "Marmoraria" + "perto de você"
- [x] JSON-LD HomeAndConstructionBusiness (endereço, horário, CNPJ, área atendida) + FAQPage
- [x] Open Graph e Twitter Card (imagem 1200 x 630 em `assets/img/og-armanni.jpg`)
- [x] Canonical, robots.txt, sitemap.xml, site.webmanifest
- [x] width/height em todas as imagens, lazy loading abaixo da dobra, preload da foto do hero
- [x] obrigado.html com noindex, 404 personalizada, vercel.json
- [x] Script do IVO na index e na obrigado (`data-lp="lp-armanni-marmoraria"`)
