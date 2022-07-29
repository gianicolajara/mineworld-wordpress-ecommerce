import Button from "../Button";
import Input from "../Input";
import Subtitle from "../Subtitle";
import Wrapper from "../Wrapper";
import countries from "countries-list";
import { useContext, useEffect } from "react";
import { useState } from "react";
import SelectOption from "../SelectOption";
import { UserContext } from "../../contexts/user.context";
import { mutationCustomer } from "../../utils/wordpress";
import Alert from "../Alert";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "../Loader";

const initialFormFacturacion = {
  firstname: "",
  lastname: "",
  country: {
    label: "",
    value: "",
  },
};

const initialFormErrorsFacturacion = null;
const initialLoading = false;

const BillInformation = ({ handleNext = () => {} }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [formFacturacion, setFormFacturacion] = useState(
    initialFormFacturacion
  );
  const [errors, setErrors] = useState(initialFormErrorsFacturacion);
  const [loading, setLoading] = useState(initialLoading);
  const [sucessMessage, setSucessMessage] = useState(null);

  const { userData, modifyUserData } = useContext(UserContext);

  const handleChangeFormFacturacion = (e, action) => {
    if (action) {
      setFormFacturacion({
        ...formFacturacion,
        [action.name]: {
          value: e.value,
          label: e.label,
        },
      });
    } else {
      const { name, value } = e.target;

      setFormFacturacion({ ...formFacturacion, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    filterInputs();

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/customer/updateCustomer", {
        newCustomer: {
          firstname: formFacturacion.firstname || "",
          lastname: formFacturacion.lastname || "",
          country: formFacturacion.country.value || "",
        },
        userData,
      });

      if (res.status === 200) {
        modifyUserData({
          customer: res?.data?.customer || null,
        });
        setSucessMessage("Usuario actualizado correctamente");
      } else {
        setErrors("Error actualizando usuario");
      }
    } catch (error) {
      console.error(error);
      setErrors("Error actualizando usuario");
    }

    setLoading(false);
  };

  const filterInputs = () => {
    if (formFacturacion.firstname === "") {
      setErrors((prev) => ({
        ...prev,
        "firstname": "Este campo es requerido",
      }));
    } else {
      setErrors((prev) => {
        const { firstname, ...newItems } = prev;
        return newItems;
      });
    }

    if (formFacturacion.lastname === "") {
      setErrors((prev) => ({
        ...prev,
        "lastname": "Este campo es requerido",
      }));
    } else {
      setErrors((prev) => {
        const { lastname, ...newItems } = prev;
        return newItems;
      });
    }

    if (formFacturacion.country.value === "") {
      setErrors((prev) => ({
        ...prev,
        "country": "Este campo es requerido",
      }));
    } else {
      setErrors((prev) => {
        const { country, ...newItems } = prev;
        return newItems;
      });
    }
  };

  const handleNextStep = () => {
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    handleNext();
  };

  useEffect(() => {
    filterInputs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFacturacion]);

  useEffect(() => {
    if (userData) {
      const countryCodes = Object.keys(countries.countries);

      setCountriesData([]);
      setCountriesData(
        countryCodes.map((code) => ({
          value: code,
          label: countries.countries[code].name,
        }))
      );

      const country = countries.countries[userData?.customer?.billing?.country];

      setFormFacturacion({
        firstname: userData?.customer?.billing?.firstName || "",
        lastname: userData?.customer?.billing?.lastName || "",
        country: {
          label: country?.name || "",
          value: userData?.customer?.billing?.country || "",
        },
      });
    }
  }, [userData]);

  return (
    <section>
      <Wrapper last>
        <div className="mb-5">
          <Subtitle>Detalles de facturación</Subtitle>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            labelText="Nombre"
            name="firstname"
            placeholder="Nombre"
            value={formFacturacion.firstname}
            onChange={handleChangeFormFacturacion}
            error={errors?.firstname}
          />
          <Input
            labelText="Apellido"
            name="lastname"
            placeholder="Apellido"
            value={formFacturacion.lastname}
            onChange={handleChangeFormFacturacion}
            error={errors?.lastname}
          />
          <SelectOption
            label="Pais"
            options={countriesData}
            value={formFacturacion.country}
            onChange={handleChangeFormFacturacion}
            name="country"
            error={errors?.country}
          />
          <div className="flex gap-3">
            <Button type="submit" loading={loading}>
              Guardar
            </Button>
            {userData?.customer?.billing?.country &&
              userData?.customer?.billing?.firstName &&
              userData?.customer?.billing?.lastName && (
                <Button onClick={handleNextStep}>Siguiente</Button>
              )}
          </div>
          {sucessMessage && (
            <Alert
              messages={sucessMessage}
              type="success"
              setMessage={setSucessMessage}
            />
          )}
        </form>
      </Wrapper>
    </section>
  );
};

BillInformation.propTypes = {
  handleNext: PropTypes.func,
};

export default BillInformation;
