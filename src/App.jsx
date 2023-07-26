import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import UpdatePost from "./UpdatePost";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  // Redundant
  /*  // Get data from api
  useEffect(() => {
    // fetch data
    const fetchPosts = async () => {
      try {
        // get data
        const response = await api.get("/posts");
        // Check if we get response from unreliable data source
        // if(response && response.data) setPosts(response.data);
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          // can use these to log || just log err.message
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchPosts();
  }, []);*/
  // Search Bar

  return (
    <DataProvider>
      <Routes>
        {/* Template of website */}
        <Route path="/" element={<Layout />}>
          {/* Main Page */}
          <Route index element={<Home />} />

          {/* Post Route */}
          <Route path="post">
            {/* Main */}
            <Route index element={<NewPost />} />

            {/* Individual post route */}
            <Route path=":id" element={<PostPage />} />
          </Route>

          {/* Edit Route */}
          <Route path="edit">
            <Route index path=":id" element={<UpdatePost />} />
          </Route>

          {/* Static Pages - about and missing */}
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
