import type { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';

// ADAM: this is a hook that handles two things:
// 1. tracking state for created, updated, and deleted items
// 2. persisting those changes to the database
// its messy but its a nice interface to use on the admin pages and saves on boilerplate
// or moreso keeps it in one place lol

type UMR<T> = UseMutationResult<Response, Error, T, unknown>;

export type Cruddable<T> = {
    createHook: () => UMR<T>;
    updateHook: () => UMR<T>;
    deleteHook: () => UMR<T>;
};

export const useCRUD = <T>(data: T[] | undefined, mutators: Cruddable<T>, identifier: keyof T) => {
    const [created, setCreated] = useState<T[]>([]);
    const [updated, setUpdated] = useState<T[]>([]);
    const [deleted, setDeleted] = useState<T[]>([]);

    const handleHelper = (setter: any) => {
        return (item: T) => {
            const withoutOld = data?.filter((old) => old[identifier] !== item[identifier]) ?? [];
            setter([...withoutOld, item]);
        };
    };

    const handleCreate = handleHelper(setCreated);
    const handleUpdate = handleHelper(setUpdated);
    const handleDelete = handleHelper(setDeleted);

    // ADAM: sorry
    const handleSave = () => {
        for (const item of created) {
            mutators.createHook().mutate(item);
        }
        for (const item of updated) {
            mutators.updateHook().mutate(item);
        }
        for (const item of deleted) {
            mutators.deleteHook().mutate(item);
        }
    };

    return {
        created,
        updated,
        deleted,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleSave,
    };
};
