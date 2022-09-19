
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { LOGIN_URL, PUBLIC_URL} from '../constants/urls';
import { useQuery } from 'react-query';
import { appAction } from '../redux/app-slice';
import { userActions } from '../redux/user-slice';
import { getUserInfo } from '../../services/user-service';
import { UseQueryConstants } from '../constants/common';

interface Props {
	children: React.ReactNode;
}
export default function RootAppComponent(props : Props) {
    const location = useLocation();
    return props.children as React.ReactElement;
}
