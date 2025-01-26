import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// TODO: bruh
	const canGoBack =
		location.pathname !== "/" &&
		location.pathname !== "/stamps" &&
		location.pathname !== "/more" &&
		location.pathname !== "/locations";

	return (
		<div className="sticky top-0 right-0 left-0" style={{ zIndex: 9999 }}>
			<header
				className="flex items-center justify-between bg-secondary_darkteal p-4"
				style={{ height: "50px" }}
			>
				<div>
					{canGoBack && (
						<button
							onClick={() => navigate(-1)}
							className="flex items-center text-system_white"
							type="button"
						>
							<FaChevronLeft className="mr-1" />
							<span>Back</span>
						</button>
					)}
				</div>
				<h4 className="text-system_white">
					{location.pathname.split("/").pop()?.toUpperCase()}
				</h4>
				<div />
			</header>
		</div>
	);
};

export default Header;
