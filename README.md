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

- Garantia de 12 meses, medição sem custo, orçamento em até 24h, pagamento em até 18x (até 6x sem juros), entrada de 50%: FAQ do briefing.
- Café e pão de queijo na loja: diferenciais do briefing.
- "Mais de 100 avaliações no Google": texto FIXO no código (o resumo da conta falava em 105). Não atualiza sozinho; ver nota abaixo.
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

## Ajustes V2 (pedido da cliente, 11/11/2026)

- Removidas todas as menções a prazo de entrega (faixa de números, etapa 6 do processo e FAQ, inclusive no JSON-LD). O "orçamento em até 24h" ficou, porque é tempo de orçamento.
- Raio de atendimento: "Até 70 km a partir de São Bernardo. Acima disso, consulte."
- Removido o parágrafo da história (aquisição, 13 + 8 anos) e o card "Mais de 20 anos". Campo "Atendemos": "ABC, São Paulo e região. Consulte a disponibilidade para a sua cidade."
- Faixa de números ficou com 4 cards: orçamento em até 24h, até 18x, até 70 km e 12 meses de garantia.
- Galeria "Obras entregues": 8 fotos novas da pasta "Novas Imagens" do Drive do cliente (cubas esculpidas, lavabos, quartzito, travertino, cozinha com península), em formato vertical 3:4. Duas delas também entraram em "O que a Armanni faz" (ilhas/penínsulas e banheiros/cubas esculpidas).
- Número de avaliações do Google: estava fixo no código ("105"). Trocado por "Mais de 100 avaliações", que continua verdadeiro conforme o número cresce. Atualização automática exigiria a API do Google Places (chave + faturamento no Google Cloud) ou um widget pago de avaliações; alinhar com o account se a cliente quiser isso.
