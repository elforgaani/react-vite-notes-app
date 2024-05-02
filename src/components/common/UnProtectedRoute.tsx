import { ReactNode } from 'react'
import { userAtom } from '../../atoms/userAtom';
import { useRecoilState } from 'recoil';
import { Navigate } from 'react-router-dom';
import { paths } from '../../router/app_router';

const UnProtectedRoute = ({ children }: { children: ReactNode }): ReactNode => {
    const [userToken] = useRecoilState(userAtom);
    if (userToken) {
        return <Navigate to={paths.home} />
    } else {
        return <>
            {children}
        </>
    }
}

export default UnProtectedRoute