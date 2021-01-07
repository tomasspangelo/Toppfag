import { useState, useEffect, useCallback, useRef } from "react";

import axios from "axios";

const useFetch = (query, currentUrl) => {
  const [results, setResults] = useState([]);
  //   const [totalResults, setTotalResults] = useState(0);
  //   const [totalPages, setTotalPages] = useState(0);
  //   const [currentPageNo, setCurrentPageNo] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getPagesCount = (total, denominator) => {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  let cancel = useRef("");
  let nextUrl = useRef("");
  let previousUrl = useRef("");
  let totalPages = useRef(0);
  const getData = useCallback(() => {
    const searchURL = currentUrl;

    if (cancel.current) {
      cancel.current.cancel();
    }
    cancel.current = axios.CancelToken.source();

    axios
      .get(searchURL, {
        cancelToken: cancel.current.token,
      })
      .then((response) => {
        const total = response.data.count;
        const resultNotFoundMsg = !response.data.count
          ? "There are no more search results. Please try a new search."
          : "";

        setResults(response.data.results);
        previousUrl.current = response.data.previous;
        nextUrl.current = response.data.next;
        totalPages.current = getPagesCount(total, 20);

        setMessage(resultNotFoundMsg);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!axios.isCancel(error) && error) {
          setIsLoading(false);
          setMessage("Nettverksfeil.");
        }
      });
  }, [currentUrl]);

  useEffect(() => {
    if (currentUrl) {
      setIsLoading(true);
      setMessage("");
      getData();
    }
  }, [currentUrl, query, getData]);
  return { results, isLoading, message, previousUrl, nextUrl, totalPages };
};

export default useFetch;
