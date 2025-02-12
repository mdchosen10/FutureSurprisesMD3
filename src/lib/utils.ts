export const getToken = () => {
  if (typeof window !== "undefined") {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      return userToken;
    }
  }
  return undefined;
};
