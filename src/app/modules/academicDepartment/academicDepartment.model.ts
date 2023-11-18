import { Schema, model } from 'mongoose'
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './academicDepartment.interface'

export const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
    },
    departmentFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academic-faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const AcademicDepartment = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>('academic-departments', academicDepartmentSchema)
