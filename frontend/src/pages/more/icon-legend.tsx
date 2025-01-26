import { IconSection } from "../../components/tabs/more/icon-section";

export const IconLegend = ({ }) => {
    return (
        <>
            <h2 className="text-center mt-4 mb-5">Icon Legend</h2>
            <IconSection sectionName={"Camping"} />
            <IconSection sectionName={"Activities"} />
            <IconSection sectionName={"Amenities"} />
            <IconSection sectionName={"State Trail Stamps"} />
            <p className="m-4"><span className="text-icon_amenities">Kids TRACK Trail: </span>Kids in Parks is a group that creates outdoor adventures called TRACK trails for families all over the country. Each one has fun things to learn about nature as you walk. You can even earn prizes by keeping track of your adventures! Check out kidsinparks.com to find out more.</p>
        </>
    );
}