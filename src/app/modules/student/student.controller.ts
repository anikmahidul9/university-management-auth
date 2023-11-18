import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { studentFilterableFields } from './student.constant'
import { IStudent } from './student.interface'
import { StudentService } from './student.service'
import { generateFacultyId } from '../users/users.utils'

const getStudents = catchAsync(async (req: Request, res: Response) => {
  // const paginationOptions = {
  //     page:Number(req.query.page),
  //     limit:Number(req.query.limit),
  //     sortBy: req.query.sortBy,
  //     sortOrder: req.query.sortOrder,
  // }
  const id = await generateFacultyId()
  console.log(id)
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])

  const result = await StudentService.getStudent(filters, paginationOptions)

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get all semester',
    meta: result.meta,
    data: result?.data,
  })
})

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.getSingleStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully Update ${id} semester`,
    data: result,
  })
})
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body

  const result = await StudentService.updateStudent(id, data)

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully Anik student`,
    data: result,
  })
})

export const StudentController = {
  getStudents,
  getSingleStudent,
  updateStudent,
}
