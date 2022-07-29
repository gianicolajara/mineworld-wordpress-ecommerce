import { useContext, useReducer, useState } from "react";
import Button from "../../components/Button";
import Wrapper from "../../components/Wrapper";
import { mutationCreateCustomer } from "../../utils/wordpress";
import Alert from "../Alert";
import LoginF from "./LoginF";
import RegisterF from "./RegisterF";
import { AnimatePresence } from "framer-motion";
import LoginHeader from "./LoginHeader";
import { UserContext } from "../../contexts/user.context";
import { useRouter } from "next/router";
import { validateFormLogin, validateFormRegister } from "../../config/regex";
import axios from "axios";

const TYPESLOGIN = {
  login: "Login",
  register: "Register",
};
const initialLoginForm = {
  username: "",
  password: "",
};
const initialRegisterForm = {
  username: "",
  email: "",
  password: "",
};
const initialErrors = null;
const initialSucess = null;

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [loginType, setLoginType] = useState(TYPESLOGIN.login);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [success, setSuccess] = useState(initialSucess);

  const { handleSetUserData } = useContext(UserContext);

  const router = useRouter();

  //without api
  const handleSubmitRegister = async () => {
    setLoading(true);
    try {
      const validateRes = validateFormRegister(registerForm, setErrors);

      if (!validateRes) {
        const res = await mutationCreateCustomer({
          customer: {
            username: registerForm?.username || "",
            email: registerForm?.email || "",
            password: registerForm?.password || "",
          },
        });

        setRegisterForm(initialRegisterForm);
        setErrors(initialErrors);
        setSuccess(
          "Usuario registrado correctamente revise su correo electronico"
        );
        setLoginType(TYPESLOGIN.login);
      }
    } catch (error) {
      setErrors(error?.message || "Error registrando usuario");
      console.log(error);
    }

    setLoading(false);
  };

  //with api
  const handleSubmitLogin = async () => {
    setLoading(true);
    try {
      const resValidation = validateFormLogin(loginForm, setErrors);

      if (!resValidation) {
        const res = await axios.post("/api/login/signin", {
          username: loginForm.username,
          password: loginForm.password,
        });
        setLoading(false);

        console.log("la respuesta es");
        console.log(res);

        setLoginForm(initialLoginForm);
        handleSetUserData(res?.data?.data);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setErrors(error?.response?.data?.message || "Error en el logeo");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginType === TYPESLOGIN.register) {
      handleSubmitRegister();
    } else if (loginType === TYPESLOGIN.login) {
      handleSubmitLogin();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors) {
      setErrors(initialErrors);
    }

    if (success) {
      setErrors(initialSucess);
    }

    if (loginType === TYPESLOGIN.login) {
      setLoginForm({ ...loginForm, [name]: value });
    } else {
      setRegisterForm({ ...registerForm, [name]: value });
    }
  };

  const handleToggleTypeForm = () => {
    if (errors) {
      setErrors(initialErrors);
    }

    if (success) {
      setErrors(initialSucess);
    }

    loginType === TYPESLOGIN.login
      ? setLoginType(TYPESLOGIN.register)
      : setLoginType(TYPESLOGIN.login);
  };

  return (
    <section>
      <Wrapper last>
        <div className="flex flex-col gap-3">
          <LoginHeader title={loginType} />
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {loginType === TYPESLOGIN.login ? (
              <LoginF
                loginForm={loginForm}
                handleChange={handleChange}
                errors={errors}
              />
            ) : (
              <RegisterF
                registerForm={registerForm}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            <div className="flex gap-3">
              <Button type="submit" loading={loading}>
                {loginType === TYPESLOGIN.login ? "Login" : "Register"}
              </Button>
              <Button onClick={handleToggleTypeForm} loading={loading}>
                {loginType === TYPESLOGIN.login
                  ? "Quiero Registarme"
                  : "Quiero Logearme"}
              </Button>
            </div>

            <AnimatePresence>
              {errors && errors.length > 0 && (
                <Alert messages={errors} type="error" setMessage={setErrors} />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {success && (
                <Alert
                  messages={success}
                  type="success"
                  setMessage={setSuccess}
                />
              )}
            </AnimatePresence>
          </form>
        </div>
      </Wrapper>
    </section>
  );
};

export default LoginForm;
