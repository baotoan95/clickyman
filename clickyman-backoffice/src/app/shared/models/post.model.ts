export interface IPostModel {
  title: string;
  author: string;
  category: string;
  publishedDate?: string;
  createdDate?: string;
  updatedDate?: string;
}

export class PostModel implements IPostModel {
  title: string;
  author: string;
  category: string;
  createdDate?: string;
  publishedDate?: string;
  updatedDate?: string;
}
