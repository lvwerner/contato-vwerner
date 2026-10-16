# Portfólio de Vinicius Werner

Site estático em HTML, CSS e JavaScript puros, sem etapa de build. Publicado na Vercel em https://contato-vwerner.vercel.app.

## Estrutura

```
index.html            conteúdo e metadados (SEO, Open Graph, dados estruturados)
assets/styles.css     estilos; cores e tipografia ficam nas variáveis do topo
assets/main.js        tema claro e escuro, menu, cópia das chaves, impressão
assets/favicon.svg    ícone da aba
assets/og-image.png   imagem de pré-visualização (1200×630) para LinkedIn, WhatsApp e redes
robots.txt            regras para buscadores
sitemap.xml           mapa do site
vercel.json           cabeçalhos de segurança e cache dos arquivos em assets
```

## Rodar localmente

```
python3 -m http.server 4173
```

Depois, abra http://localhost:4173.

## Editar o conteúdo

Tudo está em `index.html`, em seções com `id`:

| Seção | O que editar |
| --- | --- |
| `#topo` | Apresentação, frase de destaque e a trajetória em fluxo |
| `#experiencia` | Cada cargo é um `<li class="role">`; o atual tem a classe `is-current` |
| `#certificacoes` | Cada certificado é um `<article class="cert">` |
| `#projetos` | Cada projeto é um `<article class="project">` |
| `#tecnologias` | Tecnologias e formação |
| `#contato` | E-mail, LinkedIn e GitHub |

Ao incluir ou remover uma certificação, atualize também:

1. a frase "Quatro certificações" no topo e na seção de certificações;
2. a lista `hasCredential` nos dados estruturados (`<script type="application/ld+json">` no `<head>`);
3. a chave do certificado, que aparece em dois lugares do cartão: no `<code>` e no atributo `data-copy` do botão.

O número de telefone não é publicado de propósito. O e-mail aparece em texto visível e em links `mailto:`.

## Publicar

Um push na branch principal publica pela Vercel. Se o endereço do site mudar, troque o domínio em:

- `<link rel="canonical">`, `og:url`, `og:image` e `twitter:image` no `<head>`;
- `url` e `@id` nos dados estruturados;
- `robots.txt` e `sitemap.xml`.

## Imagem de pré-visualização

`assets/og-image.png` mostra o nome, o cargo e a trajetória. Refaça a imagem quando o cargo ou a empresa atual mudarem. O LinkedIn guarda a prévia em cache; para atualizá-la, use o Post Inspector do LinkedIn com o endereço do site.

## Acessibilidade e impressão

- Contraste de texto AA nos temas claro e escuro.
- Navegação completa por teclado, com o link "Pular para o conteúdo".
- Animações desligadas quando o sistema pede movimento reduzido.
- Sem JavaScript, o conteúdo continua legível.
- O botão "Salvar esta página em PDF" usa a folha de impressão: A4, quatro páginas, com o contato no topo.
