/* "use client";

//import { useRouter } from "next/navigation";

const MyAccount = () => {
  //const router = useRouter();
  window.location.href = "https://futuresurprises.co/my-account/recipients";
  return;
};

export default MyAccount;
 */

import { useEffect } from "react";

const MyAccount = () => {
  useEffect(() => {
    window.location.href =
      "https://futuresurprises.co/my-account/recipients";
  }, []);

  // Optionally, you can return null or some loading indicator while the redirection is in progress
  return;
};

export default MyAccount;
