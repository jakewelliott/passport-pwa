interface LocationTabBarProps {
    choice: number;
    onChoiceChange: (newChoice: number) => void;
}

export const LocationTabBar: React.FC<LocationTabBarProps> = ({ choice, onChoiceChange }) => {
    return (
        <div className="flex justify-around items-center h-12 border-b border-supporting_bluegray">
            {['Details', 'Photos', 'Notes'].map((tab, index) => (
                <div 
                    key={tab}
                    onClick={() => onChoiceChange(index)}
                    className={`flex items-center justify-center h-full relative w-full p-2 cursor-pointer ${
                        choice === index 
                        ? 'text-system_black' 
                        : 'text-supporting_darkgray'
                    }`}
                >
                    <p>{tab}</p>
                    <div className={`absolute bottom-0 left-0 right-0 bg-secondary_darkteal h-0.5 ${choice !== index ? 'hidden' : ''}`} />
                </div>
            ))}
        </div>
    );
}
