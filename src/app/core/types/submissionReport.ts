export interface SubmissionReport {
    planName: string,
	submissionGroupId: string,
	submissionControlNumber: string,
	paidThroughPeriod: string,
	submissionMode: string;
	submissionId: number;
	submissionType: string;
	totalScore: 0;
	totalPassFail: string;
	total_Flag: number;
	l2Reports: L2Report[];
}

export interface L2Report {
    fileName: string;
    fileOrderNumber: number;
    metricTable?: MatricTableData[];
    financialSummary?: FinancialSummary[];
    frxTable?: RxTable[];
    frequencyCountTable?: FrequencyCountTable[];
}

export interface MatricTableData {
    metricOrderNumber: string;
    metricDescription: string;
    computedValue: number;
    passIndicator: string;
    ruleWeightPercent: number;
    score: number;
    flag: number;
    fileOrderNumber: number;
    errorMessage: string;
    totalPassFail:string;
    total_Flag:number;
    expandScore: boolean;
}

export interface FinancialSummary {
    columnName: string;
    financialOrderNumber: number;
    totalValidAmount: number;
    totalRejectedAmount: number;
    totalAmount: number;
    percentRejected: number;
    totalAmountExcludingDeniedSecondary: number;
    totalAmountOutpatientFacilityOnly: number;
    estimatedAveragePerValidScript: number;
    flag: number;
    errorMessage: string;
}

export interface RxTable {
    ValidRecords: number;
    VoidedRecords: number;
    RejectedRecords: number;
    TotalRecords: number; 
}

export interface FrequencyCountTable {
    fieldValue: string;
    frequencyCount: number;
}