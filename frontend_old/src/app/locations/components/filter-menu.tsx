import { FaFilter } from 'react-icons/fa';

interface FilterMenuProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    isTypingSearch: boolean;
    setIsTypingSearch: (value: boolean) => void;
    setIsFilterModalOpen: (value: boolean) => void;
}

export const FilterMenu = ({
    searchQuery,
    setSearchQuery,
    isTypingSearch,
    setIsTypingSearch,
    setIsFilterModalOpen,
}: FilterMenuProps) => (
    <div className='relative flex gap-2'>
        <div className='relative flex-1'>
            <input
                type='text'
                placeholder='Search parks...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsTypingSearch(true)}
                onBlur={() => setIsTypingSearch(false)}
                className='w-full rounded-lg border border-system_gray p-3 pr-7 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
            />
            {searchQuery && (
                <button
                    type='button'
                    onClick={() => setSearchQuery('')}
                    className='-translate-y-1/2 absolute top-1/2 right-3 transform text-system_gray hover:text-secondary_darkteal'
                    aria-label='Clear search'
                >
                    &times;
                </button>
            )}
        </div>
        <button
            type='button'
            onClick={() => setIsFilterModalOpen(true)}
            className={
                'w-auto rounded-lg border border-system_gray bg-system_white px-3 py-2 transition-all duration-200'
            }
            style={{ display: isTypingSearch ? 'none' : 'inline' }}
        >
            <FaFilter />
        </button>
    </div>
);
