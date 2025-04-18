const FieldInfo = ({ fieldMeta }: { fieldMeta: any }) => {
    const errors = fieldMeta.errors.map((error: any) => error.message).join(', ');

    return (
        <div className='min-h-[18px]'>
            <p className='text-destructive text-sm'>{errors}</p>
        </div>
    );
};

export const useField = (form: any) => {
    return ({
        name,
        label = '',
        placeholder = '',
    }: { name: keyof typeof form.state.values; label?: string; placeholder?: string }) => (
        <div className='h-24 w-full gap-1'>
            {label && <p>{label}</p>}
            <form.Field name={name}>
                {(field: any) => (
                    <>
                        <input
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            placeholder={placeholder}
                        />
                        <FieldInfo fieldMeta={field.state.meta} />
                    </>
                )}
            </form.Field>
        </div>
    );
};
