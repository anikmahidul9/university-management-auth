import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './users.model'

export const findStudentId = async () => {
  const lastUserId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUserId?.id ? lastUserId.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const currentUserId =
    (await findStudentId()) || (0).toString().padStart(5, '0')

  let incrementedUserId = (parseInt(currentUserId) + 1)
    .toString()
    .padStart(5, '0')
  incrementedUserId = `${academicSemester.year.substring(2, 4)}${
    academicSemester.code
  }${incrementedUserId}`
  return incrementedUserId
  // lastUserId++;
  // return String(lastUserId).padStart(5,'0')
}

export const findFacultyId = async () => {
  const lastFacultyId = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastFacultyId?.id ? lastFacultyId.id.substring(2) : undefined
}

export const generateFacultyId = async (): Promise<string> => {
  const currentUserId =
    (await findFacultyId()) || (0).toString().padStart(5, '0')

  let incrementedFacultyId = (parseInt(currentUserId) + 1)
    .toString()
    .padStart(5, '0')
  incrementedFacultyId = `${'F-'}${incrementedFacultyId}`
  return incrementedFacultyId
  // lastUserId++;
  // return String(lastUserId).padStart(5,'0')
}

export const findAdminId = async () => {
  const lastAdminId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastAdminId?.id ? lastAdminId.id.substring(2) : undefined
}
export const generateAdminId = async (): Promise<string> => {
  const currentUserId = (await findAdminId()) || (0).toString().padStart(5, '0')

  let incrementedAdminId = (parseInt(currentUserId) + 1)
    .toString()
    .padStart(5, '0')
  incrementedAdminId = `${'A-'}${incrementedAdminId}`
  return incrementedAdminId
  // lastUserId++;
  // return String(lastUserId).padStart(5,'0')
}
