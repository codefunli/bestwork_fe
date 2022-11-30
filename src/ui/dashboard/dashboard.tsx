import { useTranslation } from 'react-i18next';

export default function DashBoard() {
    const { t } = useTranslation();

    return (
        <div className="vh-100 w-100">
            <iframe className="vh-100 w-100" src="http://127.0.0.1:5500/index.html"></iframe>
        </div>
    );
}
