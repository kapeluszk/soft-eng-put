import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        TICKET SYSTEM
      </Link>
      <ul>
        <CustomLink to="/user">Strona użytkownika</CustomLink>
        <CustomLink to="/agent">Strona agenta</CustomLink>
        <CustomLink to="/agent-leader">Strona lidera</CustomLink>
        <CustomLink to="/admin">Strona admina</CustomLink>
        <CustomLink to="/login">Login</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}