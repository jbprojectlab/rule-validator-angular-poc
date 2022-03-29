const mockPlan: any = {
  rejects: [
    {
      description: 'Product',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Product Client Contract',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: ''
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Member',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Facility Header',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: 'Lorem ipsum dolor sit amet'
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: ''
      }
    },
    {
      description: 'Facility Details',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: ''
      }
    },
    {
      description: 'Professional and Other Services',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    }
  ],
  transformations: [
    {
      description: 'Product',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      }
    },
    {
      description: 'Product Client Contract',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Member',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Facility Header',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Facility Details',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Professional and Other Services',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    }
  ],
  analyticalWarnings: [
    {
      description: 'Product',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Product Client Contract',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Member',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Facility Header',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Facility Details',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    },
    {
      description: 'Professional and Other Services',
      recordCount: 100,
      percentageVariance: 0.5,
      ptdPeriod0: {
        rowCount: 12345456,
        rejectsCount: 12,
        rejectsPercentage: 0.25,
        comments: ''
      },
      ptdPeriod1: {
        rowCount: 12345789,
        rejectsCount: 10,
        rejectsPercentage: 0.1,
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      ptdPeriod2: {
        rowCount: 12345321,
        rejectsCount: 20,
        rejectsPercentage: 0.5,
        comments: 'Lorem ipsum dolor sit amet'
      }
    }
  ],
}

export const mockPlanDescription =   {
  group: 'GRP1234',
  planName: 'BCBSIL',
  throughPeriod: 202112,
  submissionControl: 23456,
  mode: 'Mode 1'
}

export default mockPlan
