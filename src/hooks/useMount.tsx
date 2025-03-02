import { useEffect, useState } from "react";

const useMount = () => {
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount;
};

export default useMount;
