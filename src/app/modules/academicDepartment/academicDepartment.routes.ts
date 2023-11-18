import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-department',
  AcademicDepartmentController.createDepartmentController,
)
router.get('/', AcademicDepartmentController.getDepartment)

export const DepartmentRoute = router
