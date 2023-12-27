import { useState, useEffect } from "react";

// avoid impossible states by combining all boolean states in one field
type FetchStatus = "loading" | "success" | "error";

interface FetchResult<T> {
  data: string | null;
  status: FetchStatus;
  errorMessage: string | null;
}

export function useFetch(url: string): FetchResult<string> {
  const [data, setData] = useState<string | null>(null);
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      setErrorMessage(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.text();
        setData(result);
        setStatus("success");
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(
            error?.message ?? "An error occurred fetching url contents"
          );
        } else {
          console.error({ error });
          setErrorMessage("unknown error");
        }

        setStatus("error");
      }
    };

    fetchData();
  }, [url]);

  return { data, status, errorMessage };
}
