export const SECURE_PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

export const validatePassword = (password) => {
  if (password.length === 0) {
    return "El campo Password no puede estar vacio";
  }
  if (!SECURE_PASSWORD_REGEX.test(password)) {
    return "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero";
  }

  return "";
};

export const validateUsername = (username) => {
  if (username.length === 0) {
    return "El campo Username no puede estar vacio";
  }

  if (!USERNAME_REGEX.test(username)) {
    return "El username debe tener solo letras y numeros";
  }

  return "";
};

export const validateLoginApi = (registerForm, setError) => {
  const validationUsername = validateUsername(registerForm.username);
  const validationPassword = validatePassword(registerForm.password);

  if (validationUsername) {
    return validationUsername;
  }

  if (validationPassword) {
    return validationPassword;
  }

  return false;
};
