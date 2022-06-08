import { PlanFilterPipe } from './plan-filter.pipe';

describe('PlanFilterPipe', () => {
  const pipe = new PlanFilterPipe;
  const plans = [
    {
      "submissionGroup": 889,
      "submissionControl": 6231,
      "planName": "GENROCKET_2",
      "paidThroughPeriod": "202110",
      "submissionCurrentState": "Submission Received",
      "mode": "Production",
      "status": "Active",
      "category": "Combined",
      "submissionReceivedDate": "2022-03-02",
      "lastUpdated": 1646253977506,
      "planValidationDueDate": "2022-03-08",
      "score": 0.0
    },
    {
      "submissionGroup": 888,
      "submissionControl": 6231,
      "planName": "GENROCKET_2",
      "paidThroughPeriod": "202110",
      "submissionCurrentState": "Level 1 - Failed",
      "mode": "Production",
      "status": "Active",
      "category": "Medical",
      "submissionReceivedDate": "2022-03-02",
      "lastUpdated": 1646253977506,
      "planValidationDueDate": "2022-03-08",
      "score": 0.0
    },
    {
      "submissionGroup": 887,
      "submissionControl": 6231,
      "planName": "GENROCKET_2",
      "paidThroughPeriod": "202205",
      "submissionCurrentState": "Submission Received",
      "mode": "Production",
      "status": "Active",
      "category": "Non-Claims",
      "submissionReceivedDate": "2022-03-02",
      "lastUpdated": 1646253977506,
      "planValidationDueDate": "2022-03-08",
      "score": 0.0
    },
    {
      "submissionGroup": 886,
      "submissionControl": 6231,
      "planName": "GENROCKET_2",
      "paidThroughPeriod": "202111",
      "submissionCurrentState": "Submission Received",
      "mode": "Production",
      "status": "Completed",
      "category": "Combined",
      "submissionReceivedDate": "2022-03-02",
      "lastUpdated": 1646253977506,
      "planValidationDueDate": "2022-03-08",
      "score": 0.0
    },
    {
      "submissionGroup": 885,
      "submissionControl": 6231,
      "planName": "GENROCKET_2",
      "paidThroughPeriod": "202112",
      "submissionCurrentState": "Submission Under Review",
      "mode": "Production",
      "status": "Terminated",
      "category": "Combined",
      "submissionReceivedDate": "2022-03-02",
      "lastUpdated": 1646253977506,
      "planValidationDueDate": "2022-03-08",
      "score": 0.0
    }
  ];

  // Pipe instance creating
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  /* Test cases statrs from here  */

  // Filter params are null string

  it('should return all the plan details if filter prams are empty string', () => {
    expect(pipe.transform(plans, '', '', '')).toEqual(plans)
  });

   // Filter params are null string

   it('should return all the plan details if nothing is selected', () => {
    expect(pipe.transform(plans)).toEqual(plans)
  });

  // Filter with current submission state

  it('Should return plan details with respect to selected submission state', () => {
    expect(pipe.transform(plans, 'Level 1 - Failed', '', '').length).toEqual(1)
  });

  // Filter with category

  it('Should return plan deatils with selected category', () => {
    expect(pipe.transform(plans, '', 'Non-Claims', '').length).toEqual(1)
  });

  //  Filter with status

  it('Should return plan details with selected status', () => {
    expect(pipe.transform(plans, '', '', 'Completed').length).toEqual(1)
  });

  // Filter with current submission state & status 

  it('Should return plan details with selected submission state & status', () => {
    expect(pipe.transform(plans, 'Submission Received', '', 'Active').length).toEqual(2)
  });

  // Filter with current submission state & category 

  it('Should return plan details with selected submission state & category', () => {
    expect(pipe.transform(plans, 'Level 1 - Failed', 'Medical', '').length).toEqual(1)
  });

  // Filter with current category & status

  it('Should return plan details with selected category & status', () => {
    expect(pipe.transform(plans, '', 'Non-Claims', 'Active').length).toEqual(1)
  });

  // All filter params are selected 

  it('Should return plan details which satifies all the selected params', () => {
    expect(pipe.transform(plans, 'Submission Under Review', 'Combined', 'Terminated').length).toEqual(1)
  });
});
