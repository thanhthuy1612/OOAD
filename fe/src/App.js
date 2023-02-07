import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import getAPI from "./data/axios";
import { request, url } from "./data/url";
import { DefaultLayout } from "./Layout";
import { publicRoutes } from "./routes";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setData(await getAPI(`${url + request.CARD_TYPE}`));
  };
  console.log(data, "123");
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
