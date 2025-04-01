import type { Park, ParkIcon } from '@/types';
import { PARK_ICONS } from '@/types/icons';
import { useEffect, useState } from 'react';
import { FormField } from './form-field';
import RoundedButton from './rounded-button';

const US_STATES = ['NC', 'SC', 'TN', 'VA'] as const;

// Helper function to transform icon names from database format to frontend format
const transformIconName = (dbIconName: string): string => {
    return dbIconName.replace(/_/g, '-');
};

interface EditParkModalProps {
    isOpen: boolean;
    onClose: () => void;
    park: Park;
}

export function EditParkModal({ isOpen, onClose, park }: EditParkModalProps) {
    const [editedPark, setEditedPark] = useState({ ...park, trails: park.trails.split('\n').filter((line) => line.trim() !== '').join('\n') });
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<ParkIcon | null>(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedPark.parkName.trim()) {
            setError(true);
            return;
        }
        setError(false);
        // TODO: Implement park update mutation
        onClose();
    };

    const handleAddPhoto = () => {
        setEditedPark((prev) => ({
            ...prev,
            photos: [...prev.photos, { photoPath: '', alt: '' }],
        }));
    };

    const handleRemovePhoto = (index: number) => {
        const photo = editedPark.photos[index];
        const hasFilledFields = photo.photoPath !== '' || photo.alt !== '';

        if (hasFilledFields) {
            if (!window.confirm('This photo has filled fields. Are you sure you want to remove it?')) {
                return;
            }
        }

        setEditedPark((prev) => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
        }));
    };

    const handleAddAddress = () => {
        setEditedPark((prev) => ({
            ...prev,
            addresses: [
                ...prev.addresses,
                {
                    title: '',
                    addressLineOne: '',
                    addressLineTwo: '',
                    city: '',
                    state: '',
                    zipcode: 0,
                },
            ],
        }));
    };

    const handleRemoveAddress = (index: number) => {
        const address = editedPark.addresses[index];
        const hasFilledFields = Object.values(address).some((value) => value !== '' && value !== 0);

        if (hasFilledFields) {
            if (!window.confirm('This address has filled fields. Are you sure you want to remove it?')) {
                return;
            }
        }

        setEditedPark((prev) => ({
            ...prev,
            addresses: prev.addresses.filter((_, i) => i !== index),
        }));
    };

    const handleAddIcon = () => {
        if (selectedIcon) {
            setEditedPark((prev) => ({
                ...prev,
                icons: [...prev.icons, selectedIcon],
            }));
            setSelectedIcon(null);
        }
    };

    const handleRemoveIcon = (index: number) => {
        const icon = editedPark.icons[index];
        const hasFilledFields = icon !== null;

        if (hasFilledFields) {
            if (!window.confirm('Are you sure you want to remove this icon?')) {
                return;
            }
        }

        setEditedPark((prev) => ({
            ...prev,
            icons: prev.icons.filter((_, i) => i !== index),
        }));
    };

    const getUnselectedIcons = () => {
        const selectedIconNames = new Set(editedPark.icons.map((icon) => icon.iconName));
        return PARK_ICONS.filter((icon) => !selectedIconNames.has(icon.iconName));
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-system_black transition-opacity duration-300 ${isOpen ? 'bg-opacity-40' : 'bg-opacity-0'}`}
        >
            <div
                className={`m-auto flex max-w-96 transform flex-col items-center gap-3 rounded-3xl bg-supporting_lightblue bg-opacity-100 p-8 shadow-xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <h3>Edit Park</h3>
                <form onSubmit={handleSubmit} className='w-full'>
                    <FormField
                        label='Park Name'
                        id='parkName'
                        value={editedPark.parkName}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, parkName: value }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <FormField
                        label='Park Abbreviation'
                        id='parkAbbreviation'
                        value={editedPark.abbreviation}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, abbreviation: value }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <FormField
                        label='Coordinates (lat, lon)'
                        id='coordinates'
                        value={`${editedPark.coordinates.latitude}, ${editedPark.coordinates.longitude}`}
                        onChange={(value) => {
                            const [lat, lon] = value.split(',').map((coord) => coord.trim());
                            setEditedPark((prev) => ({
                                ...prev,
                                coordinates: {
                                    latitude: parseFloat(lat),
                                    longitude: parseFloat(lon),
                                    inaccuracyRadius: prev.coordinates.inaccuracyRadius,
                                },
                            }));
                            setError(false);
                        }}
                    />
                    <FormField
                        label='Phone Number'
                        id='phone'
                        value={editedPark.phone.toString()}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, phone: parseFloat(value) }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <FormField
                        label='Email'
                        id='email'
                        value={editedPark.email}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, email: value }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <FormField
                        label='Website'
                        id='website'
                        value={editedPark.website}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, website: value }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <FormField
                        label='Stamp Image'
                        id='stampImage'
                        value={editedPark.stampImage}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, stampImage: value }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <FormField
                        label='Established: '
                        id='establishedYear'
                        value={editedPark.establishedYear}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, establishedYear: value }));
                            setError(false);
                        }}
                        error={error}
                        longText={true}
                    />
                    <FormField
                        label='Landmark: '
                        id='landmark'
                        value={editedPark.landmark}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, landmark: value }));
                            setError(false);
                        }}
                        error={error}
                        longText={true}
                    />
                    <FormField
                        label='You can find...'
                        id='youCanFind'
                        value={editedPark.youCanFind}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, youCanFind: value }));
                            setError(false);
                        }}
                        error={error}
                        longText={true}
                    />
                    <FormField
                        label='Trails: '
                        id='trails'
                        value={editedPark.trails}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, trails: value }));
                            setError(false);
                        }}
                        error={error}
                        bulleted={true}
                        longText={true}
                    />
                    <FormField
                        label='Accesses: '
                        id='accesses'
                        value={editedPark.accesses}
                        onChange={(value) => {
                            setEditedPark((prev) => ({ ...prev, accesses: value }));
                            setError(false);
                        }}
                        error={error}
                        longText={true}
                    />
                    <div className='mt-4 w-full'>
                        <div className='mb-2 flex items-center justify-between'>
                            <h4 className='font-semibold text-lg'>Park Photos</h4>
                            <RoundedButton title='+' onClick={handleAddPhoto} width='54' />
                        </div>
                        <div className='space-y-4'>
                            {editedPark.photos.map((photo, index) => (
                                <div
                                    key={`${photo.photoPath}-${index}`}
                                    className='flex items-center gap-2 rounded-lg border p-2'
                                >
                                    <div className='flex-1'>
                                        <FormField
                                            id={`photo-url-${index}`}
                                            label='Photo URL'
                                            value={photo.photoPath}
                                            onChange={(value) => {
                                                const newPhotos = [...editedPark.photos];
                                                newPhotos[index] = { ...photo, photoPath: value };
                                                setEditedPark((prev) => ({ ...prev, photos: newPhotos }));
                                            }}
                                        />
                                        <FormField
                                            id={`photo-alt-${index}`}
                                            label='Alt Text'
                                            value={photo.alt}
                                            onChange={(value) => {
                                                const newPhotos = [...editedPark.photos];
                                                newPhotos[index] = { ...photo, alt: value };
                                                setEditedPark((prev) => ({ ...prev, photos: newPhotos }));
                                            }}
                                        />
                                    </div>
                                    <button
                                        className='flex h-7 w-7 items-center justify-center rounded-full border border-system_black p-1'
                                        onClick={() => handleRemoveIcon(index)}
                                        type='button'
                                    >
                                        &minus;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-4 w-full'>
                        <div className='mb-2 flex items-center justify-between'>
                            <h4 className='font-semibold text-lg'>Park Addresses</h4>
                            <RoundedButton title='+' onClick={handleAddAddress} width='54' />
                        </div>
                        <div className='space-y-4'>
                            {editedPark.addresses.map((address, index) => (
                                <div
                                    key={`${address.title}-${index}`}
                                    className='flex items-center gap-2 rounded-lg border p-2'
                                >
                                    <div className='flex-1'>
                                        <FormField
                                            id={`address-title-${index}`}
                                            label='Title'
                                            value={address.title}
                                            onChange={(value) => {
                                                const newAddresses = [...editedPark.addresses];
                                                newAddresses[index] = { ...address, title: value };
                                                setEditedPark((prev) => ({ ...prev, addresses: newAddresses }));
                                            }}
                                        />
                                        <FormField
                                            id={`address-line1-${index}`}
                                            label='Address Line 1'
                                            value={address.addressLineOne}
                                            onChange={(value) => {
                                                const newAddresses = [...editedPark.addresses];
                                                newAddresses[index] = { ...address, addressLineOne: value };
                                                setEditedPark((prev) => ({ ...prev, addresses: newAddresses }));
                                            }}
                                        />
                                        <FormField
                                            id={`address-line2-${index}`}
                                            label='Address Line 2'
                                            value={address.addressLineTwo}
                                            onChange={(value) => {
                                                const newAddresses = [...editedPark.addresses];
                                                newAddresses[index] = { ...address, addressLineTwo: value };
                                                setEditedPark((prev) => ({ ...prev, addresses: newAddresses }));
                                            }}
                                        />
                                        <FormField
                                            id={`address-city-${index}`}
                                            label='City'
                                            value={address.city}
                                            onChange={(value) => {
                                                const newAddresses = [...editedPark.addresses];
                                                newAddresses[index] = { ...address, city: value };
                                                setEditedPark((prev) => ({ ...prev, addresses: newAddresses }));
                                            }}
                                        />
                                        <div className='flex flex-col'>
                                            <label
                                                htmlFor={`address-state-${index}`}
                                                className='mb-1 font-medium text-sm'
                                            >
                                                State
                                            </label>
                                            <select
                                                id={`address-state-${index}`}
                                                value={address.state}
                                                onChange={(e) => {
                                                    const newAddresses = [...editedPark.addresses];
                                                    newAddresses[index] = { ...address, state: e.target.value };
                                                    setEditedPark((prev) => ({ ...prev, addresses: newAddresses }));
                                                }}
                                                className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                                            >
                                                <option value=''>Select a state</option>
                                                {US_STATES.map((state) => (
                                                    <option key={state} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <FormField
                                            id={`address-zip-${index}`}
                                            label='Zipcode'
                                            value={address.zipcode.toString()}
                                            onChange={(value) => {
                                                const newAddresses = [...editedPark.addresses];
                                                newAddresses[index] = { ...address, zipcode: parseInt(value) || 0 };
                                                setEditedPark((prev) => ({ ...prev, addresses: newAddresses }));
                                            }}
                                        />
                                    </div>
                                    <button
                                        className='flex h-7 w-7 items-center justify-center rounded-full border border-system_black p-1'
                                        onClick={() => handleRemoveAddress(index)}
                                        type='button'
                                    >
                                        &minus;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-4 w-full'>
                        <div className='mb-2 flex items-center justify-between'>
                            <h4 className='font-semibold text-lg'>Park Icons</h4>
                        </div>
                        <div className='space-y-4'>
                            {editedPark.icons.map((icon, index) => {
                                const frontendIconName = transformIconName(icon.iconName);
                                const parkIcon = PARK_ICONS.find((i) => i.iconName === frontendIconName);
                                return (
                                    <div
                                        key={`${icon.iconName}-${index}`}
                                        className='flex items-center gap-2 rounded-lg border p-2'
                                    >
                                        <div className='flex-1'>
                                            <span>{parkIcon?.tooltip || icon.tooltip}</span>
                                            {parkIcon?.extraText && (
                                                <span className='ml-2 text-gray-500 text-sm'>
                                                    ({parkIcon.extraText})
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className='flex h-7 w-7 items-center justify-center rounded-full border border-system_black p-1'
                                            onClick={() => handleRemoveIcon(index)}
                                            type='button'
                                        >
                                            &minus;
                                        </button>
                                    </div>
                                );
                            })}
                            <div className='flex items-center gap-2 rounded-lg border p-2'>
                                <div className='flex-1'>
                                    <select
                                        value={selectedIcon?.iconName || ''}
                                        onChange={(e) => {
                                            const icon = PARK_ICONS.find((i) => i.iconName === e.target.value);
                                            setSelectedIcon(icon || null);
                                        }}
                                        className='w-full rounded-lg border border-system_gray bg-system_white px-3 py-2 focus:border-secondary_darkteal focus:ring-secondary_darkteal'
                                    >
                                        <option value=''>Select an icon</option>
                                        {getUnselectedIcons().map((icon) => (
                                            <option key={icon.iconName} value={icon.iconName}>
                                                {icon.tooltip}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {selectedIcon && (
                                    <button
                                        className='flex h-7 w-7 items-center justify-center rounded-full border border-system_black p-1'
                                        onClick={() => handleAddIcon()}
                                        type='button'
                                    >
                                        &#43;
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 flex justify-end space-x-3'>
                        <RoundedButton title={'Cancel'} onClick={onClose} />
                        <RoundedButton
                            type='submit'
                            title='Save Changes'
                            color='secondary_orange'
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
