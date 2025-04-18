import { LegendSections } from '@/app/more/components/legend-sections';
import { dbg } from '@/lib/debug';

export const IconLegend = () => {
    dbg('RENDER', '/more/icon-legend');
    return (
        <div className='flex flex-col gap-4'>
            <h2 className='text-center'>Legend</h2>
            <LegendSections />
            <p className='min-w-[200px]'>
                <span className='text-icon-amenities'>Kids TRACK Trail: </span>Kids in Parks is a group that creates
                outdoor adventures called TRACK trails for families all over the country. Each one has fun things to
                learn about nature as you walk. You can even earn prizes by keeping track of your adventures! Check out
                kidsinparks.com to find out more.
            </p>
        </div>
    );
};
