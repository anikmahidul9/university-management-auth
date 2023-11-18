import { SortOrder } from 'mongoose'
import { helperPagination } from '../../helpers/paginationHelper'
import { IPaginationOptions } from '../../interfaces/pagination'
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import { IGenericResponse } from '../../interfaces/common'

// const createFaculty = async (
//     payload: IAcademicFaculty,
//   ): Promise<IAcademicFaculty> => {
//     const result = await AcademicFaculty.create(payload)
//     return result
//   }

const getFaculty = async (
  filters: IAcademicFacultyFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchItem, ...filterData } = filters
  const andConditions = []
  // Search needs $or for searching in specified fields
  if (searchItem) {
    andConditions.push({
      $or: [
        {
          title: {
            $regex: searchItem,
            $options: 'i',
          },
        },
      ],
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
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicFacultyService = {
  getFaculty,
}
