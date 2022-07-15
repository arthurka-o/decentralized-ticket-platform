import React from "react";
import Layout from "./Layout";
import Routes from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Router>
        <Routes></Routes>
      </Router>
    </Layout>
  );
}

export default App;

