export interface DogResponse {
  message: string;
  status: string;
}

async function getDogs(quantity = 1) {
  const dogs: Array<DogResponse> = [];
  const apiUrl = "https://dog.ceo/api/breeds/image/random";

  for (let i = 0; i < quantity; i++) {
    const response = await fetch(apiUrl);
    const dog: DogResponse = await response.json();
    dogs.push(dog);
  }

  return dogs;
}

export default getDogs;
