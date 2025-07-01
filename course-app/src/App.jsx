import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import CoursesPage, {
  courseDeleteAction,
  CoursesLoader,
} from "./pages/course/Courses";
import MainLayout from "./layouts/MainLayout";
import HelpLayout from "./layouts/HelpLayout";
import FaqPage from "./pages/help/Faq";
import ContactPage from "./pages/help/Contact";
import CourseDeatilsPage, {
  CourseDeatilsLoader,
} from "./pages/course/CourseDeatils";
import CourseLayout from "./layouts/CourseLayout";
import CourseCreatePage from "./pages/course/CourseCreate";
import CourseEditPage from "./pages/course/CourseEdit";
import { courseAction } from "./pages/course/CourseForm";
import NotFoundPage from "./pages/error/NotFoundPage";
import ErrorPage from "../src/pages/error/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
      {
        path: "courses",
        element: <CourseLayout />,
        errorElement: <ErrorPage />,

        children: [
          { index: true, element: <CoursesPage />, loader: CoursesLoader },

          {
            id: "course-details",
            path: ":courseid",
            loader: CourseDeatilsLoader,
            children: [
              {
                index: true, // id gelir
                element: <CourseDeatilsPage />,
              },
              {
                path: "edit",
                element: <CourseEditPage />,
                action: courseAction,
              },
              {
                path: "delete",
                action: courseDeleteAction,
              },
            ],
          },

          {
            path: "create",
            element: <CourseCreatePage />,
            action: courseAction,
          },
        ],
      },

      {
        path: "help",
        element: <HelpLayout />,
        children: [
          { path: "contact", element: <ContactPage /> },
          { path: "faq", element: <FaqPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
