
import { useLocation } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
}
export default function RootAppComponent(props : Props) {
    const location = useLocation();
    return props.children as React.ReactElement;
}
