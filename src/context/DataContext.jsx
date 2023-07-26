import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

// children - component that use the context
export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // To work with the data
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // Search Bar
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  

  

  
  return (
    <DataContext.Provider
      value={{
        // put prop here for usage
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
