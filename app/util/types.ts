export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    stock_quantity: number,
    image_url: string[],
    available: boolean,
    created_at: string,
    updated_at: string,
}