import { useCreateTrail, useUpdateTrail } from '@/hooks/queries/useAdminTools';
import { useTrails } from '@/hooks/queries/useTrails';
import { TRAIL_ICONS, type TrailIcon } from '@/types/icons';
import type { Trail } from '@/types/tables';
import { type MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';

/**
 * Edit Trails page
 *
 * This is the edit trails page for admins to edit trails
 *
 * @returns {React.ReactNode} The edit trails page
 */
const EditTrails = () => {
    const { data: trails } = useTrails();
    const [editedTrails, setEditedTrails] = useState<Trail[]>([]);
    const [allTrails, setAllTrails] = useState<Trail[]>(trails || []);
    const [selectedIcon, setSelectedIcon] = useState<{ icon: TrailIcon; trailId: number }[]>([]);

    const { mutate: update } = useUpdateTrail();
    const { mutate: create } = useCreateTrail();

    useEffect(() => {
        if (trails) {
            setAllTrails(() => trails.map((trail) => editedTrails.find((ep) => ep.id === trail.id) || trail));
        }
    }, [trails, editedTrails]);

    const handleAddNewTrail = () => {
        // Create a blank trail object with default values
        const newTrail: Trail = {
            id: Date.now(), // Use timestamp as unique ID
            trailName: '',
            distance: '',
            description: '',
            icons: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            deleted: false,
        };

        // Add the new trail to the beginning of the allTrails array
        setAllTrails((prev) => [newTrail, ...prev]);
    };

    const handleInputChange = (trailId: number, path: string, value: unknown) => {
        setAllTrails((prev) =>
            prev.map((trail) =>
                trail.id === trailId
                    ? {
                          ...trail,
                          [path]: value,
                      }
                    : trail,
            ),
        );
    };

    const handleInputBlur = (trailId: number, path: string, value: string) => {
        setEditedTrails((prev) => {
            const originalTrail = trails?.find((p) => p.id === trailId);
            if (!originalTrail) return prev;

            const trailIndex = prev.findIndex((p) => p.id === trailId);
            const baseTrail = trailIndex === -1 ? originalTrail : prev[trailIndex];
            const newTrail = structuredClone(baseTrail);

            setDeepProperty(newTrail, path, value);

            return trailIndex === -1 ? [...prev, newTrail] : prev.map((p) => (p.id === trailId ? newTrail : p));
        });
    };

    function handleSave(editedTrails: Trail[]): void {
        console.log(editedTrails);
        for (const trail of editedTrails) {
            if (trail.id > 9999) {
                create(trail);
            } else {
                update(trail);
            }
        }
    }

    const getUnselectedIcons = (trail: Trail) => {
        const selectedIconNames = new Set(trail.icons.map((icon) => icon.iconName));
        return TRAIL_ICONS.filter((icon) => !selectedIconNames.has(icon.iconName));
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
        trailId: number,
        arrayPath: keyof Trail,
        action: 'add' | 'remove',
        index?: number,
        newValue?: any, // Optional parameter for new value
    ) => {
        setEditedTrails((prev) => {
            const originalTrail = trails?.find((p) => p.id === trailId);
            if (!originalTrail) return prev;

            const existingTrail = prev.find((p) => p.id === trailId);
            const baseTrail = existingTrail ?? originalTrail;

            const currentArray = (baseTrail[arrayPath] as unknown[]) ?? [];
            const newArray = [...currentArray];

            if (action === 'add' && newValue) {
                newArray.push(newValue);
            } else if (action === 'remove' && index !== undefined) {
                newArray.splice(index, 1);
            }

            const newTrail = existingTrail
                ? { ...existingTrail, [arrayPath]: newArray }
                : { ...originalTrail, [arrayPath]: newArray };

            return existingTrail ? prev.map((p) => (p.id === trailId ? newTrail : p)) : [...prev, newTrail];
        });
    };

    //should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Trail>[]>(
        () => [
            {
                accessorKey: 'trailName',
                header: 'Name',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'trailName', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'trailName', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'distance',
                header: 'Length',
                size: 75,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'distance', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'distance', e.target.value)}
                    />
                ),
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 150,
                Cell: ({ cell, row }) => (
                    <input
                        defaultValue={cell.getValue<string>()}
                        onChange={(e) => handleInputChange(row.original.id, 'description', e.target.value)}
                        onBlur={(e) => handleInputBlur(row.original.id, 'description', e.target.value)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <div>
            <MaterialReactTable<Trail>
                columns={columns}
                data={allTrails ?? []}
                enableExpanding
                enableKeyboardShortcuts={false}
                renderDetailPanel={({ row }) => (
                    <div className='ml-14 grid gap-6 p-4'>
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
                                        const icon = TRAIL_ICONS.find((icon) => icon.tooltip === e.target.value);
                                        const updatedSelectedIcons = selectedIcon.filter(
                                            (x) => x.trailId !== row.original.id,
                                        );
                                        if (icon) {
                                            updatedSelectedIcons?.push({ icon: icon, trailId: row.original.id });
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
                                    selectedIcon.find((x) => x.trailId === row.original.id) !== undefined && (
                                        <button
                                            className='ml-4 flex h-7 w-7 items-center justify-center rounded-full border border-system-black p-1'
                                            type='button'
                                            onClick={() => {
                                                handleNestedArrayChange(
                                                    row.original.id,
                                                    'icons',
                                                    'add',
                                                    undefined,
                                                    selectedIcon.find((x) => x.trailId === row.original.id)?.icon,
                                                );
                                                setSelectedIcon(
                                                    selectedIcon.filter((x) => x.trailId !== row.original.id),
                                                );
                                            }}
                                        >
                                            &#43;
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
                renderBottomToolbarCustomActions={() => (
                    <div className='w-8/12'>
                        <button
                            className='float-right rounded-lg bg-secondary-orange p-3 text-system-white'
                            onClick={() => handleSave(editedTrails)}
                            disabled={editedTrails.length === 0}
                            type='button'
                        >
                            Save Changes
                        </button>
                        <button
                            className='float-left rounded-lg bg-secondary-orange p-3 text-system-white'
                            onClick={() => handleAddNewTrail}
                            type='button'
                        >
                            Add New Trail
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default EditTrails;
