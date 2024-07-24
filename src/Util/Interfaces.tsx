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
}

export interface ImgLinks {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
}