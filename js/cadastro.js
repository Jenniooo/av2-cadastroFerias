document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const senha = form.senha.value.trim();
        const confirmar = form.confirmar.value.trim();

        let valid = true;

        clearErrors();

        // Nome
        if (nome.length < 3) {
            showError(form.nome, "O nome deve ter pelo menos 3 caracteres.");
            valid = false;
        }

        // Email
        if (!validateEmail(email)) {
            showError(form.email, "Digite um e-mail válido.");
            valid = false;
        }

        // Senha
        if (senha.length < 6) {
            showError(form.senha, "A senha deve ter no mínimo 6 caracteres.");
            valid = false;
        }

        // Confirmar senha
        if (senha !== confirmar) {
            showError(form.confirmar, "As senhas não coincidem.");
            valid = false;
        }

        if (valid) {

            // ⬇️ AQUI ENTRA A PARTE NOVA (SALVAMENTO LOCAL)
            const contas = JSON.parse(localStorage.getItem("contas")) || [];

            if (contas.some(user => user.email === email)) {
                alert("Esse e-mail já está cadastrado!");
                return;
            }

            contas.push({ nome, email, senha });
            localStorage.setItem("contas", JSON.stringify(contas));

            alert("Conta criada com sucesso!");
            window.location.href = "login.html";
        }
    });

});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(input, message) {
    input.classList.add("error");

    let errorMsg = document.createElement("span");
    errorMsg.classList.add("error-message");
    errorMsg.innerText = message;

    input.parentElement.appendChild(errorMsg);
}

function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
}
