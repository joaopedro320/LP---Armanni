# Rastreamento da LP Armanni Marmoraria (padrão QH4)

## Onde colar cada código

Os slots estão marcados com blocos de comentário grandes `[QH4 SLOT n]`, iguais em `index.html`, `obrigado.html` e `404.html`.

| Slot | Onde fica | O que colar |
|---|---|---|
| 1 | `<head>`, logo no topo | Código principal do GTM |
| 2 | `<head>` | Metatags de verificação de domínio (Meta, Search Console) |
| 3 | `<head>` | Meta Pixel direto, só se NÃO for usar via GTM |
| 4 | `<head>` | gtag do Google Ads / GA4 direto, só se NÃO for usar via GTM |
| 5 | Logo depois de abrir o `<body>` | `<noscript>` do GTM |
| 6 | Antes do `</body>` | Scripts de terceiros (Clarity, Hotjar, chat) |
| 7 | `assets/js/tracking.js` | WhatsApp, webhook do Apps Script, rótulos de conversão |
| 8 | `obrigado.html`, script no fim | Conversão direta da página de obrigado (sem GTM) |

O script do IVO (Funil do LIA & IVO) já está instalado antes do `</body>` da index e da obrigado com `data-lp="lp-armanni-marmoraria"`. Não vai na 404.

## Eventos do dataLayer

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | Clique em qualquer botão de WhatsApp | `wa_local` (topo, hero, materiais, parceiros, form_lateral, rodape, flutuante, obrigado, obrigado_auto, 404), `wa_tipo` (cliente ou parceiros) |
| `form_start` | Primeira interação com o formulário | |
| `generate_lead` | Envio válido do formulário | `form_peca`, `form_material` |
| `thank_you_view` | Abertura da página de obrigado | |
| `galeria_abrir` | Foto aberta em tela cheia | `foto` |
| `google_reviews` | Clique em "Ler avaliações no Google" | |
| `rota_maps` | Clique em "Abrir rota no Google Maps" | |
| `page_404` | Abertura da página 404 | `caminho` |

Todos os eventos levam `lp_id: lp-armanni-marmoraria`.

## Sugestão de configuração no GTM

- Conversão principal (Google Ads e Meta Lead): gatilho de evento personalizado `generate_lead` ou `thank_you_view`.
- Conversão secundária: `whatsapp_click`. Para separar parceiros de clientes finais, use a variável `wa_tipo`.
- Se o Meta Pixel estiver direto no SLOT 3, o `tracking.js` já dispara `Lead` no envio do formulário e `Contact` no clique de WhatsApp. Não duplique no GTM.

## Formulário

- `WEBHOOK_URL` vazio (padrão atual): o formulário monta a mensagem com todos os campos, abre a página de obrigado e redireciona pro WhatsApp com a mensagem completa.
- `WEBHOOK_URL` preenchido: envia os dados pro Google Apps Script, abre a página de obrigado e redireciona pro WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
- O botão nasce desabilitado e só libera com todos os campos obrigatórios válidos.

## Dois números de WhatsApp

- Clientes finais: (11) 94870-9543 (`WHATSAPP`)
- Campanhas de parceria com arquitetos: (11) 93746-8006 (`WHATSAPP_PARCEIROS`), usado só no botão da seção de parceiros.
