# Links Pneus Planalto

Página de links da bio do Instagram da **Pneus Planalto**, publicada em **https://links.pneusplanalto.com.br**.

Link para colocar na bio do Instagram:

```
https://links.pneusplanalto.com.br/?utm_source=instagram&utm_medium=bio
```

A página é um site estático (HTML, CSS e JavaScript), sem framework e sem etapa de build. **Todo o conteúdo fica no arquivo [`links.json`](links.json)**: para trocar número, texto, ordem das lojas ou ligar uma promoção, basta editar esse arquivo. Não é preciso mexer no HTML.

---

## ✏️ Como editar o `links.json` pelo site do GitHub

1. Entre em https://github.com/Gabrzz/links-pneusplanalto (logado na sua conta).
2. Clique no arquivo **`links.json`**.
3. Clique no ícone de **lápis ✏️** ("Edit this file"), no canto direito acima do conteúdo.
4. Faça a alteração. Mantenha as **aspas**, **vírgulas** e **chaves `{ }`** exatamente como estão.
5. Clique no botão verde **"Commit changes..."**, escreva um resumo (ex.: *"Liga promoção de novembro"*) e confirme em **"Commit changes"**.
6. Em 1 a 2 minutos a página publicada é atualizada sozinha.

> ⚠️ **Cuidado com vírgulas.** Cada item de uma lista é separado por vírgula, mas o **último item não leva vírgula**. Se o JSON ficar inválido, a página mostra só uma mensagem com o WhatsApp da matriz. Para conferir antes de salvar, cole o conteúdo em https://jsonlint.com.

---

## 📖 O que é cada campo

### `perfil`: topo da página
| Campo | O que faz |
|---|---|
| `nome` | Nome que aparece abaixo do logo. |
| `descricao` | Linha de apoio abaixo do nome. |
| `logo` | Caminho do logo (padrão `assets/logo.svg`). |

### `redes`: ícones redondos no topo
Cada item tem `tipo` (`instagram`, `site`, `facebook` ou `youtube`, que define o ícone), `rotulo` (texto lido por leitores de tela) e `url`.

### `destaque`: faixa amarela de promoção
| Campo | O que faz |
|---|---|
| `ativo` | `true` mostra a faixa, `false` esconde. |
| `titulo` | Título da promoção. |
| `texto` | Texto curto. |
| `botao_texto` | Texto do botão. |
| `botao_url` | Para onde o botão leva (pode ser um link de WhatsApp). |

### `whatsapp`
| Campo | O que faz |
|---|---|
| `mensagem_padrao` | Mensagem que já vem escrita quando o cliente abre o WhatsApp. `{nome}` é trocado pelo nome da unidade, sem a palavra "Unidade" (ex.: "Av. Brasil (Matriz)"). Também dá para usar `{cidade}`. |
| `matriz` | Número usado na mensagem de erro, caso a página não carregue. |

### `cidades_ordem`
Ordem em que as cidades aparecem na seção "Nossas unidades".

### `lojas`: uma entrada por unidade
| Campo | O que faz |
|---|---|
| `id` | Identificador curto, sem espaço nem acento (ex.: `av-brasil`). Usado nas estatísticas de clique. |
| `nome` | Nome exibido no cartão. |
| `cidade` | Cidade. Precisa estar escrita igual à de `cidades_ordem`. |
| `endereco` | Endereço exibido e usado no botão "Como chegar". |
| `whatsapp` | Número com DDI + DDD + número, **só dígitos** (ex.: `553432360010`). Se ficar vazio ou `"PREENCHER"`, aparece "Em breve" no lugar do botão. |
| `mensagem` | *(opcional)* Mensagem própria desta loja, no lugar da `mensagem_padrao`. |
| `mapa` | *(opcional)* Link do Google Maps. Se ficar vazio, o link é gerado pelo endereço. |
| `avaliar` | Link "Avaliar no Google" (`https://search.google.com/local/writereview?placeid=...`). Enquanto estiver `"PREENCHER"`, o botão **fica escondido**. |
| `horarios` | Horário de funcionamento, usado no selo **Aberto agora / Fechado** (fuso de Brasília). Campos: `seg_sex`, `sabado`, `domingo`. Formato `"08:00-18:00"`, `"fechado"` ou duas faixas separadas por vírgula: `"08:00-12:00, 13:30-18:00"`. Também aceita dias separados (`seg`, `ter`, `qua`, `qui`, `sex`), que têm prioridade sobre `seg_sex`. |

### `links_extras`: botões no fim da página
Cada item tem `rotulo`, `url` e `icone` (`site`, `instagram`, `facebook`, `youtube` ou `link`).

### `rastreamento`: contagem de cliques (desligado)
| Campo | O que faz |
|---|---|
| `ativo` | `true` envia cada clique para o webhook. |
| `webhook` | URL do webhook do n8n (ex.: `https://n8n.pneusplanalto.com.br/webhook/links`). |

