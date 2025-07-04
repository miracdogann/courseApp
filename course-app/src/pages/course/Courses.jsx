import { Link, redirect, useLoaderData, useSubmit } from "react-router";
export default function CoursesPage() {
  const courses = useLoaderData();
  const submit = useSubmit();
  function handleDelete(id) {
    const confirm = window.confirm("Silmek istediğinize emin misiniz ? ");

    if (confirm) {
      submit(null, {
        method: "DELETE",
        action: "/courses/" + id + "/delete",
      });
    }
  }
  return (
    <>
      <div id="course">
        <h1>Course</h1>
        {courses.map((item) => (
          <div key={item.id} className="card">
            <img src={`http://localhost:5000/images/${item.image}`} alt="" />
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <Link to={"/courses/" + item.id}>Detay</Link>
              <Link to={item.id + "/edit"}>Edit</Link>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function CoursesLoader() {
  const res = await fetch("http://localhost:5000/courses");
  return res.json();
}

export async function courseDeleteAction({ params, request }) {
  const { courseid } = params;
  const res = await fetch("http://localhost:5000/courses/" + courseid, {
    method: request.method,
  });
  if (res.ok) {
    return redirect("/courses");
  }
}
