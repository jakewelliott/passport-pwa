// USAGE:
// import RoundedButton from "@/components/common/rounded-button";
// <RoundedButton title="TEXT_ONE" color="TEXT_TWO" />
// Note TEXT_ONE is the text that the button will display and TEXT_TWO is the color (no need to say bg-)
// ex: <RoundedButton title="TEXT_ONE" color="system_black" />
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
    color = 'secondary_darkteal',
    onClick = (e: React.FormEvent) => {
        e.preventDefault();
    },
    type = 'button',
    width = '128',
    textColor = 'system_white',
    textSize = 'button-text',
}) => {
    const className = cn(
        `bg-${color} flex cursor-pointer select-none items-center justify-center text-center p-4 rounded-full`,
    );

    return (
        <button type={type} className={className} onClick={onClick} style={{ minWidth: `${width}px` }}>
            <p className={`text-${textColor} ${textSize}`}>{title}</p>
        </button>
    );
};

export default RoundedButton;
