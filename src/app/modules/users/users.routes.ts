import express from 'express'
import { UserController } from './users.controller'
import { UserValidation } from './users.validation'
import validRequest from '../../middleware/validRequest'
const router = express.Router()

router.post(
  '/create-student',
  validRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent,
)
router.post(
  '/create-faculty',
  validRequest(UserValidation.createFacultySchema),
  UserController.createFaculty,
)
router.post(
  '/create-admin',
  validRequest(UserValidation.createAdminSchema),
  UserController.createAdmin,
)

export const UserRoute = router
