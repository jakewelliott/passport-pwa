// USAGE:
// import RoundedButton from "@/components/common/rounded-button";
// <RoundedButton title="TEXT_ONE" color="TEXT_TWO" />
// Note TEXT_ONE is the text that the button will display and TEXT_TWO is the color (no need to say bg-)
// ex: <RoundedButton title="TEXT_ONE" color="system_black" />

interface ButtonProps {
    title: string;
    color?: string;
}

const RoundedButton: React.FC<ButtonProps> = ({ title, color = 'secondary_darkteal' }) => {

    return (
        <div className={`bg-${color} text-center justify-center items-center flex`} style={{width: '146px', height: '50px', borderRadius: '25px'}}>
            <p className="button-text text-system_white">{title}</p>
        </div>
    );
}

export default RoundedButton;