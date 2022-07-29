import Aboutus from "../components/Aboutus";
import Heroe from "../components/Heroe";
import GeneralLayout from "../components/layouts/generalLayout";

export default function Home() {
  return (
    <div>
      <Heroe />
      <Aboutus />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
