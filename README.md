# ColorPalette – Verificador de Paleta de Cores para Eventos

## 1. Introdução

Este projeto foi desenvolvido com o propósito de auxiliar usuários na organização visual de eventos por meio da definição e validação de paletas de cores.

A aplicação permite que convidados verifiquem se suas roupas estão em conformidade com a paleta estabelecida pelo evento, promovendo coerência estética e identidade visual. A solução foi construída como uma aplicação web estática, responsiva e reutilizável.

---

## 2. Objetivo

O sistema tem como principais objetivos:

- Facilitar a organização cromática de eventos.
- Reduzir incertezas por parte dos convidados.
- Padronizar visualmente a identidade do evento.
- Servir como modelo reutilizável para diferentes contextos.

---

## 3. Funcionalidades

A aplicação oferece duas formas de validação:

### 3.1 Seleção Manual de Cor
O usuário pode selecionar uma cor por meio de um color picker. O sistema analisa automaticamente se a cor está dentro da paleta permitida.

### 3.2 Upload de Imagem
O usuário pode enviar uma imagem da roupa. Após o upload:
- A imagem é renderizada em um canvas HTML.
- O usuário seleciona um ponto específico.
- O sistema extrai o pixel correspondente.
- A cor é convertida e validada.

---

## 4. Arquitetura e Estrutura

O projeto foi desenvolvido utilizando:

- HTML5
- CSS3
- JavaScript (puro)
- Canvas API

Estrutura modular:

assets/
css/
js/
config.js
color-utils.js
validator.js
main.js


A separação modular permite reutilização da lógica de validação em outros projetos.

---

## 5. Modelo de Validação de Cores

### 5.1 Conversão de Cor

O sistema converte valores RGB para o modelo HSL (Hue, Saturation, Lightness).

A escolha do modelo HSL foi estratégica, pois ele permite:

- Separar matiz (Hue)
- Controlar saturação (S)
- Controlar luminosidade (L)

Isso possibilita bloqueio de cores muito vibrantes (neon) e exclusão de tons como preto.

---

### 5.2 Conversão RGB → HSL

A conversão segue o modelo matemático padrão:

- Normalização dos valores RGB (0–255 → 0–1)
- Cálculo do valor máximo e mínimo
- Determinação de Hue com base no canal dominante
- Cálculo de Saturation e Lightness

Essa abordagem garante precisão na classificação cromática.

---

### 5.3 Regras de Validação

A validação segue critérios definidos:

1. Bloqueio de preto:
   - Lightness abaixo de determinado limiar é rejeitado.

2. Bloqueio de cores extremamente saturadas:
   - Saturação acima de limite máximo é rejeitada.

3. Aceitação de:
   - Tons de azul (faixa ampliada de Hue)
   - Tons de verde
   - Tons de amarelo
   - Tons de bege e marrom
   - Branco e cinza (baixa saturação)

Essa abordagem é baseada em intervalos numéricos de Hue combinados com limites de Saturation.

---

## 6. Personalização

O sistema foi projetado para ser altamente adaptável:

- A paleta pode ser alterada diretamente em `config.js`.
- O banner pode ser substituído para adequação temática.
- As faixas de validação podem ser redefinidas conforme a identidade visual desejada.

Isso permite reutilização em:

- Casamentos
- Festas temáticas
- Eventos corporativos
- Formaturas
- Lançamentos de marca

---

## 7. Reutilização e Aplicações Futuras

A lógica de validação pode ser aplicada como módulo complementar em:

- Softwares de organização de eventos
- Plataformas de RSVP
- Aplicações de consultoria de imagem
- Sistemas de design assistido
- Ferramentas educacionais sobre teoria das cores

A separação entre lógica de validação e interface gráfica facilita integração futura com:

- Frameworks frontend
- Aplicações mobile
- APIs externas

---

## 8. Considerações Técnicas

- Aplicação 100% estática.
- Compatível com dispositivos móveis e desktop.
- Hospedável via GitHub Pages.
- Não requer backend.

---

## 9. Conclusão

O projeto demonstra a aplicação prática de conceitos de:

- Teoria das cores
- Modelos matemáticos de conversão cromática
- Interação humano-computador
- Design responsivo
- Arquitetura modular em JavaScript

Além de cumprir sua finalidade para o evento específico, o sistema foi estruturado com foco em escalabilidade e reaproveitamento.

---

## Autora

Desenvolvido por Camila Menezes
