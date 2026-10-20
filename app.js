/* Pneus Planalto — página de links
 * Todo o conteúdo vem de links.json. Este arquivo só monta a página.
 */
(function () {
  "use strict";

  var FUSO = "America/Sao_Paulo";
  var MATRIZ_PADRAO = "553432360010";

  /* ---------- Ícones (SVG inline) ---------- */
  var S = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"';
  var L = S + ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICONES = {
    whatsapp: '<svg ' + S + ' fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.59-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.64-.24-.38a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41"/></svg>',
    mapa: '<svg ' + L + '><path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
    estrela: '<svg ' + L + '><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    site: '<svg ' + L + '><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>',
    instagram: '<svg ' + L + '><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    facebook: '<svg ' + L + '><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    youtube: '<svg ' + L + '><path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>',
    link: '<svg ' + L + '><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    seta: '<svg ' + L + '><path d="m9 18 6-6-6-6"/></svg>',
    close: '<svg ' + L + '><path d="M18 6 6 18M6 6l12 12"/></svg>',
    relogio: '<svg ' + L + '><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
  };

  /* ---------- Utilidades ---------- */
  function $(id) { return document.getElementById(id); }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function ico(nome, classe) {
    return '<span class="' + (classe || "ico") + '">' + (ICONES[nome] || ICONES.link) + "</span>";
  }

  // Campo vazio ou ainda marcado como "PREENCHER" = não mostrar
  function pendente(v) {
    return v == null || String(v).trim() === "" || /PREENCHER/i.test(String(v));
  }

  function digitos(v) { return String(v || "").replace(/\D/g, ""); }

  function linkWhats(numero, mensagem) {
    var n = digitos(numero);
    if (!n) return "";
    return "https://wa.me/" + n + (mensagem ? "?text=" + encodeURIComponent(mensagem) : "");
  }

  function nomeCurto(nome) { return String(nome || "").replace(/^\s*unidade\s+/i, ""); }

  function mensagemLoja(loja, dados) {
    var modelo = loja.mensagem || (dados.whatsapp && dados.whatsapp.mensagem_padrao) ||
      "Olá! Vim pelo Instagram e gostaria de falar com a unidade {nome}.";
    return modelo
      .replace(/\{nome\}/g, nomeCurto(loja.nome))
      .replace(/\{cidade\}/g, loja.cidade || "");
  }

  function linkMapa(loja) {
    if (!pendente(loja.mapa)) return loja.mapa;
    var q = [loja.endereco, loja.cidade, "MG"].filter(Boolean).join(", ");
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  /* ---------- Horário de funcionamento ---------- */
  var DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

  function agoraSP() {
    var partes = new Intl.DateTimeFormat("en-US", {
      timeZone: FUSO, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var p = {};
    partes.forEach(function (x) { p[x.type] = x.value; });
    var dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
    return { dia: dia, min: (parseInt(p.hour, 10) % 24) * 60 + parseInt(p.minute, 10) };
  }

  // Aceita chaves específicas (seg, ter...) ou os grupos seg_sex / sabado / domingo
  function horarioDoDia(h, dia) {
    var chave = DIAS[dia];
    if (h[chave] != null) return h[chave];
    if (dia === 0) return h.domingo != null ? h.domingo : h.dom;
    if (dia === 6) return h.sabado != null ? h.sabado : h.sab;
    return h.seg_sex;
  }

  function faixas(txt) {
    if (!txt || /fechad/i.test(txt)) return [];
    return String(txt).split(/[,;]/).map(function (f) {
      var m = f.match(/(\d{1,2}):?(\d{2})\s*[-–a]+\s*(\d{1,2}):?(\d{2})/);
      if (!m) return null;
      return { ini: +m[1] * 60 + +m[2], fim: +m[3] * 60 + +m[4], txtFim: m[3].padStart(2, "0") + ":" + m[4], txtIni: m[1].padStart(2, "0") + ":" + m[2] };
    }).filter(Boolean);
  }

  function statusLoja(h) {
    if (!h || pendente(JSON.stringify(h))) return null;
    var a = agoraSP();
    var hoje = faixas(horarioDoDia(h, a.dia));
    for (var i = 0; i < hoje.length; i++) {
      if (a.min >= hoje[i].ini && a.min < hoje[i].fim) {
        return { aberto: true, texto: "Aberto agora", detalhe: "até " + hoje[i].txtFim };
      }
    }
    for (var j = 0; j < hoje.length; j++) {
      if (hoje[j].ini > a.min) return { aberto: false, texto: "Fechado", detalhe: "abre às " + hoje[j].txtIni };
    }
    return { aberto: false, texto: "Fechado", detalhe: "" };
  }

  function seloHTML(st) {
    if (!st) return "";
    return '<span class="selo ' + (st.aberto ? "selo--aberto" : "selo--fechado") + '">' + st.texto + "</span>";
  }

  function resumoHorario(h) {
    if (!h || pendente(JSON.stringify(h))) return "";
    function f(v) { return !v || /fechad/i.test(v) ? "fechado" : String(v).replace(/-/g, "–"); }
    var partes = [];
    if (h.seg_sex) partes.push("Seg a sex " + f(h.seg_sex));
    if (h.sabado) partes.push("Sáb " + f(h.sabado));
    if (h.domingo) partes.push("Dom " + f(h.domingo));
    return partes.join(" · ");
  }

  /* ---------- Rastreamento (n8n) ---------- */
  var cfgRastreio = { ativo: false };
  var utms = (function () {
    var out = {};
    try {
      new URLSearchParams(location.search).forEach(function (v, k) {
        if (/^utm_/i.test(k)) out[k.toLowerCase()] = v;
      });
    } catch (e) {}
    return out;
  })();

  function rastrear(loja, acao, destino) {
    if (!cfgRastreio.ativo || pendente(cfgRastreio.webhook)) return;
    var corpo = JSON.stringify({
      loja: loja || null,
      acao: acao,
      destino: destino || null,
      utm_source: utms.utm_source || null,
      utm_medium: utms.utm_medium || null,
      utm_campaign: utms.utm_campaign || null,
      utm_content: utms.utm_content || null,
      utm_term: utms.utm_term || null,
      timestamp: new Date().toISOString(),
      pagina: location.href
    });
    try {
      var ok = navigator.sendBeacon && navigator.sendBeacon(cfgRastreio.webhook, new Blob([corpo], { type: "application/json" }));
      if (ok) return;
    } catch (e) {}
    try {
      fetch(cfgRastreio.webhook, { method: "POST", body: corpo, keepalive: true, headers: { "Content-Type": "application/json" } });
    } catch (e) {}
  }

  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("a[data-acao]");
    if (a) rastrear(a.getAttribute("data-loja"), a.getAttribute("data-acao"), a.href);
  });

  /* ---------- Montagem ---------- */
  function ext(href) { return { href: href, target: "_blank", rel: "noopener" }; }

  function montarPerfil(d) {
    var p = d.perfil || {};
    if (p.nome) { $("perfil-nome").textContent = p.nome; }
    if (p.descricao) $("perfil-desc").textContent = p.descricao;
    if (p.logo && !pendente(p.logo)) $("perfil-nome").previousElementSibling.src = p.logo;

    var nav = $("redes");
    (d.redes || []).forEach(function (r) {
      if (pendente(r.url)) return;
      var a = el("a", ext(r.url), ico(r.tipo));
      a.setAttribute("aria-label", r.rotulo || r.tipo);
      a.setAttribute("title", r.rotulo || r.tipo);
      a.setAttribute("data-acao", "link");
      a.setAttribute("data-loja", r.tipo);
      nav.appendChild(a);
    });
  }

  function montarDestaque(d) {
    var x = d.destaque;
    if (!x || !x.ativo) return;
    var box = $("destaque");
    var html = '<h2 id="destaque-titulo">' + esc(x.titulo) + "</h2>";
    if (x.texto) html += "<p>" + esc(x.texto) + "</p>";
    box.innerHTML = html;
    if (x.botao_url && !pendente(x.botao_url)) {
      var a = el("a", ext(x.botao_url), esc(x.botao_texto || "Saiba mais"));
      a.className = "btn";
      a.setAttribute("data-acao", "link");
      a.setAttribute("data-loja", "destaque");
      box.appendChild(a);
    }
    box.hidden = false;
  }

  function agruparPorCidade(d) {
    var ordem = (d.cidades_ordem || []).slice();
    var grupos = {};
    (d.lojas || []).forEach(function (l) {
      var c = l.cidade || "Outras";
      if (!grupos[c]) { grupos[c] = []; if (ordem.indexOf(c) < 0) ordem.push(c); }
      grupos[c].push(l);
    });
    return ordem.filter(function (c) { return grupos[c]; }).map(function (c) { return { cidade: c, lojas: grupos[c] }; });
  }

  var selos = []; // para atualizar "Aberto/Fechado" a cada minuto

  function cartaoLoja(l, d) {
    var art = el("article", { class: "loja", id: "loja-" + l.id, "aria-labelledby": "nome-" + l.id });
    var st = statusLoja(l.horarios);
    var hora = resumoHorario(l.horarios);

    var html =
      '<div class="loja__topo">' +
        '<h4 class="loja__nome" id="nome-' + esc(l.id) + '">' + esc(l.nome) + "</h4>" +
        '<span class="loja__selo">' + seloHTML(st) + "</span>" +
      "</div>" +
      '<p class="loja__end">' + ico("mapa") + "<span>" + esc(l.endereco) + "</span></p>" +
      (hora ? '<p class="loja__hora">' + esc(hora) + "</p>" : "") +
      '<div class="loja__acoes"></div>';
    art.innerHTML = html;

    var acoes = art.querySelector(".loja__acoes");
    var wa = pendente(l.whatsapp) ? "" : linkWhats(l.whatsapp, mensagemLoja(l, d));
    var nome = nomeCurto(l.nome);

    if (wa) {
      var bw = el("a", ext(wa), ico("whatsapp") + "<span>WhatsApp</span>");
      bw.className = "btn btn--primary";
      bw.setAttribute("aria-label", "Falar no WhatsApp com a unidade " + nome);
      bw.setAttribute("data-acao", "whatsapp");
      bw.setAttribute("data-loja", l.id);
      acoes.appendChild(bw);
    } else {
      var off = el("span", { class: "btn btn--off", "aria-label": "WhatsApp da unidade " + nome + " em breve" }, ico("whatsapp") + "<span>Em breve</span>");
      acoes.appendChild(off);
    }

    var bm = el("a", ext(linkMapa(l)), ico("mapa") + "<span>Como chegar</span>");
    bm.className = "btn btn--ghost";
    bm.setAttribute("aria-label", "Como chegar na unidade " + nome + " pelo Google Maps");
    bm.setAttribute("data-acao", "mapa");
    bm.setAttribute("data-loja", l.id);
    acoes.appendChild(bm);

    if (!pendente(l.avaliar)) {
      var ba = el("a", ext(l.avaliar), ico("estrela") + "<span>Avaliar</span>");
      ba.className = "btn btn--ghost";
      ba.setAttribute("aria-label", "Avaliar a unidade " + nome + " no Google");
      ba.setAttribute("data-acao", "avaliar");
      ba.setAttribute("data-loja", l.id);
      acoes.appendChild(ba);
    }

    selos.push({ alvo: art.querySelector(".loja__selo"), horarios: l.horarios });
    return art;
  }

  function montarUnidades(d) {
    var grupos = agruparPorCidade(d);
    if (!grupos.length) return;
    var box = $("lista-cidades");
    grupos.forEach(function (g) {
      var sec = el("section", { class: "cidade", "aria-label": g.cidade });
      sec.appendChild(el("h3", { class: "cidade__nome" }, esc(g.cidade)));
      var lista = el("div", { class: "cidade__lista" });
      g.lojas.forEach(function (l) { lista.appendChild(cartaoLoja(l, d)); });
      sec.appendChild(lista);
      box.appendChild(sec);
    });
    $("unidades").hidden = false;
  }

  function montarFolha(d) {
    var lista = $("folha-lista");
    var total = 0;
    agruparPorCidade(d).forEach(function (g) {
      var itens = g.lojas.filter(function (l) { return !pendente(l.whatsapp) && digitos(l.whatsapp); });
      if (!itens.length) return;
      lista.appendChild(el("p", { class: "folha__cidade" }, esc(g.cidade)));
      itens.forEach(function (l) {
        var st = statusLoja(l.horarios);
        var a = el("a", ext(linkWhats(l.whatsapp, mensagemLoja(l, d))),
          ico("whatsapp") + "<span>" + esc(nomeCurto(l.nome)) + "</span>" + seloHTML(st));
        a.className = "folha__item";
        a.setAttribute("aria-label", "WhatsApp da unidade " + nomeCurto(l.nome) + (st ? " (" + st.texto + ")" : ""));
        a.setAttribute("data-acao", "whatsapp");
        a.setAttribute("data-loja", l.id);
        lista.appendChild(a);
        total++;
      });
    });
    if (!total) return;

    var btn = $("btn-whats");
    var folha = $("folha");
    btn.hidden = false;
    btn.addEventListener("click", function () {
      if (folha.showModal) {
        folha.showModal();
      } else {
        $("unidades").scrollIntoView();
      }
    });
    $("folha-fechar").addEventListener("click", function () { folha.close(); });
    // fecha ao tocar fora da folha
    folha.addEventListener("click", function (e) { if (e.target === folha) folha.close(); });
  }

  function montarExtras(d) {
    var box = $("extras");
    (d.links_extras || []).forEach(function (x) {
      if (pendente(x.url)) return;
      var a = el("a", ext(x.url), ico(x.icone || "link") + "<span>" + esc(x.rotulo) + "</span>" + ico("seta", "ico seta"));
      a.className = "link-extra";
      a.setAttribute("data-acao", "link");
      a.setAttribute("data-loja", x.icone || x.rotulo);
      box.appendChild(a);
    });
    if (box.children.length) box.hidden = false;
  }

  function atualizarSelos() {
    selos.forEach(function (s) { s.alvo.innerHTML = seloHTML(statusLoja(s.horarios)); });
  }

  function erro(d) {
    var e = $("erro");
    var n = (d && d.whatsapp && digitos(d.whatsapp.matriz)) || MATRIZ_PADRAO;
    e.querySelector("a").href = linkWhats(n, "Olá! Vim pelo Instagram e gostaria de falar com a Pneus Planalto.");
    e.hidden = false;
  }

  function iniciar(d) {
    cfgRastreio = d.rastreamento || { ativo: false };
    montarPerfil(d);
    montarDestaque(d);
    montarFolha(d);
    montarUnidades(d);
    montarExtras(d);
    setInterval(atualizarSelos, 60 * 1000);
  }

  $("ano").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-ico]").forEach(function (n) { n.innerHTML = ICONES[n.getAttribute("data-ico")] || ""; });

  fetch("links.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (d) {
      try { iniciar(d); } catch (e) { console.error(e); erro(d); }
    })
    .catch(function (e) { console.error("links.json:", e); erro(); });
})();
