import RoundedButton from "@/components/common/rounded-button";
import parks from "@/lib/mock/parks";
import { Park } from "@/lib/mock/types";

export default function CollectStamp() {
  const parkDetails: Park = parks[0];
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-secondary_lightblue" style={{zIndex: 9999}}>
    <div className="m-auto flex flex-col gap-8 items-center text-center max-w-3xl">
      <span className='absolute top-4 right-6 z-10 cursor-pointer font-bold text-h1 text-supporting_darkgray'>
              &times;
            </span>
      <h1 className="uppercase text-secondary_darkteal">Woohoo!!!</h1>
      <p className="p-large">Your location indicates that you are at {parkDetails.name}. You have not collected the badge at this location yet. </p>
      <RoundedButton title={"Collect!"} />
      <img src={`/stamps/${parkDetails.abbreviation}.svg`} width={'150px'} />
    </div>
    </div>
  );
}
