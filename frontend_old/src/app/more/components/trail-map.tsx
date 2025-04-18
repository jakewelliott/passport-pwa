export const TrailMap = () => {
    return (
        <div className='flex flex-col'>
            <img src={'/PassportMap_TrailsOnly.svg'} alt='NC State Map showing all trails' />
            <div className='ml-2 flex w-full justify-around'>
                <div>
                    <p className='text-trail_danriver'>Dan River</p>
                    <p className='text-trail_deepriver'>Deep River</p>
                    <p className='text-trail_eastcoastgreenway'>East Coast Greenway</p>
                    <p className='text-trail_equine'>Equine</p>
                    <p className='text-trail_fontaflora'>Fonta Flora</p>
                    <p className='text-trail_frenchbroadriver'>French Broad River</p>
                    <p className='text-trail_hawriver'>Haw River</p>
                </div>
                <div>
                    <p className='text-trail_hickorynutgorge'>Hickory Nut Gorge</p>
                    <p className='text-trail_mountainstosea'>Mountains-to-Sea</p>
                    <p className='text-trail_northernpeaks'>Northern Peaks</p>
                    <p className='text-trail_overmountainvictory'>Overmountain Victory</p>
                    <p className='text-trail_roanokeriver'>Roanoke River</p>
                    <p className='text-trail_wildernessgateway'>Wilderness Gateway</p>
                    <p className='text-trail_yadkinriver'>Yadkin River</p>
                </div>
            </div>
        </div>
    );
};
