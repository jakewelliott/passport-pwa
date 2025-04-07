import { useField } from '@/hooks/useField';
import type { DatabaseEntry, Park as ParkT } from '@/types';
import { PARK_ICONS, type ParkIcon } from '@/types/icons';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

type Park = Omit<ParkT, keyof DatabaseEntry>;

// this is somewhat expensive
const isParkIcon = (obj: any): obj is ParkIcon => {
    return PARK_ICONS.some(
        (icon) => icon.iconName === obj.iconName && icon.tooltip === obj.tooltip && icon.extraText === obj.extraText,
    );
};

const parkIconSchema = z.custom<ParkIcon>(isParkIcon);

// TODO: make this match the database AND readability stuff
// i.e. parkName should have "State Park" at the end
// coordinates should be to xyz decmial places

// NOTE: some of the fields that are stored internally in
// different tables and joined in the request will need separate
// fields in the form

// ADAM: jake i just am now seeing ur edit-park-modal.tsx
// so i will reuse the UI u made there for addresses, icons, photos, etc.
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

export const EditParkForm = ({ park, refetch }: { park: Park; refetch: () => void }) => {
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
