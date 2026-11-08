export interface Category {
  id: string;
  key: string;
  title: string;
  show?: boolean;
  children?: Category[];
}

export interface CategoryStack {
  id: string;
  title: string;
  items: Category[];
  key: string;
}
