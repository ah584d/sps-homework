import { useContext } from 'react';
import { useJwt } from 'react-jwt';
import { AuthContext } from '../../providers/authProvider';
import { AuthContextType } from '../../types/common .types';

export const useAuth = () => {
    const tokenAction = useContext<AuthContextType>(AuthContext);
    const { isExpired, reEvaluateToken } = useJwt(tokenAction.token ?? '');

    return { ...tokenAction, isExpired, reEvaluateToken };
};
