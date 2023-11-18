import { Schema, model } from 'mongoose'
import httpStatus from 'http-status'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface'
import { academicSemesterMonths } from './academicSemester.constants'
import ApiError from '../../errors/apiErrors'

export const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Summer', 'Fall', 'Spring'],
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  },
)

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exist !',
    )
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'academic-semester',
  academicSemesterSchema,
)
