import type { Trail, TrailIcon } from '@/types';
import { TRAIL_ICONS } from '@/types/icons';
import { useEffect, useState } from 'react';
import { FormField } from './form-field';
import RoundedButton from './rounded-button';

const defaultTrail: Trail = {
    id: 0, // Use ID 0 for new trails
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    trailName: '',
    icons: [],
    distance: '',
    description: '',
};

// Helper function to transform icon names from database format to frontend format
const transformIconName = (dbIconName: string): string => {
    return dbIconName.replace(/_/g, '-');
};

interface EditTrailModalProps {
    isOpen: boolean;
    onClose: () => void;
    trailProp?: Trail;
    isNew?: boolean;
}

export function EditTrailModal({ isOpen, onClose, trailProp = defaultTrail, isNew = false }: EditTrailModalProps) {
    const [editedTrail, setEditedTrail] = useState({ ...trailProp });
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<TrailIcon | null>(null);

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
        if (!editedTrail.trailName.trim()) {
            setError(true);
            return;
        }
        setError(false);
        // TODO: Implement trail update mutation
        if (isNew) {
            // Handle creating a trail
        } else {
            // Handle updating a trail
        }
        onClose();
    };

    const handleAddIcon = () => {
        if (selectedIcon) {
            setEditedTrail((prev) => ({
                ...prev,
                icons: [...prev.icons, selectedIcon],
            }));
            setSelectedIcon(null);
        }
    };

    const handleRemoveIcon = (index: number) => {
        const icon = editedTrail.icons[index];
        const hasFilledFields = icon !== null;

        if (hasFilledFields) {
            if (!window.confirm('Are you sure you want to remove this icon?')) {
                return;
            }
        }

        setEditedTrail((prev) => ({
            ...prev,
            icons: prev.icons.filter((_, i) => i !== index),
        }));
    };

    const getUnselectedIcons = () => {
        const selectedIconNames = new Set(editedTrail.icons.map((icon) => icon.iconName));
        return TRAIL_ICONS.filter((icon) => !selectedIconNames.has(icon.iconName));
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-system_black transition-opacity duration-300 ${isOpen ? 'bg-opacity-40' : 'bg-opacity-0'}`}
        >
            <div
                className={`m-auto flex max-w-96 transform flex-col items-center gap-3 rounded-3xl bg-supporting_lightblue bg-opacity-100 p-8 shadow-xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <h2>{isNew ? 'New Trail' : 'Edit Trail'}</h2>
                <div
                    className='absolute top-4 right-4 cursor-pointer text-h2'
                    onClick={onClose}
                    onKeyUp={(e) => e.key === 'Enter' && onClose()}
                    onKeyDown={(e) => e.key === 'Enter' && onClose()}
                    aria-label="Close"
                >
                    &times;
                </div>
                <form onSubmit={handleSubmit} className='w-full'>
                    <FormField
                        label='Trail Name'
                        id='trailName'
                        value={editedTrail.trailName}
                        onChange={(value) => {
                            setEditedTrail((prev) => ({ ...prev, trailName: value }));
                            setError(false);
                        }}
                        error={error}
                    />
                    <FormField
                        label='Distance: '
                        id='trailDistance'
                        value={editedTrail.distance}
                        onChange={(value) => {
                            setEditedTrail((prev) => ({ ...prev, distance: value }));
                            setError(false);
                        }}
                        error={error}
                        longText={true}
                    />
                    <FormField
                        label='Description: '
                        id='description'
                        value={editedTrail.description}
                        onChange={(value) => {
                            setEditedTrail((prev) => ({ ...prev, description: value }));
                            setError(false);
                        }}
                        error={error}
                        longText={true}
                    />
                    <div className='mt-4 w-full'>
                        <div className='mb-2 flex items-center justify-between'>
                            <h4 className='font-semibold text-lg'>Trail Icons</h4>
                        </div>
                        <div className='space-y-4'>
                            {editedTrail.icons.map((icon, index) => {
                                const frontendIconName = transformIconName(icon.iconName);
                                const trailIcon = TRAIL_ICONS.find((i) => i.iconName === frontendIconName);
                                return (
                                    <div
                                        key={`${icon.iconName}-${index}`}
                                        className='flex items-center gap-2 rounded-lg border p-2'
                                    >
                                        <div className='flex-1'>
                                            <span>{trailIcon?.tooltip || icon.tooltip}</span>
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
                                            const icon = TRAIL_ICONS.find((i) => i.iconName === e.target.value);
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
