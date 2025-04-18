export const PassportHeader = () => {
    return (
        <div className='flex h-2/4 flex-col items-center justify-center'>
            <img
                src='/DPRLogoWhite.svg'
                alt='North Carolina Department of Parks and Rec White Logo'
                width='136'
                height='103'
            />
            <h3 className='text-center'>North Carolina State Parks</h3>
            <p className='script h-20' style={{ paddingTop: 30 }}>
                Passport
            </p>
        </div>
    );
};
