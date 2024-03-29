import './App.css'
import Header from './components/Header'
import Post from "./components/Post"

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import FrontPage from './pages/FrontPage';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog'
import ViewBlog from './pages/ViewBlog';
import AllBlogPage from './pages/AllBlogPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<FrontPage />} />
      <Route path='allblogs' element={<AllBlogPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="create" element={<CreateBlog />} />
      <Route path="blog/:id" element={<ViewBlog />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);






function App() {

  return <RouterProvider router={router} />
}

export default App
