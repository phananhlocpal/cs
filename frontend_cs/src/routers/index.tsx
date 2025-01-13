import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage, LoginPage, NotFoundPage, RequestListPage } from "@/pages";
import { BasicLayout } from "@/shared";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/requests" element={<RequestListPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;