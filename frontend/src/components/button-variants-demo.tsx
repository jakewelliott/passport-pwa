import { FaCheck, FaHeart, FaMapMarkerAlt, FaPlus, FaStar } from 'react-icons/fa';
import RoundedButton from './rounded-button';

export const ButtonVariantsDemo = () => {
    return (
        <div className='space-y-8 p-6'>
            <div>
                <h3 className='mb-4'>Default Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                    <RoundedButton title='Default' />
                    <RoundedButton title='Main Green' color='bg-main-green' />
                    <RoundedButton title='Main Blue' color='bg-main-blue' />
                    <RoundedButton title='Orange' color='bg-secondary-orange' />
                    <RoundedButton title='Lime' color='bg-secondary-lime' textColor='system-black' />
                    <RoundedButton title='Disabled' disabled={true} />
                </div>
            </div>

            <div>
                <h3 className='mb-4'>Outline Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                    <RoundedButton title='Outline Default' variant='outline' />
                    <RoundedButton title='Outline Green' color='bg-main-green' variant='outline' />
                    <RoundedButton title='Outline Blue' color='bg-main-blue' variant='outline' />
                    <RoundedButton title='Outline Orange' color='bg-secondary-orange' variant='outline' />
                    <RoundedButton title='Outline Disabled' variant='outline' disabled={true} />
                </div>
            </div>

            <div>
                <h3 className='mb-4'>Small Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                    <RoundedButton title='Small' variant='small' width='100' />
                    <RoundedButton title='Small Green' color='bg-main-green' variant='small' width='100' />
                    <RoundedButton title='Small Blue' color='bg-main-blue' variant='small' width='100' />
                    <RoundedButton title='Small Orange' color='bg-secondary-orange' variant='small' width='100' />
                </div>
            </div>

            <div>
                <h3 className='mb-4'>Large Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                    <RoundedButton title='Large' variant='large' width='200' />
                    <RoundedButton title='Large Green' color='bg-main-green' variant='large' width='200' />
                    <RoundedButton title='Large Blue' color='bg-main-blue' variant='large' width='200' />
                </div>
            </div>

            <div>
                <h3 className='mb-4'>Icon Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                    <RoundedButton title='Favorite' icon={<FaStar />} />
                    <RoundedButton title='Like' icon={<FaHeart />} color='bg-secondary-orange' />
                    <RoundedButton title='Add' icon={<FaPlus />} color='bg-main-green' />
                    <RoundedButton title='Location' icon={<FaMapMarkerAlt />} color='bg-main-blue' />
                    <RoundedButton
                        title='Success'
                        icon={<FaCheck />}
                        color='bg-secondary-lime'
                        textColor='system-black'
                    />
                </div>
            </div>

            <div>
                <h3 className='mb-4'>Icon-Only Buttons</h3>
                <div className='flex flex-wrap gap-4'>
                    <RoundedButton title='' icon={<FaStar />} variant='icon' width='50' />
                    <RoundedButton title='' icon={<FaHeart />} variant='icon' color='bg-secondary-orange' width='50' />
                    <RoundedButton title='' icon={<FaPlus />} variant='icon' color='bg-main-green' width='50' />
                    <RoundedButton title='' icon={<FaMapMarkerAlt />} variant='icon' color='bg-main-blue' width='50' />
                    <RoundedButton
                        title=''
                        icon={<FaCheck />}
                        variant='icon'
                        color='bg-secondary-lime'
                        textColor='system-black'
                        width='50'
                    />
                </div>
            </div>
        </div>
    );
};

export default ButtonVariantsDemo;
