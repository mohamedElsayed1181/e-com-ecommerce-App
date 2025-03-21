import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"


export default function ProtectedRoute({children}:{children:React.ReactNode}) {
    const {accessToken}=useAppSelector(state=>state.auth)
    if (!accessToken) {
      return  <Navigate to="/login"/>
    }
  return (
    <>
      {children}
    </>
  )
}
