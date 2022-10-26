import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isCheckLogined } from '../../services/user-service';
import { UrlFeApp } from '../constants/common';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { userActions } from '../redux/user-slice';

interface Props {
    children: React.ReactNode;
}
export default function RootAppComponent(props: Props) {
    return props.children as React.ReactElement;
}
