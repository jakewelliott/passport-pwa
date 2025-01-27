interface IconRowProps {
    iconName: string;
    title: string;
    extraText?: string;
}

export const IconRow: React.FC<IconRowProps> = ({ iconName, title, extraText }) => {
    return (
        <div className="m-4 flex items-center">
            <img src={`../park-icons/${iconName}`} alt={title} width={'36px'} height={'36px'} />
            <div className="w-full flex flex-col justify-center ml-2">
                <p>{title}</p>
                <p className="p-mini">{extraText}</p>
            </div>
        </div>
    );
}
