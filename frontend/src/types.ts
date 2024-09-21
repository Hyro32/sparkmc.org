interface Resource {
  url: string;
  author: string;
  type: string;
  title: string;
  description: string;
  likes: string[];
  downloads: number;
  about: string;
  icon?: string;
  tags: string[];
  api_version: string;
  source?: string;
  support?: string;
  updated_at: Date;
  created_at: Date;
}
