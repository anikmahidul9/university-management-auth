import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../errors/apiErrors'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './users.interface'
import { User } from './users.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './users.utils'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  // set role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate student id
    const id = await generateStudentId(academicSemester as IAcademicSemester)
    // set custom id into both  student & user
    user.id = id
    student.id = id

    // Create student using sesssin
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

const createFaculty = async (
  faculty: IAcademicFaculty,
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  // set role
  user.role = 'faculty'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate student id
    const id = await generateFacultyId()
    console.log(id)
    // set custom id into both  student & user
    user.id = id
    faculty.id = id

    // Create student using sesssin
    const newFaculty = await AcademicFaculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student _id (reference) into user.student
    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
      ],
    })
  }

  return newUserAllData
}

const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  // set role
  user.role = 'admin'

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // generate student id
    const id = await generateAdminId()
    // set custom id into both  student & user
    user.id = id
    admin.id = id

    // Create student using sesssin
    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // set student _id (reference) into user.student
    user.admin = newAdmin[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      // populate: [
      //   {
      //     path: 'managementDepartment',
      //   },
      // ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