Cada clique envia um POST em JSON com:
`{ loja, acao (whatsapp | mapa | avaliar | link), destino, utm_source, utm_medium, utm_campaign, utm_content, utm_term, timestamp, pagina }`.
Os parâmetros `utm_*` são copiados da URL da página.
No n8n, use um nó **Webhook** com método **POST** e, em *Options → Allowed Origins (CORS)*, libere `https://links.pneusplanalto.com.br` (ou `*`).

---

## 🧩 Exemplos

### Ligar a promoção
```json
"destaque": {
  "ativo": true,
  "titulo": "Black Friday Planalto",
  "texto": "Pneus com até 20% OFF e alinhamento grátis. Só até 30/11.",
  "botao_texto": "Quero aproveitar",
  "botao_url": "https://wa.me/553432360010?text=Quero%20a%20promo%C3%A7%C3%A3o%20Black%20Friday"
},
```

### Adicionar uma loja
Copie um bloco de loja inteiro, cole depois do último (não esqueça a **vírgula** entre os blocos `},{`) e altere os dados:
```json
{
  "id": "uberaba-centro",
  "nome": "Unidade Uberaba Centro",
  "cidade": "Uberaba",
  "endereco": "Rua Exemplo, 100, Centro",
  "whatsapp": "553433330000",
  "mapa": "",
  "avaliar": "PREENCHER",
  "horarios": { "seg_sex": "08:00-18:00", "sabado": "08:00-12:00", "domingo": "fechado" }
}
```
Se for uma cidade nova, acrescente o nome dela em `cidades_ordem`.

---

## 📌 Pendências ("PREENCHER" e itens a conferir)

| Loja | Campo | Situação |
|---|---|---|
| Av. Brasil (Matriz) | `avaliar` | **PREENCHER**: link de avaliação do Google |
| João Naves | `avaliar` | **PREENCHER** |
| Afonso Pena | `avaliar` | **PREENCHER** |
| Floriano Peixoto | `avaliar` | **PREENCHER** |
| Uberaba (Av. Fernando Costa) | `avaliar` | **PREENCHER** |
| Araguari | `avaliar` | **PREENCHER** |
| **Todas as lojas** | `horarios` | ⚠️ **Conferir.** Os valores atuais (seg a sex 08:00-18:00, sáb 08:00-12:00, dom fechado) são de **exemplo**. |
| — | `rastreamento.webhook` | Preencher quando o webhook do n8n existir e trocar `ativo` para `true`. |

**Como pegar o link "Avaliar no Google":** pesquise o *Place ID* da loja em https://developers.google.com/maps/documentation/places/web-service/place-id e monte `https://search.google.com/local/writereview?placeid=SEU_PLACE_ID`. Outra opção: no Perfil da Empresa no Google, use **"Pedir avaliações"** e copie o link curto (`https://g.page/r/.../review`), que também funciona.

---

## 🚀 Como publicar

### (a) Cloudflare Pages (recomendado)
1. No painel da Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. Escolha o repositório `Gabrzz/links-pneusplanalto`, branch `main`.
3. Configuração de build:
   - **Framework preset:** None
   - **Build command:** *(deixe vazio)*
   - **Build output directory:** `/`
4. **Save and Deploy**. Cada commit na `main` publica automaticamente.
5. Em **Custom domains**, adicione `links.pneusplanalto.com.br`.

O arquivo `_headers` já define cache curto (60 s) para o `links.json` e cache longo para imagens.

### (b) Coolify (Docker + nginx)
1. No Coolify: **New Resource → Public/Private Repository** → `https://github.com/Gabrzz/links-pneusplanalto`, branch `main`.
2. **Build Pack:** `Dockerfile` (o arquivo já está na raiz). Porta exposta: **80**.
3. Em **Domains**, coloque `https://links.pneusplanalto.com.br`.
4. **Deploy**. Ative o *Auto Deploy* (webhook do GitHub) para publicar a cada commit.

O `nginx.conf` já aplica gzip e cache curto para o `links.json`.

### (c) Apontar `links.pneusplanalto.com.br` (DNS)
No painel de DNS do domínio `pneusplanalto.com.br`, crie:

| Tipo | Nome | Valor |
|---|---|---|
| CNAME | `links` | **Cloudflare Pages:** `<nome-do-projeto>.pages.dev` |
| CNAME ou A | `links` | **Coolify:** domínio do servidor (CNAME) ou IP do servidor (registro **A**) |

Se o DNS já estiver na Cloudflare, ao adicionar o domínio personalizado no Pages o registro é criado automaticamente.

---

## 🛠️ Para desenvolvedores

- Testar localmente: `python3 -m http.server 8000` (ou `npx http-server`) na pasta do projeto e abrir http://localhost:8000. Abrir o `index.html` direto (file://) **não funciona**, porque o `fetch` do JSON é bloqueado.
- `tools/og.html` e `tools/icon.html` geram `assets/og.png` (1200×630) e `apple-touch-icon.png` (180×180) com um screenshot do Chrome headless:
  ```
  chrome --headless=new --hide-scrollbars --window-size=1200,630 --screenshot=assets/og.png tools/og.html
  chrome --headless=new --hide-scrollbars --window-size=180,180 --screenshot=apple-touch-icon.png tools/icon.html
  ```
