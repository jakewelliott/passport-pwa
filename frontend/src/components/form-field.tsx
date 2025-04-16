import { cn } from '@/lib/cn-helper';
import { useEffect, useRef } from 'react';

interface FormFieldProps {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    longText?: boolean;
    // bulleted?: boolean;
}

export function FormField({
    label,
    id,
    value,
    onChange,
    error = false,
    longText = false,
    // bulleted = false,
}: FormFieldProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (longText) {
            adjustTextareaHeight();
        }
    }, [value, longText]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    return (
        <div className='w-full'>
            <label htmlFor={id} className='block'>
                {label}
            </label>
            {!longText && (
                <input
                    type='text'
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        'mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-1 focus:ring-opacity-100',
                        error
                            ? 'border-system-red ring-1 ring-system-red focus:border-system-red'
                            : 'border-system-gray focus:border-secondary-darkteal focus:ring-secondary-darkteal',
                    )}
                />
            )}
            {longText && (
                <textarea
                    ref={textareaRef}
                    id={id}
                    value={value}
                    onChange={handleTextChange}
                    className={cn(
                        'mt-1 w-full overflow-hidden rounded-lg border p-3 focus:outline-none focus:ring-1 focus:ring-opacity-100',
                        error
                            ? 'border-system-red ring-1 ring-system-red focus:border-system-red'
                            : 'border-system-gray focus:border-secondary-darkteal focus:ring-secondary-darkteal',
                    )}
                />
            )}
        </div>
    );
}
