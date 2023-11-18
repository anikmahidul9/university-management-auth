import express from 'express'
import validRequest from '../../middleware/validRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { SemesterController } from './academicSemester.controller'
const router = express.Router()

router.post(
  '/create-semester',
  validRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  SemesterController.createSemesterController,
)
router.patch(
  '/get-semester/:id',
  validRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  SemesterController.updateSemester,
)
router.get('/get-semester/:id', SemesterController.getSingleSemester)
router.delete('/get-semester/:id', SemesterController.deleteSingleSemester)
router.get('/get-semester', SemesterController.getSemester)

export const SemesterRoute = router
