// USAGE:
// import ListRow from "@/components/common/list-row";
// <ListRow>
//   ...
// </ListRow>

interface RowProps {
    children: React.ReactNode;
}

const ListRow: React.FC<RowProps> = ({ children }) => {
    return (
        <div className={'flex items-center bg-supporting-lightblue p-3 shadow-md'} style={{ borderRadius: '15px' }}>
            {children}
        </div>
    );
};

export default ListRow;
