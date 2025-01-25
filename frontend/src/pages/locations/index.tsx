import { useEffect } from "react";
import { useTitle } from "../../context/title-context";

export default function Locations() {

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Locations');
  }, [setTitle]);

  return (
    <>
      <h1>Locations</h1>
    </>
  );
}

