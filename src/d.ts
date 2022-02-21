export interface Plan {
  submissionGroup?: number;
  planName?: string;
  paidThroughPeriod?: number;
  controlNumber?: number;
  dateReceived?: number;
  category?: string;
  mode?: string;
  status?: string;
  currentState?: string;
  lastUpdated?: number;
  dueDate?: number;
  reportScore?: number;
}
