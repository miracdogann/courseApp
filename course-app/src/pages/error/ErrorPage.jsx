import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "Safya bulunamadı";
  let message = "içerik yok";
  if (error.status === 404) {
    title = "Not Found Error";
    message = "Aradığınız kaynak bulunamadı";
  }
  return (
    <div id="error">
      <h1>{title}</h1>
      <h2>{message}</h2>
    </div>
  );
}
