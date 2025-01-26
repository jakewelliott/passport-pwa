import { RiMap2Line } from "react-icons/ri";

export const DownloadParkMaps = ({ }) => {
    return (
        <div className="p-4">
            <div className="bg-secondary_orange text-system_white p-2 text-center">
                <h3>DOWNLOAD PARK MAPS</h3>
            </div>
            <div className="bg-supporting_lightorange p-2.5 flex items-center">
                <div className="float-left -ml-8">
                    <RiMap2Line size={90} style={{transform: 'rotate(-25deg)'}} />
                </div>
                <p className="text-center">
                    Save paper and save trees by getting a digital map of the park before you visit!<br /><br />
                    Go to ncparks.gov, pick a park, and download the map or get more information.
                </p>
            </div>
        </div>
    );
}
