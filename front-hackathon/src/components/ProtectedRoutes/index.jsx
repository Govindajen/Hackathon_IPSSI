export default function ProtectedRoutes ({ children }) {
    const user = localStorage.getItem('user')

  return (
    <>
        {!user ? children : <Redirect to="/login" />}
    </>
  )
}