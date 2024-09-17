export interface Book {
    authors: string[];
    categories: string[];
    description: string;
    id: string;
    image_links: ImgLinks;
    published_date: string;
    publisher: string;
    subtitle: string;
    title: string;
    buy_link: string;
}

export interface ImgLinks {
    smallThumbnail: string;
}

export interface Bookshelf {
    id: number;
    title: string;
    access: string;
    book_count: number;
}

export interface AlertStatus {
    status: "info" | "warning" | "success" | "error" | "loading" | undefined
}

export enum FilterValues {
    purchaseable = 'Purchaseable',
    fiction = 'Fiction',
    nonFiction = 'Nonfiction',
    childrens = 'Juvenile'
  };

// export interface User {
//     id: string;
// }