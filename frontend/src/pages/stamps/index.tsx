import { useTitle } from "../../context/title-context";
import { useEffect } from "react";

export default function Stamps() {

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Stamps');
  }, [setTitle]);

  return (
    <>
      <h1>Stamps</h1>
    </>
  );
}