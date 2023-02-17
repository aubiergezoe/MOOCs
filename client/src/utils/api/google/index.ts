import { useEffect } from "react";
import axios from "axios";
import { setToken } from "../../index";

const baseURL = import.meta.env.VITE_API_BASEURL;
const googleID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
interface IProps {
  handleLoadingDashboard: () => void;
}
function GoogleLogin({ handleLoadingDashboard }: IProps) {
  async function handleGoogle(response:any) {
    try {
      handleLoadingDashboard();
      await axios({
        method: "post",
        url: `${baseURL}/auth/googlesignin`,
        headers: {
          Authorization: `Bearer ${response.credential}`,
          "Content-Type": "application/json",
        },
      }).then((responsedata) => {
        const tokenAccess = responsedata.data.token;
        setToken(tokenAccess);
        return window.location.assign("/dashboard");
      });
    } catch (error) {
      handleLoadingDashboard();
      return error;
    }

    return null;
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: googleID,
      callback: handleGoogle,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);
}

export default GoogleLogin;
