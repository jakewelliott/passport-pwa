interface StampDetails {
  time: string;
  method: string;
}

interface BucketListItemDetails {
  text: string;
  status: boolean;
}

interface Address {
  name: string;
  addressLineOne: string;
  city: string;
  state: string;
  zip: string;
}

interface ParkPhoto {
  url: string;
  caption?: string;
}

interface Park {
  name: string;
  address: Address[];
  coordinates: string;
  phone: string;
  email: string;
  website: string;
  stamp?: StampDetails;
  bucketList?: BucketListItemDetails;
  established?: string;
  landmark?: string;
  youCanFind?: string;
  trails?: string;
  parkIcons: string[];
  parkPhotos: ParkPhoto[];
}

interface LocationDetailsProps {
  park: Park;
}

export const LocationDetails: React.FC<LocationDetailsProps> = ({ park }) => {
  return (
    <div className='mt-6 mb-6 flex flex-col'>
      <p className='pr-6 pl-6'>
        {park.established && (
          <>
            <span className='green-text'>Established: </span>
            {park.established}
            <br />
            <br />
          </>
        )}
        {park.landmark && (
          <>
            <span className='green-text'>Landmark: </span>
            {park.landmark}
            <br />
            <br />
          </>
        )}
        {park.youCanFind && (
          <>
            <span className='green-text'>You can find... </span>
            {park.youCanFind}
            <br />
            <br />
          </>
        )}
        {park.trails && (
          <>
            <span className='green-text'>Trails: </span>
            {park.trails}
            <br />
            <br />
          </>
        )}
      </p>
      <div className='icon-scroll-container overflow-x-auto'>
        <div className='inline-flex gap-6 px-6'>
          {park.parkIcons.map((icon, index) => (
            <img src={`../../park-icons/${icon}`} width={55} height={55} key={index} alt={`Park icon ${index + 1}`} />
          ))}
          <div className='w-px flex-shrink-0' />
        </div>
      </div>
    </div>
  );
};
