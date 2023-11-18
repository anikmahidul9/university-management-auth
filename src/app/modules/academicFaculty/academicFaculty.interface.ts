import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'

export type IAcademicFaculty = {
  id: string
  name: {
    firstName: string
    middleName?: string // Optional property
    lastName: string
  }
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: string
  permanentAddress: string
  presentAddress: string
  bloodGroup?: string // Optional property
  designation: string
  academicDepartment: Types.ObjectId | IAcademicDepartment
  profileImage?: string // Optional property
}

export type IAcademicFacultyFilter = {
  searchItem?: string
}

export type AcademicFacultyModel = Model<IAcademicFaculty>
