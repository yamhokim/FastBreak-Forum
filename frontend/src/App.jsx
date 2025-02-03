import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import SignUpPage from "./pages/SignUpPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./ui_components/ProtectedRoutes";
import { useEffect, useLayoutEffect, useState } from "react";
import { getUsername } from "./services/apiBlog";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(
    function () {
      if (data) {
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );

  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                isAuthenticated={isAuthenticated}
                username={username}
                setUsername={setUsername}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route
              path="profile/:username"
              element={<ProfilePage authUsername={username} />}
            />
            <Route
              path="blogs/:slug"
              element={
                <DetailPage
                  username={username}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="signup" element={<SignUpPage />} />
            <Route
              path="create"
              element={
                <ProtectedRoutes>
                  {" "}
                  <CreatePostPage isAuthenticated={isAuthenticated} />
                </ProtectedRoutes>
              }
            />
            <Route
              path="login"
              element={
                <LoginPage
                  setIsAuthenticated={setIsAuthenticated}
                  setUsername={setUsername}
                />
              }
            />
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;
