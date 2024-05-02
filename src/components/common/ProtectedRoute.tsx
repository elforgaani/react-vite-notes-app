import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../../atoms/userAtom'
import { Navigate } from 'react-router-dom';
import { paths } from '../../router/app_router';

const ProtectedRoute = ({ children }: { children: ReactNode }): ReactNode => {
    const [userToken] = useRecoilState(userAtom);
    if (!userToken) {
        return <Navigate to={paths.signIn} />
    } else {
        return <>
            {children}
        </>
    }
}

export default ProtectedRoute