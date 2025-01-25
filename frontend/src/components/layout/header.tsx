import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa6";
import { useTitle } from '../../context/title-context';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const canGoBack = location.pathname !== '/' && location.pathname !== '/stamps' && location.pathname !== '/more';

    const { title } = useTitle();

    return (
        <>
            <header className="flex items-center justify-between p-4 bg-secondary_darkteal" style={{ height: '50px' }}>
                <div>
                    {canGoBack && (
                        <button onClick={() => navigate(-1)} className="text-system_white flex items-center">
                            <FaChevronLeft className="mr-1" />
                            <span>Back</span>
                        </button>
                    )}
                </div>
                <h4 className='text-system_white'>{title}</h4>
                <div></div>
            </header>
        </>
    );
};

export default Header;
