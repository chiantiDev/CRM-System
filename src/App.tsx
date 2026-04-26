import {Routes, Route} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import TodosPage from "./pages/TodosPage/TodosPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<TodosPage />} />
          <Route path="profilepage" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  )
};

export default App;