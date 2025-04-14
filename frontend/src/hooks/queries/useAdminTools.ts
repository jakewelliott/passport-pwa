import {
    API_AUTH_URL,
    API_BUCKET_LIST_URL,
    API_PARKS_URL,
    API_TRAILS_URL,
    fetchDelete,
    fetchPost,
    fetchPut,
} from '@/lib/fetch';
import type { BucketListItem, Park, Trail, UserProfile } from '@/types';
import { useMutation } from '@tanstack/react-query';

// ADAM: normally i think one file, one purpose, but this is a collection of admin tools
// so i think it's less ugly to have all in one file

// parks
export const useCreatePark = () => {
    return useMutation({
        mutationKey: ['admin', 'parks', 'create'],
        mutationFn: (park: Park) => fetchPost(API_PARKS_URL, park),
    });
};

export const useUpdatePark = () => {
    return useMutation({
        mutationKey: ['admin', 'parks', 'update'],
        mutationFn: (park: Park) => fetchPut(`${API_PARKS_URL}/${park.id}`, park),
    });
};

export const useDeletePark = () => {
    return useMutation({
        mutationKey: ['admin', 'parks', 'delete'],
        mutationFn: (park: Park) => fetchDelete(`${API_PARKS_URL}/${park.id}`),
    });
};

// bucket list
export const useCreateBucketListItem = () => {
    return useMutation({
        mutationKey: ['admin', 'bucketList', 'create'],
        mutationFn: (bucketListItem: BucketListItem) => fetchPost(API_BUCKET_LIST_URL, bucketListItem),
    });
};
export const useUpdateBucketListItem = () => {
    return useMutation({
        mutationKey: ['admin', 'bucketList', 'update'],
        mutationFn: (bucketListItem: BucketListItem) =>
            fetchPut(`${API_BUCKET_LIST_URL}/${bucketListItem.id}`, bucketListItem),
    });
};
export const useDeleteBucketListItem = () => {
    return useMutation({
        mutationKey: ['admin', 'bucketList', 'delete'],
        mutationFn: (bucketListItem: BucketListItem) => fetchDelete(`${API_BUCKET_LIST_URL}/${bucketListItem.id}`),
    });
};

// trails
export const useCreateTrail = () => {
    return useMutation({
        mutationKey: ['admin', 'trails', 'create'],
        mutationFn: (trail: Trail) => fetchPost(API_TRAILS_URL, trail),
    });
};

export const useUpdateTrail = () => {
    return useMutation({
        mutationKey: ['admin', 'trails', 'update'],
        mutationFn: (trail: Trail) => fetchPut(`${API_TRAILS_URL}/${trail.id}`, trail),
    });
};

export const useDeleteTrail = () => {
    return useMutation({
        mutationKey: ['admin', 'trails', 'delete'],
        mutationFn: (trail: Trail) => fetchDelete(`${API_TRAILS_URL}/${trail.id}`),
    });
};

// users

// const useUpdateUser = () => {
//     return useMutation({
//         mutationKey: ['admin', 'users', 'update'],
//         mutationFn: (user: UserProfile) => fetchPut(`${API_AUTH_URL}/${user.id}`, user),
//     });
// };

export const useUpdateUserRole = () => {
    return useMutation({
        mutationKey: ['admin', 'users', 'updateRole'],
        mutationFn: (user: UserProfile) => fetchPut(`${API_AUTH_URL}/${user.id}/role`, user),
    });
};

export const useUpdateUserPassword = () => {
    return useMutation({
        mutationKey: ['admin', 'users', 'updatePassword'],
        mutationFn: (user: UserProfile) => fetchPut(`${API_AUTH_URL}/${user.id}/password`, user),
    });
};
