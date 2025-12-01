// TEMA (LIGHT / DARK)
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeIcon.classList.toggle("fa-sun");
  themeIcon.classList.toggle("fa-moon");
});

// MODAL DO FORMULÁRIO
const openForm = document.getElementById("open-form");
const modal = document.getElementById("form-modal");
const form = document.getElementById("ferias-form");

openForm.addEventListener("click", () => {
  modal.style.display = "flex";
});

// fechar modal clicando fora
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// LISTA DE FÉRIAS
const listaFerias = document.getElementById("lista-ferias");

// Carrega do localStorage ou inicia vazio
let ferias = JSON.parse(localStorage.getItem("ferias")) || [];

// saldo inicial do funcionário
let saldoFuncionario = 30;

// inputs do formulário
const inicioInput = document.getElementById("inicio");
const fimInput = document.getElementById("fim");
const diasSolicitadosInput = document.getElementById("dias-solicitados");

// CRIA UM CARD NA TELA
function criarCard(item, index) {
  const card = document.createElement("div");
  card.classList.add("card-ferias");

  card.innerHTML = `
    <div class="card-info">
      <p><strong>Nome:</strong> ${item.nome}</p>
      <p><strong>Início:</strong> ${item.inicio}</p>
      <p><strong>Fim:</strong> ${item.fim}</p>
      <p><strong>Dias Solicitados:</strong> ${item.diasSolicitados}</p>
      <p><strong>Situação:</strong> ${item.situacao}</p>
      <p><strong>Saldo Restante:</strong> ${item.saldo}</p>
    </div>
    <div class="card-actions">
      <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
    </div>
  `;

  listaFerias.appendChild(card);
}

// MOSTRA OS CARDS
function renderizar() {
  listaFerias.innerHTML = "";
  ferias.forEach((item, index) => criarCard(item, index));
}

renderizar();

// SALVAR NO LOCALSTORAGE
function salvar() {
  localStorage.setItem("ferias", JSON.stringify(ferias));
}

// CÁLCULO AUTOMÁTICO DE DIAS DE FÉRIAS
function calcularDias() {
  const inicio = new Date(inicioInput.value);
  const fim = new Date(fimInput.value);

  if (inicio && fim && fim >= inicio) {
    const diffTime = fim.getTime() - inicio.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclui o dia inicial
    diasSolicitadosInput.value = diffDays;

    // valida saldo
    if (diffDays > saldoFuncionario) {
      diasSolicitadosInput.style.border = "2px solid red";
    } else {
      diasSolicitadosInput.style.border = "";
    }
  } else {
    diasSolicitadosInput.value = 0;
    diasSolicitadosInput.style.border = "";
  }
}

// Atualiza ao alterar datas
inicioInput.addEventListener("change", calcularDias);
fimInput.addEventListener("change", calcularDias);

// SUBMISSÃO DO FORMULÁRIO
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const inicio = inicioInput.value;
  const fim = fimInput.value;
  const situacao = document.getElementById("situacao").value;
  const diasSolicitados = parseInt(diasSolicitadosInput.value);

  // valida se solicitou mais dias do que o saldo
  if (situacao === "Aprovado" && diasSolicitados > saldoFuncionario) {
    alert("Não é possível solicitar mais dias do que o saldo disponível!");
    return;
  }

  // calcula saldo restante
  let saldoCard;
  if (situacao === "Aprovado") {
    saldoFuncionario -= diasSolicitados; // atualiza saldo global
    saldoCard = saldoFuncionario;
  } else {
    saldoCard = saldoFuncionario; // pendente não gasta saldo
  }

  // salva no array e no localStorage
  ferias.push({ nome, inicio, fim, situacao, diasSolicitados, saldo: saldoCard });
  salvar();
  renderizar();

  form.reset();
  diasSolicitadosInput.value = "";
  modal.style.display = "none";
});

// DELETAR CARD
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let index = e.target.getAttribute("data-index");
    ferias.splice(index, 1);
    salvar();
    renderizar();
  }
});
