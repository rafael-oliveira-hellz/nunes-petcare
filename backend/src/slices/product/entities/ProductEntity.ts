export type ProductData = {
    _id?: string;
    createdById: string;
    name: string;
    quantity: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ProductPaginatedData = {
    products: ProductData[];
    total: number;
};

export class ProductEntity {
    createdById: string;
    name: string;
    quantity: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: ProductData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.quantity = data.quantity;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
