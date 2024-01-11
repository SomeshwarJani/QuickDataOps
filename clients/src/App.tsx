import UserForm from "./Components/UserDetailForm/UserForm";
import TabularView from "./Components/UserTable/Table";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ROUTES } from "./constants";
import ErrorBoundary from "./ErrorBoundary";

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path={`${ROUTES.HOME}`} element={<UserForm />} />
            <Route path={`${ROUTES.USERDATA}`} element={<TabularView />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
};

export default App;
