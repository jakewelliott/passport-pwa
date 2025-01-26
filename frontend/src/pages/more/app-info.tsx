import { PassportHeader } from "../../components/common/passport-header";
import { ContactUs } from "../../components/tabs/more/contact-us";
import { DownloadParkMaps } from "../../components/tabs/more/download-park-maps";
import { Reservations } from "../../components/tabs/more/reservations";

export const AppInfo = () => {
    return (
        <>
            <div className="my-3.5">
                <PassportHeader />
            </div>
            <ContactUs />
            <DownloadParkMaps />
            <Reservations />
        </>
    );
}
