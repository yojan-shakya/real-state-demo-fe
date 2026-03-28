import * as z from "zod"

export const filterListingSchema = z
  .object({
    title: z.string("Title must be string").optional(),
    minPrice: z
      .number("Min Price must be number")
      .min(0, "Cannot be less than 0")
      .optional(),
    maxPrice: z
      .number("Min Price must be number")
      .min(0, "Cannot be less than 0")
      .optional(),
    bedRooms: z
      .number("Bedrooms must be number")
      .min(1, "Cannot be less than 1")
      .optional(),
    bathRooms: z
      .number("Bathrooms must be number")
      .min(1, "Cannot be less than 1")
      .optional(),
    // todo property type
    suburb: z.string().optional(),
  })
  .refine(
    (data) =>
      data.minPrice == null ||
      data.maxPrice == null ||
      data.maxPrice >= data.minPrice,
    {
      message: "Max price must be greater than or equal to min price",
      path: ["maxPrice"],
    }
  )
  .refine((data) => Object.values(data).some((v) => v !== "" && v != null), {
    message: "At least one field required",
    path: ["form"],
  })

export type FilterListingsType = z.infer<typeof filterListingSchema>
