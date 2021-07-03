import { TopNav } from "../components/top-nav";

export function HomePage() {
  return (
    <div>
      <TopNav />

      <div className="text-center my-5 py-5">
        <h1 className="display-3 mb-4">Sample App</h1>
        <div>
          Sample app that shows how to use React and Bootstrap with a Flask API
          backend.
        </div>
      </div>
    </div>
  );
}
