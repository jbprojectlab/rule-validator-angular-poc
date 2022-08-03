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
	totalFlag: number;
	l2Reports: L2Report[];
	l1Reports: L1Reports[];
	fieldDistribution: FieldDistribution[];
	l2CheckList: l2CheckList;
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
	totalPassFail: string;
	totalFlag: number;
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
	fileName: string;
	fileOrderNumber: string;
	fields?: fieldData[];
}

export interface fieldData {
	fieldName: string;
	fieldOrderNumber: number;
	dataTable?: DataTable[];
	filterDataTable?: DataTable[];
	showMore: any;
	isShow: boolean;
}

export interface DataTable {
	columnValue: string;
	frequencyCount: number;
	perTotFrequency: number;
	historicalBaseline: string;
	varianceHistoricalBaseline: number;
	commentText: string;
	updateUser: string;
	updateTimeStamp: string;
	flag: number;
	errorMessage: string
}

export interface ValueHistory {
	cycleId: string,
	computedValue: string
}

export interface FieldDistribution {
	fileName: string;
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
	cumulativeCount: number,
	cumulativePerTotal: number
}

export interface l2CheckList {
	approvedDate: string;
	approvedUser: string;
	errorThresholdReportScore: number;
	records?: records[];
}

export interface records{
	recordType: string,
	dataTable: rejectRecords[]
}

export interface rejectRecords {
	cycleIdM0: string,
	cycleIdM1: string,
	cycleIdM2: string,
	sortOrder: number, 
	metricName: string,
	recordCountThreshold: string
	percentageVariance: string
	rowCountM0: number,
	rowCountM1: number,
	rowCountM2: number,
	metricCountM0: number,
	metricCountM1: number,
	metricCountM2: number,
	metricPercentageM0: number,
	metricPercentageM1: number,
	metricPercentageM2: number,
	addlPercentageM0: number,
	addlPercentageM1: number,
	addlPercentageM2: number,
	commentsM0: string,
	commentsM1: string,
	commentsM2: string,
	voidedRecords?: voidedRecords,
	totalSubmittedAmount?: totalSubmittedAmount
}

export interface voidedRecords{
	rowCountM0: number,
	rowCountM1: number,
	rowCountM2: number,
	metricCountM0: number,
	metricCountM1: number,
	metricCountM2: number,
	metricPercentageM0: number,
	metricPercentageM1: number,
	metricPercentageM2: number,
	AddlPercentageM0: number,
	AddlPercentageM1: number,
	AddlPercentageM2: number
}

export interface totalSubmittedAmount{
	rowCountM0: number,
	rowCountM1: number,
	rowCountM2: number,
	metricCountM0: number,
	metricCountM1: number,
	metricCountM2: number,
	metricPercentageM0: number,
	metricPercentageM1: number,
	metricPercentageM2: number,
	AddlPercentageM0: number,
	AddlPercentageM1: number,
	AddlPercentageM2: number
}