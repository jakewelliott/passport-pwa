import { cn } from '@/lib/cn-helper';

interface BoxProps {
    title: string;
    headerClass: string;
    bodyClass: string;
    children: React.ReactNode;
}

export const Box = ({ title, headerClass, bodyClass, children }: BoxProps) => {
    return (
        <div className='flex-col'>
            <div
                className={cn(
                    'flex w-full items-center justify-center p-2 pt-3 text-center text-system_white',
                    headerClass,
                )}
            >
                <h3>{title}</h3>
            </div>
            <div className={cn('p-4', bodyClass)}>{children}</div>
        </div>
    );
};
