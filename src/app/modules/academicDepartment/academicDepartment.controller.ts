import { Request, RequestHandler, Response } from 'express'
import { AcademicDepartmentService } from './academicDepartment.service'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const createDepartmentController: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicDepartmentData } = req.body
    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentData,
    )
    res.status(200).json({
      success: true,
      message: 'Department successfully created',
      data: result,
    })
  } catch (exportError) {
    next(exportError)
  }
}

const getDepartment = catchAsync(async (req: Request, res: Response) => {
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

  const result = await AcademicDepartmentService.getDepartment(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get all Faculty',
    meta: result.meta,
    data: result?.data,
  })
})

export const AcademicDepartmentController = {
  createDepartmentController,
  getDepartment,
}
