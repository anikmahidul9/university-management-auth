import { Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IAdmin = {
  id: string
  name: UserName
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: string
  permanentAddress: string
  presentAddress: string
  bloodGroup?: string
  academicDepartment: Types.ObjectId | IAcademicDepartment
  designation: string
  profileImage?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
