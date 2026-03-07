export interface Category {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    sortOrder: number;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreateCategoryInput {
    name: string;
    slug?: string;
    image: string;
    description: string;
    sortOrder: number;
    isActive?: boolean;
    isFeatured?: boolean;
}
