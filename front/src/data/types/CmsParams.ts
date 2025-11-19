export type CmsResponse = {
  success: boolean;
  message: string;
  data: CmsData;
};

export type CmsNavigation = {
  type: string;
};

export type CmsData = {
  title?: string;
  description: string;
};
