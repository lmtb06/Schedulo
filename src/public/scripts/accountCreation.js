async function validateAccountCreation() {
    const accountForm = document.forms.accountCreation;
    const emailMessage = document.getElementById("emailMessage");
    const preventionPassword = document.getElementById("preventionPassword");
    const passwordRepeated = document.getElementById("passwordRepeated");
    const regexpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    preventionPassword.textContent = "";
    emailMessage.textContent = "";
    if(!(document.getElementById("email").value.match(regexpEmail))){
        emailMessage.textContent="L'email n'est pas valide ";
    }
    else if (accountForm.password.value.length < 8) {
        preventionPassword.textContent = "Le mot de passe doit contenir au moins 8 caractères.";
    } else if (accountForm.password.value != passwordRepeated.value) {
        preventionPassword.textContent = "Les mots de passe ne correspondent pas.";
    } else {
        const rawValue = accountForm.password.value;
        accountForm.password.value = await hashSHA256(rawValue);
        accountForm.submit();
        accountForm.password.value = rawValue;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const accountForm = document.forms.accountCreation;

    if (!accountForm) {
        console.error("Formulaire introuvable !");
        return;
    }

    accountForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await validateAccountCreation();
    });
});

