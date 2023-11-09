export interface CartItem {
    id: number;
    name: string;
    price: number;
    path: string;
    description: string;
}

export const cartItemMocks: CartItem[] = [
    {
        id: 0,
        name: 'xander0',
        price: 500,
        path: '/assets/mock/xander0.jpg',
        description: 'Sample pet 01'
    },
    {
        id: 1,
        name: 'xander1',
        price: 600,
        path: '/assets/mock/xander1.jpg',
        description: 'Sample pet 02'
    },
    {
        id: 2,
        name: 'xander2',
        price: 550,
        path: '/assets/mock/xander2.jpg',
        description: 'Sample pet 03'
    }
];
