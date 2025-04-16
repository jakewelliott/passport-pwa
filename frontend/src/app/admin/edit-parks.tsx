import { useCreatePark, useUpdatePark } from '@/hooks/queries/useAdminTools';
import { useParks } from '@/hooks/queries/useParks';
import { PARK_ICONS, type ParkIcon } from '@/types/icons';
import type { Park } from '@/types/tables';
import { type MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

//JAKE: need to add park type, city

const EditParks = () => {
    const { data: parks } = useParks();
    const [editedParks, setEditedParks] = useState<Park[]>([]);
    const [allParks, setAllParks] = useState<Park[]>(parks || []);
    const [selectedIcon, setSelectedIcon] = useState<{ icon: ParkIcon; parkId: number }[]>([]);

    const { mutate: update } = useUpdatePark();
    const { mutate: create } = useCreatePark();

    useEffect(() => {
        if (parks) {
            setAllParks(() => parks.map((park) => editedParks.find((ep) => ep.id === park.id) || park));
        }
    }, [parks, editedParks]);

    const handleCleanLongText = (fullText: string) => {
        let lines = fullText.split('\n').filter((line) => line.trim() !== '');
        if (fullText.includes('■')) {
            // we are cleaning up something from the database
            const replacedText = [];
            for (let line of lines) {
                if (line.charAt(0) !== '■') line = `* ${line}`;
                replacedText.push(line.replace('■', '-'));
            }
            lines = replacedText;
        } else if (fullText.includes('- ')) {
            const replacedText = [];
            for (let line of lines) {
                if (line.charAt(0) === '-') line = line.replace('-', '■').trim();
                else if (line.startsWith('* ')) line = line.replace('* ', '').trim();
                else
                    toast.warning(
                        `The below line will be saved as an indented line. If this was not the desired behavior, please correct formatting and try again.\n${line}`,
                    );
                replacedText.push(line);
            }
            lines = replacedText;
        }
        return lines.join('\n');
    };

    const handleAddNewPark = () => {
        // Create a blank park object with default values
        const newPark: Park = {
            id: Date.now(), // Use timestamp as unique ID
            abbreviation: '',
            parkName: '',
            coordinates: { latitude: 0, longitude: 0, inaccuracyRadius: 0 },
            phone: 0,
            email: '',
            website: '',
            establishedYear: '',
            landmark: '',
            youCanFind: '',
            accesses: '',
            trails: '',
            stampImage: '',
            addresses: [],
            icons: [],
            photos: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false,
        };

        // Add the new park to the beginning of the allParks array
        setAllParks((prev) => [newPark, ...prev]);
    };

    const handleInputChange = (parkId: number, path: string, value: unknown) => {
        setAllParks((prev) =>
            prev.map((park) =>
                park.id === parkId
                    ? {
                          ...park,
                          [path]: value,
                      }
                    : park,
            ),
        );
    };

    const handleInputBlur = (parkId: number, path: string, value: string) => {
        setEditedParks((prev) => {
            const originalPark = parks?.find((p) => p.id === parkId);
            if (!originalPark) return prev;

            const parkIndex = prev.findIndex((p) => p.id === parkId);
            const basePark = parkIndex === -1 ? originalPark : prev[parkIndex];
            const newPark = structuredClone(basePark);

            //special case for coordinates
            if (path.includes('coordinates')) {
                const coords = value.split(', ');
                setDeepProperty(newPark, 'coordinates.latitude', coords[0]);
                setDeepProperty(newPark, 'coordinates.longitude', coords[1]);
            } else {
                setDeepProperty(newPark, path, value);
            }

            return parkIndex === -1 ? [...prev, newPark] : prev.map((p) => (p.id === parkId ? newPark : p));
        });
    };

    function handleSave(editedParks: Park[]): void {
        // Create a new array with updated trails
        const formattedParks = editedParks.map((park) => ({
            ...park,
            trails: handleCleanLongText(park.trails),
        }));

        console.log(formattedParks);

        for (const park of formattedParks) {
            if (park.id > 9999) {
                create(park);
            } else {
                update(park);
            }
        }

        // TODO: validate on frontend before attempting mutation
        // mutate(editedParks);
    }

    const getUnselectedIcons = (park: Park) => {
        const selectedIconNames = new Set(park.icons.map((icon) => icon.iconName));
        return PARK_ICONS.filter((icon) => !selectedIconNames.has(icon.iconName));
    };

    const setDeepProperty = (obj: Record<string, any>, path: string, value: any): void => {
        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            // Ensure the intermediate objects exist
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }

        // Set the final property value
        current[keys[keys.length - 1]] = value;
    };

    const handleNestedArrayChange = (
        parkId: number,
        arrayPath: keyof Park,
        action: 'add' | 'remove',
        index?: number,
        newValue?: any, // Optional parameter for new value
    ) => {
        setEditedParks((prev) => {
            const originalPark = parks?.find((p) => p.id === parkId);
            if (!originalPark) return prev;

            const existingPark = prev.find((p) => p.id === parkId);
            const basePark = existingPark ?? originalPark;

            const currentArray = (basePark[arrayPath] as unknown[]) ?? [];
            const newArray = [...currentArray];
            const newAddress = {
                title: '',
                addressLineOne: '',
                addressLineTwo: '',
                city: '',
                state: '',
                zipcode: null,
            };
            const newPhoto = { photoPath: '', alt: '' };

            if (action === 'add' && !newValue) {
                if (arrayPath.includes('address')) newArray.push(newAddress);
                else if (arrayPath.includes('photo')) newArray.push(newPhoto);
            } else if (action === 'add' && newValue) {
                newArray.push(newValue);
            } else if (action === 'remove' && index !== undefined) {
                newArray.splice(index, 1);
            }

            const newPark = existingPark
                ? { ...existingPark, [arrayPath]: newArray }
                : { ...originalPark, [arrayPath]: newArray };

            return existingPark ? prev.map((p) => (p.id === parkId ? newPark : p)) : [...prev, newPark];
        });
    };

    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Park>[]>(
        () => [
            {
                accessorKey: 'abbreviation', //access nested data with dot notation
                header: 'Abbrev',
                size: 50,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'abbreviation', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'abbreviation', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'parkName',
                header: 'Name',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'parkName', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'parkName', e.target.value)}
                    />
                ),
            },
            {
                accessorFn: (row) => `${row.coordinates.latitude}, ${row.coordinates.longitude}`,
                id: 'coordinates',
                header: 'Coordinates',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'coordinates', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'coordinates', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                size: 75,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'phone', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'phone', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'email', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'email', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'website',
                header: 'Website',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'website', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'website', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'establishedYear',
                header: 'Established',
                size: 150,
                Cell: ({ cell, row }) => (
                    <textarea
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'establishedYear', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'establishedYear', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'landmark',
                header: 'Landmark',
                size: 150,
                Cell: ({ cell, row }) => (
                    <textarea
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'landmark', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'landmark', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'youCanFind',
                header: 'You Can Find',
                size: 150,
                Cell: ({ cell, row }) => (
                    <textarea
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'youCanFind', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'youCanFind', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'accesses',
                header: 'Accesses',
                size: 150,
                Cell: ({ cell, row }) => (
                    <textarea
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'accesses', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'accesses', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'trails',
                header: 'Trails',
                size: 150,
                Cell: ({ cell, row }) => (
                    <textarea
                        defaultValue={handleCleanLongText(cell.getValue<string>())}
                        onChange={(e) => handleInputChange(row.original.id, 'trails', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'trails', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'stampImage',
                header: 'Stamp Image',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'stampImage', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'stampImage', e.target.value)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <div>
            <MaterialReactTable<Park>
                columns={columns}
                data={allParks ?? []}
                enableExpanding
                enableKeyboardShortcuts={false}
                renderDetailPanel={({ row }) => (
                    <div className='ml-14 grid gap-6 p-4'>
                        {/* Addresses Section */}
                        <div>
                            <h4>Addresses</h4>
                            <button
                                type='button'
                                onClick={() => handleNestedArrayChange(row.original.id, 'addresses', 'add')}
                            >
                                Add Address
                            </button>
                            {row.original.addresses?.map((address, index) => (
                                <div
                                    key={address.title}
                                    className='m-4 ml-0 flex w-[523px] items-center rounded-lg bg-secondary-lightblue p-4'
                                >
                                    <div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='title' className='w-40 pt-1'>
                                                Title:{' '}
                                            </label>
                                            <input
                                                id='title'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={address.title}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `addresses[${index}].title`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `addresses[${index}].title`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='addressLineOne' className='w-40 pt-1'>
                                                Address Line One:{' '}
                                            </label>
                                            <input
                                                id='addressLineOne'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={address.addressLineOne}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `addresses[${index}].addressLineOne`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `addresses[${index}].addressLineOne`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='addressLineTwo' className='w-40 pt-1'>
                                                Address Line Two:{' '}
                                            </label>
                                            <input
                                                id='addressLineTwo'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={address.addressLineTwo}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `addresses[${index}].addressLineTwo`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `addresses[${index}].addressLineTwo`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='city' className='w-40 pt-1'>
                                                City:{' '}
                                            </label>
                                            <input
                                                id='city'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={address.city}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `addresses[${index}].city`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `addresses[${index}].city`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='state' className='w-40 pt-1'>
                                                State:{' '}
                                            </label>
                                            <input
                                                id='state'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={address.state}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `addresses[${index}].state`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `addresses[${index}].state`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='zip' className='w-40 pt-1'>
                                                Zipcode:{' '}
                                            </label>
                                            <input
                                                id='zip'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={address.zipcode}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `addresses[${index}].zipcode`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `addresses[${index}].zipcode`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className='-my-1 float-right ml-4 flex h-7 w-7 items-center justify-center rounded-full border border-system-black p-1'
                                        type='button'
                                        onClick={() =>
                                            handleNestedArrayChange(row.original.id, 'addresses', 'remove', index)
                                        }
                                    >
                                        &minus;
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Editable Icons */}
                        <div>
                            <h4>Icons</h4>
                            {row.original.icons?.map((icon, index) => (
                                <div
                                    key={icon.iconName}
                                    className='m-4 ml-0 block w-[523px] rounded-lg bg-secondary-lightblue p-4'
                                >
                                    <span>{icon.tooltip}</span>

                                    <button
                                        className='-my-1 float-right ml-4 flex h-7 w-7 items-center justify-center rounded-full border border-system-black p-1'
                                        type='button'
                                        onClick={() =>
                                            handleNestedArrayChange(row.original.id, 'icons', 'remove', index)
                                        }
                                    >
                                        &minus;
                                    </button>
                                </div>
                            ))}
                            <div className='m-4 ml-0 flex w-[523px] rounded-lg bg-secondary-lightblue p-4'>
                                <select
                                    className='w-full rounded-lg bg-system-white p-1 outline'
                                    onChange={(e) => {
                                        const icon = PARK_ICONS.find((icon) => icon.tooltip === e.target.value);
                                        const updatedSelectedIcons = selectedIcon.filter(
                                            (x) => x.parkId !== row.original.id,
                                        );
                                        if (icon) {
                                            updatedSelectedIcons?.push({ icon: icon, parkId: row.original.id });
                                        }
                                        setSelectedIcon(updatedSelectedIcons);
                                    }}
                                >
                                    <option value=''>Select an icon</option>
                                    {getUnselectedIcons(row.original).map((icon) => (
                                        <option key={icon.tooltip} value={icon.tooltip}>
                                            {icon.tooltip}
                                        </option>
                                    ))}
                                </select>
                                {selectedIcon &&
                                    selectedIcon.find((x) => x.parkId === row.original.id) !== undefined && (
                                        <button
                                            className='ml-4 flex h-7 w-7 items-center justify-center rounded-full border border-system-black p-1'
                                            type='button'
                                            onClick={() => {
                                                handleNestedArrayChange(
                                                    row.original.id,
                                                    'icons',
                                                    'add',
                                                    undefined,
                                                    selectedIcon.find((x) => x.parkId === row.original.id)?.icon,
                                                );
                                                setSelectedIcon(
                                                    selectedIcon.filter((x) => x.parkId !== row.original.id),
                                                );
                                            }}
                                        >
                                            &#43;
                                        </button>
                                    )}
                            </div>
                        </div>

                        {/* Editable Photos */}
                        <div>
                            <h4>Photos</h4>
                            <button
                                type='button'
                                onClick={() => handleNestedArrayChange(row.original.id, 'photos', 'add')}
                            >
                                Add Photo
                            </button>
                            {row.original.photos?.map((photo, index) => (
                                <div
                                    key={photo.photoPath}
                                    className='m-4 ml-0 flex w-[523px] items-center rounded-lg bg-secondary-lightblue p-4'
                                >
                                    <div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='zip' className='w-40 pt-1'>
                                                Zipcode:{' '}
                                            </label>
                                            <input
                                                id='zip'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={photo.photoPath}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `photo[${index}].photoPath`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `photo[${index}].photoPath`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className='mb-2 flex'>
                                            <label htmlFor='zip' className='w-40 pt-1'>
                                                Zipcode:{' '}
                                            </label>
                                            <input
                                                id='zip'
                                                className='w-72 rounded-lg bg-system-white p-1 outline'
                                                defaultValue={photo.alt}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        row.original.id,
                                                        `photo[${index}].alt`,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    handleInputBlur(
                                                        row.original.id,
                                                        `photo[${index}].alt`,
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className='-my-1 float-right ml-4 flex h-7 w-7 items-center justify-center rounded-full border border-system-black p-1'
                                        type='button'
                                        onClick={() =>
                                            handleNestedArrayChange(row.original.id, 'photos', 'remove', index)
                                        }
                                    >
                                        &minus;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                renderBottomToolbarCustomActions={() => (
                    <div className='w-8/12'>
                        <button
                            className='float-right rounded-lg bg-secondary-orange p-3 text-system-white'
                            onClick={() => handleSave(editedParks)}
                            disabled={editedParks.length === 0}
                            type='button'
                        >
                            Save Changes
                        </button>
                        <button
                            className='float-left rounded-lg bg-secondary-orange p-3 text-system-white'
                            onClick={() => handleAddNewPark}
                            type='button'
                        >
                            Add New Park
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default EditParks;
