export interface TokenAllocation {
  category: string;
  percentage: number;
}

export interface ReportData {
  project_name: string;
  ticker: string;
  trust_score: number;
  risk_level: string;
  executive_summary: string;
  category: string;
  tokenomics: {
    total_supply: string;
    utility: string[];
    allocations: TokenAllocation[];
  };
  team_and_backers: {
    is_doxxed: boolean;
    details: string;
  };
  security: {
    audited: boolean;
    details: string;
  };
  catalysts: string[];
  red_flags: string[];
  green_flags: string[];
}
