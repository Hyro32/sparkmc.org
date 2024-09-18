interface Resource {
  id: number;
  authorId: number;
  type: string;
  name: string;
  icon: string;
  description: string;
  downloads: number;
  categories: string[];
  files: string[];
  versions: string[];
  created_at: Date;
}
