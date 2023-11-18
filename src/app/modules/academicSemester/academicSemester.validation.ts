import { z } from 'zod'
import { academicSemesterMonths } from './academicSemester.constants'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Summer', 'Fall', 'Spring'], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
})

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum(['Summer', 'Fall', 'Spring'], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum(['01', '02', '03'], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code or none',
    },
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
