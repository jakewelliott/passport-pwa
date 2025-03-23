import { mockUserProfile } from './components';

// here's some generic "SQL queries" that our controllers will use
// we use mockUserProfile as our test user

export const selectByUser = <T extends { userId: number }>(table: T[]) => {
  return table.filter((item) => item.userId === mockUserProfile.id);
};

export const selectById = <T extends { id: number }>(table: T[], id: number) => {
  const x = table.find((item) => item.id === id);
  if (!x) throw new Error(`Item not found: ${id}`);
  return x;
};

export const postUserContent = <T>(req: T) => {
  return {
    id: Math.floor(Math.random() * 1000000),
    userId: mockUserProfile.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    ...req,
  };
};
