import { useField } from '@/hooks/useField';
import { useForm } from '@tanstack/react-form';

import { usePark } from '@/hooks/queries/useParks';
import type { DatabaseEntry, Park as ParkT } from '@/types';
import { PARK_ICONS, type ParkIcon } from '@/types/icons';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';

type Park = Omit<ParkT, keyof DatabaseEntry>;

const EMPTY_PARK: Park = {
    parkName: 'Loading...',
    coordinates: {
        latitude: 0,
        longitude: 0,
        inaccuracyRadius: 0,
    },
    phone: 0,
    email: '',
    establishedYear: '',
    landmark: '',
    youCanFind: '',
    trails: '',
    website: '',
    addresses: [],
    icons: [],
    photos: [],
    abbreviation: '',
    stampImage: '',
    accesses: '',
};

// TODO: make this match the database AND readability stuff
// i.e. parkName should have "State Park" at the end
// coordinates should be to xyz decmial places

// NOTE: some of the fields that are stored internally in
// different tables and joined in the request will need separate
// fields in the form

// this is somewhat expensive
const isParkIcon = (obj: any): obj is ParkIcon => {
    return PARK_ICONS.some(
        (icon) => icon.iconName === obj.iconName && icon.tooltip === obj.tooltip && icon.extraText === obj.extraText,
    );
};

const parkIconSchema = z.custom<ParkIcon>(isParkIcon);

const parkSchema = z.object({
    parkName: z.string().min(1),
    coordinates: z.object({
        latitude: z.number(),
        longitude: z.number(),
        inaccuracyRadius: z.number(),
    }),
    phone: z.number(),
    email: z.string().email(),
    establishedYear: z.string().regex(/^(19|20)\d{2}$/, { message: 'Invalid year' }),
    landmark: z.string().min(1),
    youCanFind: z.string().min(1),
    trails: z.string().min(1),
    website: z.string().url(),
    addresses: z.array(
        z.object({
            title: z.string().min(1),
            addressLineOne: z.string().min(1),
            addressLineTwo: z.string().min(1),
            city: z.string().min(1),
            state: z.string().min(1),
            zipcode: z.number().min(1),
        }),
    ),
    icons: z.array(parkIconSchema),
    photos: z.array(
        z.object({
            photoPath: z.string(),
            alt: z.string(),
        }),
    ),
    abbreviation: z.string().min(1),
    stampImage: z.string().min(1),
    accesses: z.string().min(1),
});

export const EditParkForm = () => {
    // TODO: make this like a sub route (/admin/edit/park/:abbreviation) how it is for location info
    const abbreviation = useLocation().pathname.split('/').pop() ?? '';
    const { data } = usePark(abbreviation);

    const park = data ?? EMPTY_PARK;

    const form = useForm({
        defaultValues: {
            ...park,
        },
        onSubmit: async (values) => {
            // Submit to API
            console.log(values);
        },
        validators: {
            onBlur: parkSchema,
            onSubmit: parkSchema,
        },
    });

    const Field = useField(form);

    return (
        <div className='flex flex-col gap-4'>
            <Field name='parkName' label='Park Name' />
            <Field name='coordinates' label='Coordinates' />
            <Field name='phone' label='Phone' />
            <Field name='email' label='Email' />
            <Field name='establishedYear' label='Established Year' />
            <Field name='landmark' label='Landmark' />
            <Field name='youCanFind' label='You Can Find' />
            <Field name='trails' label='Trails' />
            <Field name='website' label='Website' />
            {/* TODO: make interfaces for these fields */}
            {/* <Field name='addresses' label='Addresses' /> */}
            {/* <Field name='icons' label='Icons' /> */}
            {/* <Field name='photos' label='Photos' /> */}
            <Field name='abbreviation' label='Abbreviation' />
            <Field name='stampImage' label='Stamp Image' />
            <Field name='accesses' label='Accesses' />
        </div>
    );
};
