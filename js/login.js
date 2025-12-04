const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = form.email.value;
    const senha = form.senha.value;

    // Carrega contas registradas no cadastro
    const contas = JSON.parse(localStorage.getItem("contas")) || [];

    // Verifica se a conta existe
    const usuarioValido = contas.find(user => user.email === email && user.senha === senha);

    if (!usuarioValido) {
        alert("Email ou senha incorretos!");
        return;
    }

    // Salva o usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

    // Vai para o index
    window.location.href = "index.html";
});
