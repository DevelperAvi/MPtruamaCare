export interface SitemapResponse {
  result: {
    status: boolean;
    msg: string;
    response: {
      sitemap: MenuItem[];
      metadata: Record<string, unknown>;
    };
  };
  id: number;
  status: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: number;
  isFaulted: boolean;
}

export interface MenuItem {
  label: string;
  icon: string;
  link: string;
  parentId : string;
  children: MenuItem[];
}
