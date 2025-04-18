// USAGE:
// import RoundedButton from "@/components/common/rounded-button";
// <RoundedButton title="TEXT_ONE" color="TEXT_TWO" variant="VARIANT" />
// Note TEXT_ONE is the text that the button will display and TEXT_TWO is the color (no need to say bg-)
// ex: <RoundedButton title="TEXT_ONE" color="system-black" />
// Available variants: "default", "outline", "small", "large", "icon"
import { cn } from '@/lib/cn-helper';

// Button variant types
type ButtonVariant = 'default' | 'outline' | 'small' | 'large' | 'icon';

interface ButtonProps {
    title: string;
    color?: string;
    onClick?: (e: React.FormEvent) => unknown;
    type?: 'button' | 'submit' | 'reset';
    width?: string;
    textColor?: string;
    textSize?: string;
    variant?: ButtonVariant;
    icon?: React.ReactNode;
    disabled?: boolean;
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
    variant = 'default',
    icon,
    disabled = false,
}) => {
    // Base styles for all button variants
    const baseStyles =
        'flex cursor-pointer select-none items-center justify-center text-center rounded-full transition-all duration-200';

    // Variant-specific styles
    const variantStyles = {
        default: 'p-4',
        outline: 'p-4 border-2',
        small: 'p-2 text-sm',
        large: 'p-6',
        icon: 'p-3',
    };

    // Compose the className based on variant
    const className = cn(
        baseStyles,
        variantStyles[variant],
        variant === 'outline' ? `border-${color.replace('bg-', '')}` : color,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
    );

    // Adjust text color for outline variant
    const finalTextColor = variant === 'outline' ? color.replace('bg-', '') : textColor;

    // Adjust width based on variant
    const buttonWidth = variant === 'icon' ? 'auto' : `${width}px`;

    // Adjust text size based on variant
    const finalTextSize = variant === 'small' ? 'text-sm' : variant === 'large' ? 'text-3xl' : textSize;

    // Horizontal margin from icon if it's an icon button
    const iconMargin = variant === 'icon' ? 'mx-2' : 'mr-2';

    return (
        <button
            type={type}
            className={className}
            onClick={disabled ? undefined : onClick}
            style={{ minWidth: buttonWidth }}
            disabled={disabled}
        >
            {icon && <span className={iconMargin}>{icon}</span>}
            <p className={cn(`text-${finalTextColor}`, finalTextSize)}>{title}</p>
        </button>
    );
};

export default RoundedButton;
