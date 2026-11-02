export type PackageCategory = 'ensaios' | 'civil' | 'cerimonia' | 'casamento';
export interface FilmPackage {
  id: string;
  name: string;
  category: PackageCategory;
  price: number;
  duration?: string;
  image: string;
  includes: string[];
  note?: string;
}
export interface Project {
  id: string;
  title: string;
  category: 'Casamentos' | 'Outros projetos';
  cover?: string;
  alt: string;
  description: string;
  videoUrl?: string;
  example: boolean;
}
export interface QuoteDraft {
  name: string;
  service: string;
  date: string;
  dateUnknown: boolean;
  location: string;
  locationUnknown: boolean;
  idea: string;
  packageId?: string;
  projectId?: string;
  customPackage?: CustomPackage;
}

export interface CustomPackage {
  stages: string[];
  hoursUnknown: boolean;
  hours: number | null;
  items: Record<string, { enabled: boolean; quantity: number | null }>;
  videoMinutes: number | null;
  reelsSeconds: number | null;
  videoFormat: 'a-definir' | 'vertical' | 'horizontal' | 'ambos';
  reelsFormat: 'a-definir' | 'vertical' | 'horizontal' | 'ambos';
  notes: string;
}
