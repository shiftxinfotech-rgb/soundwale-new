export type CompanyPdfResponse = {
  status?: boolean;
  data?: CompanyPdfData[];
};

export type CompanyPdfData = {
  company_names_pdf: string;
  company_names: string;
  file_name: string;
};
