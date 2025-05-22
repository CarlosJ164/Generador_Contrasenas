function generatePassword() {
  const length = +document.getElementById("length").value;

  if (length > 32) {
    alert("La longitud máxima es de 32 caracteres");
    return;
  }

  const useLowercase = document.getElementById("lowercase").checked;
  const useUppercase = document.getElementById("uppercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}<>?.,";
  
  let chars = "";
  if (useLowercase) chars += lower;
  if (useUppercase) chars += upper;
  if (useNumbers) chars += numbers;
  if (useSymbols) chars += symbols;

  if (chars.length === 0) {
    alert("⚠️ Debes seleccionar al menos una opción de caracteres. ⚠️");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  document.getElementById("password").value = password;
  evaluateStrength(length, useLowercase, useUppercase, useNumbers, useSymbols);
}

function evaluateStrength(length, lower, upper, number, symbol) {
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");
  const text = document.getElementById("strength-text");

  [bar1, bar2, bar3].forEach(bar => bar.style.backgroundColor = "#222");

  let score = 0;
  if (lower) score++;
  if (upper) score++;
  if (number) score++;
  if (symbol) score++;
  if (length >= 12) score++;

  if (score >= 5) {
    bar1.style.backgroundColor = "#39ff14";
    bar2.style.backgroundColor = "#39ff14";
    bar3.style.backgroundColor = "#39ff14";
    text.textContent = "Contraseña muy segura";
    text.style.color = "#39ff14";
  } else if (score >= 3) {
    bar1.style.backgroundColor = "#ffff33";
    bar2.style.backgroundColor = "#ffff33";
    bar3.style.backgroundColor = "#222";
    text.textContent = "Contraseña segura";
    text.style.color = "#ffff33";
  } else {
    bar1.style.backgroundColor = "#ff3131";
    bar2.style.backgroundColor = "#222";
    bar3.style.backgroundColor = "#222";
    text.textContent = "Contraseña poco segura";
    text.style.color = "#ff3131";
  }
}

function copyPassword() {
  const passwordField = document.getElementById("password");
  passwordField.select();
  document.execCommand("copy");
  alert("¡Contraseña copiada al portapapeles!");
}