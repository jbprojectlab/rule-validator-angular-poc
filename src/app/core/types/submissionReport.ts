export interface SubmissionReport {
    submissionId: 1;
	submissionType: string;
	totalScore: 0;
    totalPassFail: string;
    totalFlag: number;
    l2Reports: L2Report[];
}

export interface L2Report {
    fileName: string;
    fileOrderNumber: number;
    metricTable?: MatricTableData[];
    financialSummary?: FinancialSummary[];
    rxTable?: RxTable[];
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
    validRecords: number;
    voidedRecords: number;
    rejectedRecords: number;
    totalRecords: number; 
}

export interface FrequencyCountTable {
    fieldValue: string;
    frequencyCount: number;
}