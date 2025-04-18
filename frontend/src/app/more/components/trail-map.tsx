export const TrailMap = () => {
    return (
        <div className='flex flex-col'>
            <img src={'/PassportMap_TrailsOnly.svg'} alt='NC State Map showing all trails' />
            <div className='ml-2 flex w-full justify-around'>
                <div>
                    <p className='text-trail-danriver'>Dan River</p>
                    <p className='text-trail-deepriver'>Deep River</p>
                    <p className='text-trail-eastcoastgreenway'>East Coast Greenway</p>
                    <p className='text-trail-equine'>Equine</p>
                    <p className='text-trail-fontaflora'>Fonta Flora</p>
                    <p className='text-trail-frenchbroadriver'>French Broad River</p>
                    <p className='text-trail-hawriver'>Haw River</p>
                </div>
                <div>
                    <p className='text-trail-hickorynutgorge'>Hickory Nut Gorge</p>
                    <p className='text-trail-mountainstosea'>Mountains-to-Sea</p>
                    <p className='text-trail-northernpeaks'>Northern Peaks</p>
                    <p className='text-trail-overmountainvictory'>Overmountain Victory</p>
                    <p className='text-trail-roanokeriver'>Roanoke River</p>
                    <p className='text-trail-wildernessgateway'>Wilderness Gateway</p>
                    <p className='text-trail-yadkinriver'>Yadkin River</p>
                </div>
            </div>
        </div>
    );
};
