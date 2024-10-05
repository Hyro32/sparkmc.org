export interface User {
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

export interface Resource {
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

export enum ResourceTypes {
  Mods = 'mods',
  Plugins = 'plugins',
  Shaders = 'shaders',
  ResourcePacks = 'resource-packs',
  DataPacks = 'data-packs',
  ModPacks = 'mod-packs',
}
