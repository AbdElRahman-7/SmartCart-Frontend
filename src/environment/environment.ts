if(!import.meta.env.BASE_URL){
    throw new Error("BASE_URL is not defined");
}
export const environment = {
    baseUrl: import.meta.env.BASE_URL,
    apis: {
        products: "/products",
    },
}
