import { environment } from "../environment/environment";

export const getProducts = async () => {
  const response = await fetch(
    environment.baseUrl + environment.apis.products,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
