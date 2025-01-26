import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

export const ContactUs = ({ }) => {
    return (
        <div className="p-4">
            <div className="bg-supporting_inactiveblue text-system_white p-2 text-center">
                <h3>CONTACT US</h3>
            </div>
            <div className="bg-supporting_lightblue p-2.5 text-center space-y-2">
                <div>
                    <Link to={'www.ncparks.gov'} className="text-supporting_inactiveblue no-underline">www.ncparks.gov</Link>
                </div>
                <div className="flex gap-3 justify-center">
                    <Link to={'https://www.facebook.com/NorthCarolinaStateParks/'} className="w-8 h-8 rounded-full bg-supporting_inactiveblue flex items-center justify-center">
                        <FaFacebookF size={20} className="text-supporting_lightblue" />
                    </Link>
                    <Link to={'https://www.instagram.com/ncstateparks/'} className="w-8 h-8 rounded-full bg-supporting_inactiveblue flex items-center justify-center">
                        <FaInstagram size={20} className="text-supporting_lightblue" />
                    </Link>
                    <Link to={'https://www.youtube.com/@parksNC'} className="w-8 h-8 rounded-full bg-supporting_inactiveblue flex items-center justify-center">
                        <FaYoutube size={20} className="text-supporting_lightblue" />
                    </Link>
                </div>
                <p className="space-y-1">
                    <span>NC Division of Parks and Recreation</span><br />
                    <span>Dept. of Natural and Cultural Resources</span><br />
                    <span>1615 Mail Service Center</span><br />
                    <span>Raleigh, NC 27699</span><br />
                    <span>(919) 707-9300</span>
                </p>
            </div>

        </div>
    );
}