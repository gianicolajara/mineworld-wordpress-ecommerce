import { createContext, useEffect, useState } from "react";
import { lsKeyUser } from "../config/userConfig";
import { setItem } from "../lib/ls";
import { useRouter } from "next/router";
import axios from "axios";

const initialUserData = null;
const initialLoading = false;

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(initialLoading);

  const router = useRouter();

  const recoverUserData = async () => {
    setLoading(true);
    try {
      const resSignInWithToken = await axios.post("/api/login/signinwithtoken");

      if (resSignInWithToken.data.name === "not-token-auth") {
        setLoading(initialLoading);
        return;
      }

      const {
        data: { dataUser: userDataFromCookies },
      } = resSignInWithToken;

      if (userDataFromCookies) {
        setUserData({
          customer: {
            billing: userDataFromCookies?.billing,
            sessionToken: userDataFromCookies?.sessionToken,
            jwtAuthToken: userDataFromCookies?.jwtAuthToken,
            jwtRefreshToken: userDataFromCookies?.jwtRefreshToken,
          },
          user: {
            id: userDataFromCookies?.id,
            email: userDataFromCookies?.email,
            username: userDataFromCookies?.username,
            databaseId: userDataFromCookies?.databaseId,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(initialLoading);
  };

  useEffect(() => {
    recoverUserData();
  }, []);

  const handleSetUserData = (data) => {
    if (data) {
      setItem(lsKeyUser, data);
      setUserData(data);
    }
  };

  const modifyUserData = (data) => {
    if (data) {
      setUserData({ ...userData, ...data });
      setItem(lsKeyUser, { ...userData, ...data });
    }
  };

  const handleLogout = async () => {
    try {
      const resLogOut = await axios.post("/api/login/logout");

      if (resLogOut.status === 200) {
        setUserData(initialUserData);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    userData,
    handleSetUserData,
    handleLogout,
    modifyUserData,
    loading,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
