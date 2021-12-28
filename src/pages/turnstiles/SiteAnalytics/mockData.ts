// @ts-ignore

const perDay = {
  total: 120,
  perDay: 80,
  now: 60,
  notInstructed: 1,
  withHighTemperature: 1,
  byDepartment: {
    'Department 1': 22,
    'Department 2': 4,
    'Department 3': 10,
  },
  byPosition: {
    'Position 1': 40,
    'Position 2': 2,
    'Position 3': 15,
  },
  entries: [
    ...new Array(3).fill({
      fullname: 'Ivanov Ivan Ivanovich',
      position: 'peon',
      department: 'Red',
      temperature: {
        value: 36.6,
        elevated: false,
      },
      instructed: true,
      entered: '2021-05-26T09:28:55',
      exited: '2021-05-26T12:56:12',
    }),
    {
      fullname: 'Ivanov Ivan Ivanovich',
      position: 'peon',
      department: null,
      temperature: {
        value: 37.0,
        elevated: true,
      },
      instructed: true,
      entered: '2021-05-26T09:28:55',
      exited: null,
    },
    {
      fullname: 'Ivanov Ivan Ivanovich',
      position: 'peon',
      department: 'Red',
      temperature: {
        value: 36.6,
        elevated: false,
      },
      instructed: false,
      entered: null,
      exited: null,
    },
  ],
} as SiteAnalyticsDataPerDay;

const forPeriod = {
  total: 120,
  avrForPeriod: 105,
  notInstructed: 20,
  withHighTemperature: 15,
  byDateTime: [
    {
      dateTime: '13:05',
      attended: 50,
      notInstructed: 2,
      withHighTemperature: 0,
    },
    {
      dateTime: '14:05',
      attended: 60,
      notInstructed: 4,
      withHighTemperature: 0,
    },
    {
      dateTime: '15:05',
      attended: 55,
      notInstructed: 5,
      withHighTemperature: 2,
    },
    {
      dateTime: '16:05',
      attended: 70,
      notInstructed: 3,
      withHighTemperature: 4,
    },
    {
      dateTime: '17:05',
      attended: 60,
      notInstructed: 0,
      withHighTemperature: 0,
    },
    {
      dateTime: '18:05',
      attended: 30,
      notInstructed: 1,
      withHighTemperature: 1,
    },
    {
      dateTime: '19:05',
      attended: 10,
      notInstructed: 0,
      withHighTemperature: 0,
    },
  ],
  entries: [
    ...new Array(3).fill({
      fullname: 'Ivanov Ivan Ivanovich',
      position: 'peon',
      department: 'Red',
      temperature: {
        value: 36.6,
        elevated: false,
      },
      instructed: true,
      entered: '2021-05-26T09:28:55',
      exited: '2021-05-26T12:56:12',
    }),
    {
      fullname: 'Ivanov Ivan Ivanovich',
      position: 'peon',
      department: null,
      temperature: {
        value: 37.0,
        elevated: true,
      },
      instructed: true,
      entered: '2021-05-26T09:28:55',
      exited: null,
    },
    {
      fullname: 'Ivanov Ivan Ivanovich',
      position: 'peon',
      department: 'Red',
      temperature: {
        value: 36.6,
        elevated: false,
      },
      instructed: false,
      entered: null,
      exited: null,
    },
  ],
} as SiteAnalyticsDataForPeriod;

export default {
  perDay,
  forPeriod,
};
