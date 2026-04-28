export type ProjectCategory = "Интерьеры" | "Архитектура" | "Ландшафт";
export type FilterCategory = ProjectCategory | "Все";

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
};
