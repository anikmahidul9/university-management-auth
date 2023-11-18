import { Month } from './academicSemester.interface'

export const academicSemesterMonths: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Summer: '01',
  Fall: '02',
  Spring: '03',
}
