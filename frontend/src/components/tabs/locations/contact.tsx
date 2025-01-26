import { FiNavigation, FiPhone } from 'react-icons/fi';
import { FaStamp, FaRegSquare, FaRegCheckSquare, FaRegEnvelope } from 'react-icons/fa';

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

interface LocationContactProps {
  park: Park;
}

export const LocationContact: React.FC<LocationContactProps> = ({ park }) => {
  return (
    <div className='m-4 flex flex-col gap-3'>
      <h2 style={{ width: '100%' }}>{park.name}</h2>
      {park.address.map((address, index) => (
        <div className='top-0 flex' key={`address-${index}`}>
          <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
          <p>
            {address.name}
            <br />
            {address.addressLineOne}
            <br />
            {address.city}, {address.state} {address.zip}
          </p>
        </div>
      ))}
      <div className='top-0 flex'>
        <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>GPS: {park.coordinates}</p>
      </div>
      <div className='top-0 flex'>
        <FiPhone size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.phone}</p>
      </div>
      <div className='top-0 flex'>
        <FaRegEnvelope size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.email}</p>
      </div>
      <div className='top-0 flex'>
        <FaStamp size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.stamp ? `Stamp collected ${park.stamp.time}` : 'Stamp not yet collected'}</p>
      </div>
      {park.bucketList && (
        <div className='top-0 flex'>
          {park.bucketList.status ? (
            <FaRegCheckSquare size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
          ) : (
            <FaRegSquare size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
          )}
          <p>
            Bucket List Item:
            <br />
            {park.bucketList.text}
          </p>
        </div>
      )}
    </div>
  );
};
