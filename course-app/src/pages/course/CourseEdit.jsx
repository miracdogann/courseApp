import { data, useRouteLoaderData } from "react-router";
import CourseForm from "./CourseForm";

export default function CourseEditPage() {
  const courses = useRouteLoaderData("course-details");

  return <CourseForm method={"PUT"} data={courses} />;
}
