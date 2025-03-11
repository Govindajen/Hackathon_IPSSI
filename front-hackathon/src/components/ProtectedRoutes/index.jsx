import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function ProtectedRoutes ({ children }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const decoded = auth.user && jwtDecode(auth.user?.token)


  if (decoded?.exp * 1000 < Date.now()) {
    dispatch(logout())

    navigate('/login')
  }


  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login')
    }
  }, [auth, navigate])

  return (
    <>
        {auth.isAuthenticated ? children : null}
    </>
  )
}