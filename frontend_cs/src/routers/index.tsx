import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChatPage, HomePage, LoginPage, NotFoundPage, RequestListPage, AccountPage, OAuthCallback, PublicPage, CustomerPage, UserPage } from "@/pages";
import { BasicLayout } from "@/shared";

const RouterComponent = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/requests" element={<RequestListPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/users" element={<UserPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route path="/public" element={<PublicPage />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;