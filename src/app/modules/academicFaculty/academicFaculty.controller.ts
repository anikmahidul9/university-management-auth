import { Request, Response } from 'express'
import { AcademicFacultyService } from './academicFaculty.service'
import pick from '../../../shared/pick'
import catchAsync from '../../../shared/catchAsync'
import { IAcademicFaculty } from './academicFaculty.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const getFaculty = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //     page:Number(req.query.page),
  //     limit:Number(req.query.limit),
  //     sortBy: req.query.sortBy,
  //     sortOrder: req.query.sortOrder,
  // }

  const filters = pick(req.query, ['searchItem', 'title'])
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])

  const result = await AcademicFacultyService.getFaculty(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get all Faculty',
    meta: result.meta,
    data: result?.data,
  })
})

export const AcademicFacultyController = {
  getFaculty,
}
