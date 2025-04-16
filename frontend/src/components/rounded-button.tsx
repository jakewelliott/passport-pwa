// USAGE:
// import RoundedButton from "@/components/common/rounded-button";
// <RoundedButton title="TEXT_ONE" color="TEXT_TWO" />
// Note TEXT_ONE is the text that the button will display and TEXT_TWO is the color (no need to say bg-)
// ex: <RoundedButton title="TEXT_ONE" color="system-black" />
import { cn } from '@/lib/cn-helper';
interface ButtonProps {
    title: string;
    color?: string;
    onClick?: (e: React.FormEvent) => unknown;
    type?: 'button' | 'submit' | 'reset';
    width?: string;
    textColor?: string;
    textSize?: string;
}

const RoundedButton: React.FC<ButtonProps> = ({
    title,
    color = 'bg-secondary-darkteal',
    onClick = (e: React.FormEvent) => {
        e.preventDefault();
    },
    type = 'button',
    width = '128',
    textColor = 'system-white',
    textSize = 'text-2xl',
}) => {
    const className = cn(
        'flex cursor-pointer select-none items-center justify-center text-center p-4 rounded-full',
        color,
    );

    return (
        <button type={type} className={className} onClick={onClick} style={{ minWidth: `${width}px` }}>
            <p className={cn(`text-${textColor}`, textSize)}>{title}</p>
        </button>
    );
};

export default RoundedButton;
