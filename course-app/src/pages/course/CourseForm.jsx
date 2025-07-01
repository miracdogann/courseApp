import { Form, redirect, useActionData, useNavigation } from "react-router";
import { isRequiredChechk, isValidImage } from "../../utils/validation";

export default function CourseForm({ method, data }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const result = useActionData();
  return (
    <Form method={method}>
      {result && result.errors && (
        <ul className="erros">
          {Object.values(result.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div>
        <label htmlFor="title">Title : </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={data ? data.title : ""}
        />
        {result && result.title && <p>{result.title}</p>}
        <div>
          <label htmlFor="image">Image : </label>
          <input
            type="text"
            name="image"
            id="image"
            defaultValue={data ? data.image : ""}
          />
          {result && result.image && <p>{result.image}</p>}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={data ? data.description : ""}
          ></textarea>
          {result && result.description && <p>{result.description}</p>}
        </div>
      </div>
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Kayıt ediliyor" : "Kaydet"}
      </button>
    </Form>
  );
}

export async function courseAction({ request, params }) {
  const data = await request.formData();
  const method = request.method;
  let url = "http://localhost:5000/courses";
  if (method === "PUT") {
    const courseid = params.courseid;
    url = url + "/" + courseid;
  }
  // console.log("create edereken gelen veri", data.get("title"));
  const formData = {
    title: data.get("title"),
    image: data.get("image"),
    description: data.get("description"),
  };

  const errors = {};

  // if (!isRequiredChechk(formData.title)) {
  //   errors.title = "title alanı zorunlu";
  // }
  // if (!isValidImage(formData.image)) {
  //   errors.image = "İmage alanı zorunlu";
  // }
  // if (!isRequiredChechk(formData.description)) {
  //   errors.description = "Açıklama Alanı zorunlu";
  // }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const response = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    return redirect("/courses");
  }
  if (response.status === 403) {
    console.log(response);
    return response;
  }
}
