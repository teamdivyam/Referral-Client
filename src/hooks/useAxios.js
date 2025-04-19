import { useEffect, useState } from "react";

export const useAxiosGet = (apiFn, page = undefined, payload = undefined) => {
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


// Testing purpose only
export const useFetch = ({ apiFn }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiFn();

        setData(response.data);
        return response;
      } catch (error) {
        setError(
          error.response?.data?.error?.message ||
            "Error in fetching data! Try agin later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export const useFetchPost = (apiFn) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPostData = async (formValues) => {
    setLoading(true);
    try {
      const response = await apiFn(formValues);
      return response;
    } catch (error) {
      setError(
        error.response?.data?.error?.message ||
          "There is an error to perform action! Try again later"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, fetchPostData };
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
