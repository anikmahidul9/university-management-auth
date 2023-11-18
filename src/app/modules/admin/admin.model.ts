import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'

export const AdminSchema = new Schema<IAdmin, AdminModel>({
  id: { type: String, required: true },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: false,
      },
    },
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  gender: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  presentAddress: { type: String, required: true },
  bloodGroup: { type: String },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academic-departments',
    required: true,
  },
  designation: { type: String, required: true },
  profileImage: { type: String },
})

// Create and export the Mongoose model for AcademicFaculty
export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema)
