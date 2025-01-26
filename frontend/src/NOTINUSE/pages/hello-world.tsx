import { GPSTester } from '../components/GPSTester.tsx';
import Notes from '../components/Notes.tsx';
import { QueryTester } from '../components/QueryTester.tsx';

export const HelloWorld = () => {
  return (
    <div>
      <GPSTester />
      <QueryTester />
      <Notes />
    </div>
  );
};
