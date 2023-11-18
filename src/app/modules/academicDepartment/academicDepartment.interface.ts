import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  departmentFaculty: Types.ObjectId | IAcademicFaculty
}

export type IAcademicDepartmentFilter = {
  searchItem?: string
}
export type IAcademicDepartmentModel = Model<IAcademicDepartment>
