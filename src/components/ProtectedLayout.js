import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../redux/reducer/homeQuery';

const ProtectedLayout = ({children}) => {
    const { token } = useSelector((state) => state.auth)
    const {isSuccess} = useGetProfileQuery(token) 
    const navigate = useNavigate()
    const checkSuccess = useMemo(
        () => { 
            if (isSuccess) {
                return true
            }
            return false
        }, [isSuccess])

    useEffect(
        () => { 
            if (!token) {
                navigate("/")
            } else if (token && !checkSuccess) {
                navigate("/")
            }
        }, [navigate, token, checkSuccess])
    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedLayout;