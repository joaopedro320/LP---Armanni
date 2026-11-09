/* Armanni Marmoraria | comportamento da LP (padrão QH4) */
(function () {
  'use strict';
  var cfg = window.QH4_CONFIG || {};
  var track = window.qh4Track || function () {};
  var doc = document.documentElement;
  doc.classList.add('js');

  /* Segurança: se algo falhar, nada fica invisível */
  var failsafe = setTimeout(function () { doc.classList.add('carregado'); document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('visivel'); }); }, 3500);

  function waLink(tipo, msg) {
    var num = tipo === 'parceiros' ? cfg.WHATSAPP_PARCEIROS : cfg.WHATSAPP;
    var texto = msg || (tipo === 'parceiros' ? cfg.MSG_PARCEIROS : cfg.MSG_PADRAO);
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(texto);
  }

  /* Todos os botões de WhatsApp: link + evento whatsapp_click com o local */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink(a.getAttribute('data-wa-tipo'));
    a.target = '_blank';
    a.rel = 'noopener';
    a.addEventListener('click', function () {
      track('whatsapp_click', { wa_local: a.getAttribute('data-wa'), wa_tipo: a.getAttribute('data-wa-tipo') || 'cliente' });
    });
  });
  document.querySelectorAll('[data-evt]').forEach(function (a) {
    a.addEventListener('click', function () { track(a.getAttribute('data-evt')); });
  });

  /* Moldura do hero: desenha o retângulo aberto em pixels reais */
  function desenhaMoldura() {
    document.querySelectorAll('.moldura__linha').forEach(function (svg) {
      var box = svg.getBoundingClientRect();
      var w = Math.round(box.width), h = Math.round(box.height);
      if (!w || !h) return;
      var gap = w * 0.3;
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      var p = svg.querySelector('path');
      p.setAttribute('d', 'M' + gap + ' ' + h + ' H0.75 V0.75 H' + (w - 0.75) + ' V' + h + ' H' + (w - gap));
      p.removeAttribute('vector-effect');
      p.setAttribute('pathLength', '1');
    });
  }
  desenhaMoldura();
  window.addEventListener('resize', desenhaMoldura);

  /* Entrada orquestrada do hero */
  function inicia() { requestAnimationFrame(function () { doc.classList.add('carregado'); }); }
  var heroImg = document.querySelector('.hero__img img');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', inicia, { once: true });
    heroImg.addEventListener('error', inicia, { once: true });
    setTimeout(inicia, 1200);
  } else { inicia(); }

  /* Cabeçalho */
  var topo = document.getElementById('topo');
  var burger = document.querySelector('.topo__burger');
  var menu = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var aberto = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!aberto));
    burger.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    menu.classList.toggle('aberto', !aberto);
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { burger.setAttribute('aria-expanded', 'false'); menu.classList.remove('aberto'); });
  });

  /* Scroll: borda do topo + parallax leve na foto do hero */
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var paralax = document.querySelector('[data-parallax] img');
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      topo.classList.toggle('is-rolado', y > 10);
      if (paralax && !reduz && y < window.innerHeight * 1.2) paralax.style.transform = 'translateY(' + (y * -0.06) + 'px)';
      ticking = false;
    });
  }, { passive: true });

  /* Revelação no scroll */
  var alvos = document.querySelectorAll('.sec-cab, .obra, .obras__google, .servicos__lista li, .materiais__in > *, .processo__trilha li, .loja__texto, .loja__mapa, .parceiros__in, .duvidas details, .contato, .fatos__lista div');
  alvos.forEach(function (el) { el.classList.add('rv'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var irmaos = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        e.target.style.transitionDelay = Math.min(irmaos, 6) * 60 + 'ms';
        e.target.classList.add('visivel');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    alvos.forEach(function (el) { io.observe(el); });
    var trilha = document.querySelector('.processo__trilha');
    var io2 = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { trilha.classList.add('visivel'); io2.disconnect(); } }, { threshold: .4 });
    io2.observe(trilha);
  } else {
    alvos.forEach(function (el) { el.classList.add('visivel'); });
  }
  clearTimeout(failsafe);
  setTimeout(function () { document.querySelectorAll('.rv:not(.visivel)').forEach(function (el) { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visivel'); }); }, 2500);

  /* Serviços: lista que troca a foto do painel */
  var abas = document.querySelectorAll('.servicos__lista [role="tab"]');
  var painel = document.getElementById('sv-painel');
  var pImgBox = painel.querySelector('.servicos__img');
  var pImg = pImgBox.querySelector('img');
  var pTxt = painel.querySelector('.servicos__txt');
  function ativa(btn) {
    if (btn.getAttribute('aria-selected') === 'true') return;
    abas.forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
    btn.setAttribute('aria-selected', 'true');
    var src = btn.getAttribute('data-img');
    pTxt.textContent = btn.getAttribute('data-txt');
    painel.classList.toggle('sem-foto', !src);
    if (src) {
      pImgBox.classList.add('troca');
      setTimeout(function () { pImg.src = src; pImg.alt = btn.textContent; pImgBox.classList.remove('troca'); }, 220);
    }
  }
  abas.forEach(function (b, i) {
    b.addEventListener('click', function () { ativa(b); });
    if (window.matchMedia('(hover: hover)').matches) b.addEventListener('mouseenter', function () { ativa(b); });
    b.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
      if (!n) return;
      e.preventDefault();
      var prox = abas[(i + n + abas.length) % abas.length];
      prox.focus(); ativa(prox);
    });
  });

  /* Galeria em tela cheia */
  var fotos = Array.prototype.slice.call(document.querySelectorAll('#galeria .obra'));
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('figcaption');
  var atual = 0, ultimoFoco = null;
  function mostra(i) {
    atual = (i + fotos.length) % fotos.length;
    var f = fotos[atual];
    lbImg.src = f.getAttribute('data-full');
    lbImg.alt = f.querySelector('img').alt;
    lbCap.textContent = f.querySelector('span').textContent + '  (' + (atual + 1) + ' de ' + fotos.length + ')';
  }
  function abre(i) {
    ultimoFoco = document.activeElement;
    mostra(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { lb.classList.add('aberto'); });
    lb.querySelector('.lightbox__fechar').focus();
    track('galeria_abrir', { foto: atual + 1 });
  }
  function fecha() {
    lb.classList.remove('aberto');
    document.body.style.overflow = '';
    setTimeout(function () { lb.hidden = true; }, 250);
    if (ultimoFoco) ultimoFoco.focus();
  }
  fotos.forEach(function (f, i) { f.addEventListener('click', function () { abre(i); }); });
  lb.querySelector('.lightbox__fechar').addEventListener('click', fecha);
  lb.querySelector('.lightbox__nav--ant').addEventListener('click', function () { mostra(atual - 1); });
  lb.querySelector('.lightbox__nav--prox').addEventListener('click', function () { mostra(atual + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) fecha(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') fecha();
    if (e.key === 'ArrowLeft') mostra(atual - 1);
    if (e.key === 'ArrowRight') mostra(atual + 1);
  });
  var toqueX = null;
  lb.addEventListener('touchstart', function (e) { toqueX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (toqueX === null) return;
    var dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50) mostra(atual + (dx < 0 ? 1 : -1));
    toqueX = null;
  });

  /* Formulário */
  var form = document.getElementById('form-orcamento');
  var enviar = form.querySelector('button[type="submit"]');
  var nota = form.querySelector('.form__nota');
  var whats = form.querySelector('#f-whats');
  var iniciou = false;

  whats.addEventListener('input', function () {
    var d = whats.value.replace(/\D/g, '').slice(0, 11);
    var r = d;
    if (d.length > 2) r = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 6) r = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length === 11 ? 7 : 6) + '-' + d.slice(d.length === 11 ? 7 : 6);
    whats.value = r;
  });

  function valida() {
    var ok = form.checkValidity();
    enviar.disabled = !ok;
    nota.textContent = ok ? 'Tudo certo. Ao enviar, o WhatsApp abre com a mensagem pronta.' : 'Preencha os campos para liberar o envio.';
  }
  ['input', 'change'].forEach(function (ev) {
    form.addEventListener(ev, function (e) {
      if (!iniciou) { iniciou = true; track('form_start'); }
      var campo = e.target.closest('.campo');
      if (campo && e.type === 'change') campo.classList.toggle('erro', !e.target.checkValidity());
      valida();
    });
  });
  valida();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { valida(); return; }
    var d = Object.fromEntries(new FormData(form).entries());
    var msg = 'Olá, vim pelo site da Armanni e quero um orçamento.\n\n' +
      '*Nome:* ' + d.nome + '\n' +
      '*WhatsApp:* ' + d.whatsapp + '\n' +
      '*Cidade e bairro da obra:* ' + d.cidade + '\n' +
      '*O que preciso:* ' + d.peca + '\n' +
      '*Material de interesse:* ' + d.material + '\n' +
      '*Projeto ou medidas:* ' + d.medidas +
      (d.mensagem ? '\n*Detalhes:* ' + d.mensagem : '');

    track('generate_lead', { form_peca: d.peca, form_material: d.material });
    enviar.disabled = true;
    enviar.textContent = 'Enviando...';

    function segue(mensagemFinal) {
      try { sessionStorage.setItem('qh4_wa_msg', mensagemFinal); } catch (err) {}
      window.location.href = 'obrigado.html';
    }

    if (cfg.WEBHOOK_URL) {
      var corpo = Object.assign({ origem: cfg.LP_ID, pagina: location.href, data: new Date().toISOString() }, d);
      fetch(cfg.WEBHOOK_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(corpo) })
        .catch(function () {})
        .then(function () { segue(cfg.MSG_POS_WEBHOOK); });
    } else {
      segue(msg);
    }
  });
})();
