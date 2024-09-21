interface Resource {
  url: string;
  author: string;
  type: string;
  title: string;
  description: string;
  likes?: User[];
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

interface User {
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  likes?: Resource[];
  githubId?: string;
  discordId?: string;
  isGithubAccount?: boolean;
  isDiscordAccount?: boolean;
  resources?: Resource[];
}

interface IResponse {
  data: any;
  status: number;
}
