import { useEffect, useState } from "react";

export const useAxiosGet = (apiFn, page=undefined, payload=undefined) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(page, payload);

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFn(page, payload);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, payload]);

  return { data, error, isLoading };
};

export const useAxiosPost = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async ({ apiFn, formValues }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiFn(formValues);
      return response.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, error, isLoading };
};
