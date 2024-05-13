
import { RouterProvider } from 'react-router-dom'
import router from './router/app_router.tsx'
import { useEffect } from 'react'
import { userAtom } from './atoms/userAtom.ts'
import { useRecoilState } from 'recoil'
const App = () => {
  const [, setUserToken] = useRecoilState(userAtom);
  useEffect(() => {
    setUserToken(localStorage.getItem('token'))
  }, [])
  return <>
    <RouterProvider router={router}>
    </RouterProvider >
  </>
}

export default App
