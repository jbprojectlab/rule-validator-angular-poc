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
    l1Reports: L1Reports[];
    fieldDistribution: FieldDistribution[];
}

export interface L2Report {
    fileName: string;
    fileOrderNumber: number;
    metricTable?: MetricTableData[];
    financialSummary?: FinancialSummary[];
    frxTable?: RxTable[];
    frequencyCountTable?: FrequencyCountTable[];
}

export interface MetricTableData {
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
    computedValueExpanded: boolean;
    valueHistory: ValueHistory[];   
    historyPeriod?: string;
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


//L1 report 
export interface L1Reports{
    fileName:string;
    fileOrderNumber:string;
    fields?: FiledData[];

}

export interface FiledData {
    fieldName: string;
    fieldOrderNumber: number;
    dataTable?: DataTable[];
    filterDataTable?:DataTable[];
    showMore: any;
}

export interface DataTable {
    columnValue:string;
    frequencyCount:number;
    perTotFrequency:number;
    historicalBaseline: string;
    varianceHistoricalBaseline: number;
    commentText: string;
    updateUser: string;
    updateTimeStamp: string;
    flag: number,
    errorMessage: string
}
export interface ValueHistory {
    cycleId: string,
    computedValue: string
}

export interface FieldDistribution {
    fileName:string;
    fields: DistributionFieldData[]
}
export interface DistributionFieldData {
    fieldName: string,
    dataTable?: Distribution_DataTable[]
}

export interface Distribution_DataTable {
    columnValue: string,
    count: number,
    perTotal: number,
    cumulativeCount:number,
    cumulativePerTotal: number
}