import { useState, useEffect } from "react";
import Pet from "../services/dto/Pet";

const usePets = <T = Pet>(
  fetchFn: (args: any | undefined) => Promise<T>,
  args: any = undefined
) => {
  const [pets, setPets] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState<boolean>(true);
  const update = () => {
    setRefresh(true);
  };

  useEffect(() => {
    if (refresh)
      (async () => {
        try {
          setLoading(true);
          await fetchFn(args).then((data) => setPets(data));
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      })();
    setRefresh(false);
  }, [args, refresh, fetchFn]);

  return { pets, loading, error, update };
};

export default usePets;
