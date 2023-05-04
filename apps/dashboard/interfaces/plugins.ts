export interface PluginIpfs {
  contract_schema: Record<string, any>;
  name: string;
  images: string[];
  logo: string;
  description: string;
  links: {
    twitter?: string;
    website?: string;
    github?: string;
    discord?: string;
  };
  version: number;
}
