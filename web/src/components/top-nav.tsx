export function TopNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Home
        </a>

        <div className="navbar-nav me-auto">
          <a className="nav-link" href="/dashboard">
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
}
