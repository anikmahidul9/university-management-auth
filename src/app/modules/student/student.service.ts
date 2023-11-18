/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPaginationOptions } from '../../interfaces/pagination'
import { IGenericResponse } from '../../interfaces/common'
import { helperPagination } from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IStudent, IStudentFilters } from './student.interface'
import { studentSearchableFields } from './student.constant'
import { Student } from './student.model'
import ApiError from '../../errors/apiErrors'
import httpStatus from 'http-status'

const getStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchItem, ...filterData } = filters
  const andConditions = []
  // Search needs $or for searching in specified fields
  if (searchItem) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchItem,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const { page, limit, skip, sortBy, sortOrder } =
    helperPagination.calculatePagination(paginationOptions)
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await Student.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
  return result
}

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  console.log(payload)
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const { name, guardian, localGuardian, ...studentData } = payload

  const updatedStudentData: Partial<IStudent> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent> // `name.fisrtName`
      ;(updatedStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent> // `guardian.fisrtguardian`
      ;(updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuradianKey = `localGuardian.${key}` as keyof Partial<IStudent> // `localGuardian.fisrtName`
      ;(updatedStudentData as any)[localGuradianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const result = await Student.findOneAndUpdate(
    { id: id },
    updatedStudentData,
    {
      new: true,
    },
  )
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
  return result
}
export const StudentService = {
  getStudent,
  getSingleStudent,
  updateStudent,
}
