import { ImageModal } from '@/components/image-modal';
import { a11yOnClick } from '@/lib/a11y';
import type React from 'react';
import { useState } from 'react';

const WelcomeMessage: React.FC = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<{ photoPath: string; alt: string } | null>(null);
    const photos = [
        { photoPath: '/photos/ELKN_ParkVisitor_LauraMeeks.jpg', alt: 'Elk Knob State Park Scene' },
        {
            photoPath: '/photos/MOJESign_ParkVisitor_EverettFamily.jpg',
            alt: 'Mount Jefferson State Natural Area Scene',
        },
        { photoPath: '/photos/DogWithPassport_ParkVisitor_KatieGriswold.jpg', alt: 'Dog with paper Passport' },
    ];

    const handleOpen = (photo: { photoPath: string; alt: string }) => {
        setSelectedPhoto(photo);
    };

    const handleClose = () => {
        setSelectedPhoto(null);
    };

    return (
        <>
            <div className='mx-auto max-w-3xl space-y-6 p-6'>
                <h1 className='overflow-hidden whitespace-nowrap text-center text-[64px] text-main_green'>
                    <span className='inline-block w-full text-[length:min(64px,_calc(100vw_/_7))]'>WELCOME!</span>
                </h1>

                <div className='space-y-4'>
                    <p>
                        Since 1916, North Carolina's state parks have grown a lot. Now they cover over a 260,000 acres
                        and offer tons of things to do and see. There's something for everyone!
                    </p>

                    <p>
                        You can find all sorts of landscapes, from tall forests to calm lakes and winding rivers. Plus,
                        there are miles of trails for hiking, mountain biking, and horseback riding. You can also paddle
                        through water routes, enjoy picnics in beautiful spots, and spend a night under the stars.
                    </p>

                    <p>
                        These parks are perfect for taking a break, connecting with nature, and feeling refreshed.
                        You'll discover amazing places that show how we fit into the natural world. There are also
                        exhibits and programs to learn more about North Carolina's wonders.
                    </p>

                    <p>
                        We challenge you to visit as many of these amazing places as you can. Come join us to explore
                        and learn about North Carolina's awesome natural and cultural treasures. We hope this program
                        inspires you to create unforgettable memories and capture keepsakes of your adventures.
                    </p>
                </div>

                <div className='mt-8 grid grid-cols-3 place-items-center gap-4' data-testid='image-grid'>
                    {photos.map((photo) => (
                        <div key={photo.photoPath} {...a11yOnClick(() => handleOpen(photo))}>
                            <img
                                src={photo.photoPath}
                                alt={photo.alt}
                                className='aspect-square w-full rounded-lg object-cover shadow-md'
                            />
                        </div>
                    ))}
                </div>

                <p className='p-mini ' style={{ marginTop: '12px' }}>
                    From left to right - photo courtesy of: Laura Meeks; The Everett Family; Katie Griswold
                </p>
            </div>
            {selectedPhoto && <ImageModal photo={selectedPhoto} onClose={handleClose} />}
        </>
    );
};

export default WelcomeMessage;
