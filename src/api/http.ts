export async function httpGetUser(qty: number): Promise<User[]> {
  const response = await fetch(`https://randomuser.me/api/?results=${qty}`);
  const userReponse = (await response.json()) as UserResponse;

  return userReponse.results;
}

export function httpGetCategories(): Promise<Category[]> {
  return Promise.resolve([
    {
      id: 1,
      title: 'Feature',
    },
    {
      id: 2,
      title: 'UI',
    },
    {
      id: 3,
      title: 'UX',
    },
    {
      id: 4,
      title: 'Enhancement',
    },
    {
      id: 5,
      title: 'Bug',
    },
  ]);
}
