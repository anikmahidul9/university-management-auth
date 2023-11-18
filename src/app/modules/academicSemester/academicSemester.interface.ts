import { Model } from 'mongoose'
export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemester = {
  title: 'Summer' | 'Fall' | 'Spring'
  year: string
  code: '01' | '02' | '03'
  startMonth: Month
  endMonth: Month
}

export type IAcademicSemesterFilters = {
  searchItem?: string
}
export type AcademicSemesterModel = Model<IAcademicSemester>
