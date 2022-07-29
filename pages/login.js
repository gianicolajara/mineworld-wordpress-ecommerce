import LoginForm from "../components/LoginForm";
import Wrapper from "../components/Wrapper";
import { useRouter } from "next/router";
import GeneralLayout from "../components/layouts/generalLayout";
import Cookies from "js-cookie";

const Login = () => {
  return (
    <section>
      <Wrapper last>
        <LoginForm />
      </Wrapper>
    </section>
  );
};

Login.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getServerSideProps = async (ctx) => {
  const token = ctx.req.cookies["X-JWT-Auth"] || null;

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
