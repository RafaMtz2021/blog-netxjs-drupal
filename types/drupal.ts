export interface DrupalNode {
  id: string;
  type: string;
  title: string;
  body?: {
    value: string;
    processed: string;
  };
  created: string;
  path?: {
    alias: string;
  };
}

export interface DrupalArticle extends DrupalNode {
  type: 'node--article';
}