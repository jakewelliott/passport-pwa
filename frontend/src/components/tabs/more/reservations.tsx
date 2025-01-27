import { Link } from "react-router-dom";

export const Reservations = ({ }) => {
    return (
        <div className="p-4">
            <div className="mb-3 flex items-center">
                <img src="../../park-icons/Camping.svg" alt="" className="w-[50px] h-[50px] mr-2" />
                <div className="w-full flex flex-col justify-center">
                    <h4 className="text-main_green text-center pb-1">MAKE A RESERVATION</h4>
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                        <Link to={'https://www.ncparks.gov/reservations'} className="p-mini">ncparks.gov/reservations</Link>
                        <p className="p-mini">1-877-722-6762</p>
                    </div>
                </div>
            </div>
            <div className="mt-3 flex items-center">
                <img src="../../park-icons/PicnicShelter.svg" alt="" className="w-[50px] h-[50px] mr-2" />
                <p className="p-mini">Reserve campsites, picnic shelters and other park facilities online or over the phone.</p>
            </div>
        </div>
    );
}
