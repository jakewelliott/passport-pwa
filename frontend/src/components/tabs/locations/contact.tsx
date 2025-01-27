import { FiNavigation, FiPhone } from 'react-icons/fi';
import { FaRegEnvelope } from 'react-icons/fa';
import type { Park } from '@/lib/mock/types';

interface LocationContactProps {
  park: Park;
}

export const LocationContact = ({ park }: LocationContactProps) => {
  return (
    <div className='m-4 flex flex-col gap-3'>
      <h2 style={{ width: '100%' }}>{park.name}</h2>
      {park.address && (
        <div className='top-0 flex' key={park.address.description}>
          <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
          {/* TODO: make an AddressView component */}
          <p>
            {park.address.description}
            <br />
            {park.address.addressLineOne}
            <br />
            {park.address.city}, {park.address.state} {park.address.zip}
          </p>
        </div>
      )}
      <div className='top-0 flex'>
        <FiNavigation size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>
          GPS: {park.coordinates.latitude}, {park.coordinates.longitude}
        </p>
      </div>
      <div className='top-0 flex'>
        <FiPhone size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.phone}</p>
      </div>
      <div className='top-0 flex'>
        <FaRegEnvelope size={'17px'} strokeWidth={3} style={{ paddingRight: '5px', paddingTop: '5px' }} />
        <p>{park.email}</p>
      </div>

      {/* TODO: should this stuff be on the contact page or something else? */}

      {/* <div className="top-0 flex">
				<FaStamp
					size={"17px"}
					strokeWidth={3}
					style={{ paddingRight: "5px", paddingTop: "5px" }}
				/>
				<p>
					{stamp
						? `Stamp collected ${park.stamp.time}`
						: "Stamp not yet collected"}
				</p>
			</div>
			{park.bucketList && (
				<div className="top-0 flex">
					{park.bucketList.status ? (
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
						{park.bucketList.text}
					</p>
				</div>
			)} */}
    </div>
  );
};
