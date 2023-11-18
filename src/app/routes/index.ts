import express from 'express'
import { UserRoute } from '../modules/users/users.routes'
import { SemesterRoute } from '../modules/academicSemester/academicSemester.routes'
import { FacultyRoute } from '../modules/academicFaculty/academicFaculty.routes'
import { DepartmentRoute } from '../modules/academicDepartment/academicDepartment.routes'
import { StudentRoute } from '../modules/student/student.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/student',
    route: StudentRoute,
  },
  {
    path: '/semesters',
    route: SemesterRoute,
  },
  {
    path: '/faculty',
    route: FacultyRoute,
  },
  {
    path: '/department',
    route: DepartmentRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
