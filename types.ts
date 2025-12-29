
export enum Category {
  SOFTWARE = 'Software',
  PLUGINS = 'Plugins',
  SCRIPTS = 'Scripts',
  ASSETS = 'Assets',
  UTILITIES = 'Utilities'
}

export interface Version {
  name: string;
  url: string;
  desc?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
  versions: Version[];
  isFeatured?: boolean;
}

export interface AppState {
  items: ResourceItem[];
}
