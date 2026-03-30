import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ErrorMessage,
} from "@/features/core/components"
import { propertyListFilterSchema, type PropertyListFilterType } from "./schema"
import { Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { PropertyApi } from "../../api"
import { capitalizeFirstLetter } from "@/lib"

interface PropertyListFilterProps {
  onSubmit: (_: PropertyListFilterType) => void
  onCancel: () => void
  defaultValues: PropertyListFilterType
}
export const PropertyListFilter = ({
  onSubmit,
  onCancel,
  defaultValues,
}: PropertyListFilterProps) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<PropertyListFilterType>({
    resolver: zodResolver(propertyListFilterSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues,
  })

  const { data: propertyTypesList, isLoading: isPropertyTypeLoading } =
    useQuery({
      queryKey: ["property-type"],
      queryFn: PropertyApi.getPropertyTypes,
      meta: {
        errorMessage: "Failed to load property types.",
      },
    })

  return (
    <div className="no-scrollbar max-h-[70vh] w-full overflow-y-auto p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input
                  {...register("title")}
                  aria-invalid={!!errors.title?.message}
                />
                <ErrorMessage error={errors.title?.message} />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="min-price">Min Price</FieldLabel>
                <Input
                  id="min-price"
                  type="number"
                  aria-invalid={!!errors.minPrice}
                  {...register("minPrice", {
                    setValueAs: (val) => (val === "" ? undefined : Number(val)),
                  })}
                />
                <ErrorMessage error={errors.minPrice?.message} />
              </Field>
              <Field>
                <FieldLabel htmlFor="max-price">Max Price</FieldLabel>
                <Input
                  id="max-price"
                  type="number"
                  aria-invalid={!!errors.maxPrice}
                  {...register("maxPrice", {
                    setValueAs: (val) => (val === "" ? undefined : Number(val)),
                  })}
                />
                <ErrorMessage error={errors.maxPrice?.message} />
              </Field>
            </div>
          </FieldGroup>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="min-price">Bedrooms</FieldLabel>
                <Input
                  id="min-price"
                  type="number"
                  aria-invalid={!!errors.bedRooms?.message}
                  {...register("bedRooms", {
                    setValueAs: (val) => (val === "" ? undefined : Number(val)),
                  })}
                />
                <ErrorMessage error={errors.bedRooms?.message} />
              </Field>
              <Field>
                <FieldLabel htmlFor="max-price">Bathrooms</FieldLabel>
                <Input
                  id="max-price"
                  aria-invalid={!!errors.bathRooms?.message}
                  type="number"
                  {...register("bathRooms", {
                    setValueAs: (val) => (val === "" ? undefined : Number(val)),
                  })}
                />{" "}
                <ErrorMessage error={errors.bathRooms?.message} />
              </Field>
            </div>
          </FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Property Type
                </FieldLabel>
                <Controller
                  name={"propertyType"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={isPropertyTypeLoading}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        value={field.value}
                        onCancel={() => field.onChange("")}
                      >
                        {isPropertyTypeLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Loading...</span>
                          </div>
                        ) : (
                          <>
                            <SelectValue placeholder="Select..." />
                          </>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {propertyTypesList?.data.map((item) => (
                            <SelectItem value={item} key={item}>
                              {capitalizeFirstLetter(item)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Suburb
                </FieldLabel>
                <Input
                  aria-invalid={!!errors.suburb?.message}
                  {...register("suburb")}
                />
                <ErrorMessage error={errors.suburb?.message} />
              </Field>
            </FieldGroup>
          </FieldSet>
          <div>
            <ErrorMessage error={errors.form?.message} />
            <Field orientation="horizontal" className="mt-2">
              <Button type="submit">Submit</Button>

              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
            </Field>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}
