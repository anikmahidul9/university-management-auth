import httpStatus from 'http-status'
import ApiError from '../../errors/apiErrors'
import { academicSemesterTitleCodeMapper } from './academicSemester.constants'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPaginationOptions } from '../../interfaces/pagination'
import { IGenericResponse } from '../../interfaces/common'
import { helperPagination } from '../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getSemester = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchItem, ...filterData } = filters
  const andConditions = []
  // Search needs $or for searching in specified fields
  if (searchItem) {
    andConditions.push({
      $or: ['title', 'code'].map(field => ({
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
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  console.log(payload)
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}
export const AcademicSemesterService = {
  createSemester,
  getSemester,
  getSingleSemester,
  updateSemester,
  deleteSingleSemester,
}
