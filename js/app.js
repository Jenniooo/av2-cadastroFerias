// TEMA (LIGHT / DARK)
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeIcon.classList.toggle("fa-sun");
  themeIcon.classList.toggle("fa-moon");
});

// MODAL
const openForm = document.getElementById("open-form");
const modal = document.getElementById("form-modal");
const form = document.getElementById("ferias-form");

openForm.addEventListener("click", () => {
  modal.style.display = "flex";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// LISTA E LOCAL STORAGE
const listaFerias = document.getElementById("lista-ferias");
let ferias = JSON.parse(localStorage.getItem("ferias")) || [];

// INPUTS
const inicioInput = document.getElementById("inicio");
const fimInput = document.getElementById("fim");
const diasSolicitadosInput = document.getElementById("dias-solicitados");

// CALCULA DIAS AUTOMATICAMENTE
function calcularDias() {
  const inicio = new Date(inicioInput.value);
  const fim = new Date(fimInput.value);

  if (inicio && fim && fim >= inicio) {
    const diffTime = fim.getTime() - inicio.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    diasSolicitadosInput.value = diffDays;
  } else {
    diasSolicitadosInput.value = 0;
  }
}

inicioInput.addEventListener("change", calcularDias);
fimInput.addEventListener("change", calcularDias);

// CRIAR CARD
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
    </div>

    <div class="card-actions">
      <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
    </div>
  `;

  listaFerias.appendChild(card);
}

// RENDERIZAR
function renderizar() {
  listaFerias.innerHTML = "";
  ferias.forEach((item, index) => criarCard(item, index));
}

renderizar();

// SALVAR
function salvar() {
  localStorage.setItem("ferias", JSON.stringify(ferias));
}

// SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const inicio = inicioInput.value;
  const fim = fimInput.value;
  const situacao = document.getElementById("situacao").value;
  const diasSolicitados = parseInt(diasSolicitadosInput.value);

  ferias.push({ 
    nome, 
    inicio, 
    fim, 
    diasSolicitados, 
    situacao
  });

  salvar();
  renderizar();

  form.reset();
  diasSolicitadosInput.value = "";
  modal.style.display = "none";
});

// DELETAR
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let index = e.target.getAttribute("data-index");
    ferias.splice(index, 1);
    salvar();
    renderizar();
  }
});
