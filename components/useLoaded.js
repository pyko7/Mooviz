import { useEffect, useState } from "react";

/* I rendered something based on a condition read from localStorage, which was only defined on the client. On server, it returned undefined, so what was rendered on the client and the server did not match.
The error was: "prop `d` did not match"
solution found on : https://stackoverflow.com/questions/55271855/react-material-ui-ssr-warning-prop-d-did-not-match-server-m-0-0-h-24-v-2*/

export const useLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);
  return loaded;
};
