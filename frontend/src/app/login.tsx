import RoundedButton from '@/components/common/rounded-button';

export default function LoginPage() {
  return (
    <div
      className='flex min-h-screen w-full items-center justify-center bg-center bg-cover bg-no-repeat'
      style={{ backgroundImage: "url('/photos/SILA-BackCover.jpg')" }}
    >
      <form className='m-auto flex max-w-96 flex-col items-center gap-3 rounded-3xl bg-supporting_lightblue bg-opacity-75 p-8'>
        <input
          type='text'
          placeholder='Username'
          required
          className='w-80 rounded-lg border border-system_gray p-3 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
        />
        <input
          type='password'
          placeholder='Password'
          required
          className='w-80 rounded-lg border border-system_gray p-3 focus:border-secondary_darkteal focus:outline-none focus:ring-1 focus:ring-secondary_darkteal focus:ring-opacity-100'
        />
        <p className='text-center'>
          By using this application, you agree to the State of NC's{' '}
          <a href='https://www.nc.gov/privacy' target='blank'>
            Privacy Policy
          </a>
        </p>
        <div className='flex flex-row gap-4'>
          <RoundedButton title={'Register'} />
          <RoundedButton title={'Login'} color='secondary_orange' />
        </div>
      </form>
    </div>
  );
}
