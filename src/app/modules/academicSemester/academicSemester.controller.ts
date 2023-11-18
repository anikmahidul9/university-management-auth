import { Request, RequestHandler, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'

const createSemesterController: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result =
      await AcademicSemesterService.createSemester(academicSemesterData)
    res.status(200).json({
      success: true,
      message: 'Semester successfully created',
      data: result,
    })
  } catch (exportError) {
    next(exportError)
  }
}

const getSemester = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //     page:Number(req.query.page),
  //     limit:Number(req.query.limit),
  //     sortBy: req.query.sortBy,
  //     sortOrder: req.query.sortOrder,
  // }

  const filters = pick(req.query, ['searchItem', 'title', 'code'])
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])

  const result = await AcademicSemesterService.getSemester(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get all semester',
    meta: result.meta,
    data: result?.data,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.getSingleSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully Update ${id} semester`,
    data: result,
  })
})
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body
  console.log(data)

  const result = await AcademicSemesterService.updateSemester(id, data)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully Update ${data} semester`,
    data: result,
  })
})

const deleteSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSingleSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully Delete ${id} semester`,
    data: result,
  })
})

export const SemesterController = {
  createSemesterController,
  getSemester,
  getSingleSemester,
  updateSemester,
  deleteSingleSemester,
}
