import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ProfilePage from "./pages/ProfilePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUpPage from "./pages/SignUpPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./ui_components/ProtectedRoutes";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<AppLayout isAuthenticated={isAuthenticated} />}
          >
            <Route index element={<HomePage />} />
            <Route path="blogs/:slug" element={<DetailPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route
              path="create"
              element={
                <ProtectedRoutes>
                  {" "}
                  <CreatePostPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="login"
              element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
