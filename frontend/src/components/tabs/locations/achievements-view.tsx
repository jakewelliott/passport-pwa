import { FaStamp, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';

interface AchievementsViewProps {
  stamp?: { time: string, method: string };
  bucketList?: { status: boolean; text: string };
}

const AchievementsView = ({ stamp, bucketList }: AchievementsViewProps) => {
  return (
    <div className='flex flex-col gap-3'>
      <div className="top-0 flex">
        <FaStamp
          size={"17px"}
          strokeWidth={3}
          style={{ paddingRight: "5px", paddingTop: "5px" }}
        />
        <p>
          {stamp
            ? `Stamp collected ${stamp.time}`
            : "Stamp not yet collected"}
        </p>
      </div>
      {bucketList && (
        <div className="top-0 flex">
          {bucketList.status ? (
            <FaRegCheckSquare
              size={"17px"}
              strokeWidth={3}
              style={{ paddingRight: "5px", paddingTop: "5px" }}
            />
          ) : (
            <FaRegSquare
              size={"17px"}
              strokeWidth={3}
              style={{ paddingRight: "5px", paddingTop: "5px" }}
            />
          )}
          <p>
            Bucket List Item:
            <br />
            {bucketList.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementsView; 