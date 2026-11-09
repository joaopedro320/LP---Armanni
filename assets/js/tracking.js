/* =====================================================================
   [QH4 SLOT 7] CONFIGURAÇÃO DA LP ARMANNI MARMORARIA
   ---------------------------------------------------------------------
   Tudo que muda de cliente pra cliente fica AQUI. Não precisa mexer no
   HTML nem no main.js para trocar número, webhook ou conversões.
   Detalhes completos no arquivo TRACKING-QH4.md.
   ===================================================================== */
window.QH4_CONFIG = {
  /* WhatsApp principal (clientes finais), só números com DDI 55 */
  WHATSAPP: '5511948709543',

  /* WhatsApp das campanhas de parceria (arquitetos, designers, construtores) */
  WHATSAPP_PARCEIROS: '5511937468006',

  /* Mensagens padrão dos botões de WhatsApp */
  MSG_PADRAO: 'Olá, vim pelo site da Armanni e gostaria de um orçamento.',
  MSG_PARCEIROS: 'Olá, sou profissional da área (arquitetura, design, engenharia ou construção) e quero conhecer a parceria com a Armanni.',

  /* Google Apps Script (Web App). Deixe vazio ('') para o formulário
     montar a mensagem completa e mandar direto pro WhatsApp.
     Se preencher, o formulário envia pro Apps Script, abre a página de
     obrigado e redireciona pro WhatsApp com a mensagem curta padrão. */
  WEBHOOK_URL: '',
  MSG_POS_WEBHOOK: 'Olá, acabei de preencher o formulário no site. Aguardo mais informações.',

  /* Conversão do Google Ads SEM GTM (opcional). Ex.: 'AW-123456789/AbCdEfGh'.
     Se usar GTM, deixe vazio e crie a tag pelo evento do dataLayer. */
  GADS_CONVERSAO_LEAD: '',
  GADS_CONVERSAO_WHATSAPP: '',

  /* Identificador desta LP nos eventos */
  LP_ID: 'lp-armanni-marmoraria'
};

/* dataLayer sempre existe, com ou sem GTM */
window.dataLayer = window.dataLayer || [];

/* Função única de rastreamento usada pela página inteira.
   Eventos padrão QH4: whatsapp_click (wa_local), form_start,
   generate_lead, thank_you_view. */
window.qh4Track = function (evento, dados) {
  var payload = Object.assign({ event: evento, lp_id: window.QH4_CONFIG.LP_ID }, dados || {});
  window.dataLayer.push(payload);

  /* Meta Pixel direto (se instalado no SLOT 3) */
  if (typeof window.fbq === 'function') {
    if (evento === 'generate_lead') window.fbq('track', 'Lead');
    if (evento === 'whatsapp_click') window.fbq('track', 'Contact', { local: payload.wa_local });
  }

  /* gtag direto (se instalado no SLOT 4) */
  if (typeof window.gtag === 'function') {
    var cfg = window.QH4_CONFIG;
    if (evento === 'generate_lead' && cfg.GADS_CONVERSAO_LEAD) window.gtag('event', 'conversion', { send_to: cfg.GADS_CONVERSAO_LEAD });
    if (evento === 'whatsapp_click' && cfg.GADS_CONVERSAO_WHATSAPP) window.gtag('event', 'conversion', { send_to: cfg.GADS_CONVERSAO_WHATSAPP });
  }
};
