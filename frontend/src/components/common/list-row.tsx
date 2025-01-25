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
        <div className={`bg-supporting_lightblue items-center flex p-3 shadow-md`} style={{borderRadius: '15px'}}>
            {children}
        </div>
    );
}

export default ListRow;