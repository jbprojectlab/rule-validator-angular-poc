export interface Plan {
  submissionGroup?: string;
  planName?: string;
  paidThroughPeriod?: number;
  submissionControl?: number;
  submissionReceivedDate?: string;
  category?: string;
  mode?: string;
  status?: string;
  submissionCurrentState?: string;
  lastUpdated?: string;
  planValidationDue?: string;
  reportScoreL2?: number;
}
