export async function httpGetUser(qty: number): Promise<[User]> {
  const response = await fetch(`https://randomuser.me/api/?results=${qty}`);
  const userReponse = (await response.json()) as UserResponse;

  return userReponse.results;
}
