import { useState } from "react";

export function ErrorMessage({ error }) {
  // const [error, setError] = useState();
  return <p className="error">{error}</p>;
}
