import { SortOrder } from 'mongoose'
import { IGenericResponse } from '../../interfaces/common'
import { IPaginationOptions } from '../../interfaces/pagination'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'
import { helperPagination } from '../../helpers/paginationHelper'

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'departmentFaculty',
  )
  return result
}

const getDepartment = async (
  filters: IAcademicDepartmentFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
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
  const result = await AcademicDepartment.find(whereConditions)
    .populate('departmentFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
export const AcademicDepartmentService = {
  createDepartment,
  getDepartment,
}
