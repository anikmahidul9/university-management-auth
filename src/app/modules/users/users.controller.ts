import { RequestHandler } from 'express'
import { UserService } from './users.service'

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)
    res.status(200).json({
      success: true,
      message: 'User successfully created',
      data: result,
    })
  } catch (exportError) {
    next(exportError)
  }
}

const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { faculty, ...userData } = req.body
    const result = await UserService.createFaculty(faculty, userData)
    res.status(200).json({
      success: true,
      message: 'User successfully created',
      data: result,
    })
  } catch (exportError) {
    next(exportError)
  }
}

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { admin, ...userData } = req.body
    const result = await UserService.createFaculty(admin, userData)
    res.status(200).json({
      success: true,
      message: 'User successfully created',
      data: result,
    })
  } catch (exportError) {
    next(exportError)
  }
}

export const UserController = {
  createFaculty,
  createStudent,
  createAdmin,
}
