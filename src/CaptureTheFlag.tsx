import React from "react";
import { useFetch } from "./use-fetch";
import { Loading } from "./Loading";
import { Typewriter } from "./TypeWriter";

/**
 * Retrieve the flag from the provided url
 * Handle loading, error & success states
 */
export const CaptureTheFlag: React.FC<{ url: string }> = ({ url }) => {
  const { data, status, errorMessage } = useFetch(url);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>Error: {errorMessage}</div>;
  }

  if (status === "success" && data) {
    return <Typewriter word={data} />;
  }

  return <div>no flag received</div>;
};
