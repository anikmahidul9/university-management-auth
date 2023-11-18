import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.get('/', AcademicFacultyController.getFaculty)

export const FacultyRoute = router
