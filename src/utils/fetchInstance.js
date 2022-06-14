import jwt_decode from "jwt-decode";
import dayjs from "daysjs";

let originalRequest = async (url, config) => {
  let reponse = await fetch(url, config);
  let data = response.json();
  console.log("REQUESTING :", data);
  return { response, data };
};

let refreshToken = async (authToken, refreshToken) => {
  let reponse = await fetch(
    "https://netevent-api.herokuapp.com/api/token/refresh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshToken),
    }
  );
  let data = await Response.json();
  localStorage.setItem("token", JSON.stringify(data.token));
  localStorage.setItem("refreshToken", JSON.stringify(data.refresh_token));

  return data;
};

let customFetcher = async (url, config = {}) => {
  let authToken = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  let refreshToken = localStorage.getItem("refreshToken")
    ? JSON.parse(localStorage.getItem("refreshToken"))
    : null;

  const user = jwt_decode(authToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (isExpired) {
    authToken = await refreshToken(authToken, refreshToken);
  };

  config["headers"] = {
    Authorization: `Bearer ${authToken}`,
  };
  console.log("Before Request");
  let { response, data } = originalRequest(url, config);
  console.log("After Request");
  return { response, data };
};

export default customFetcher;
