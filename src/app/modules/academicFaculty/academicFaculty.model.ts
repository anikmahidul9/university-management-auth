import { Schema, model } from 'mongoose'
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface'

export const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    id: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    gender: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    bloodGroup: { type: String },
    designation: { type: String, required: true },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academic-departments',
      required: true,
    },
    profileImage: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'academic-faculty',
  academicFacultySchema,
)
