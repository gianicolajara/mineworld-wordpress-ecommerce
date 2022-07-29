export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const SECURE_PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

export const validateEmail = (email) => {
  if (email.length === 0) {
    return "El campo Email no puede estar vacio";
  }
  if (!EMAIL_REGEX.test(email)) {
    return "El email no es valido";
  }
  return "";
};

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

export const validateFormRegister = (registerForm, setError) => {
  const validationUsername = validateUsername(registerForm.username);
  const validationEmail = validateEmail(registerForm.email);
  const validationPassword = validatePassword(registerForm.password);

  if (validationUsername) {
    setError({
      username: validationUsername,
    });
    return true;
  }

  if (validationEmail) {
    setError({
      email: validationEmail,
    });
    return true;
  }

  if (validationPassword) {
    setError({
      password: validationPassword,
    });
    return true;
  }

  return false;
};

export const validateFormLogin = (registerForm, setError) => {
  const validationUsername = validateUsername(registerForm.username);
  const validationPassword = validatePassword(registerForm.password);

  if (validationUsername) {
    setError &&
      setError({
        username: validationUsername,
      });
    return true;
  }

  if (validationPassword) {
    setError &&
      setError({
        password: validationPassword,
      });
    return true;
  }

  return false;
};
