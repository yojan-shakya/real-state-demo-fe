import { Funnel } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
} from "@/components"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { ListingService } from "./services/listing-service"
import { ListingCard } from "./features/listing/components/listing-card"
import PropertyDetail from "./features/listing/components/listing-detail"

const filterListingSchema = z
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

type FilterListingsType = z.infer<typeof filterListingSchema>

function App() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false)
  const [selectedListingId, setSelectedListingId] = useState<number | null>(
    null
  )

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FilterListingsType>({
    resolver: zodResolver(filterListingSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  })

  const {
    data: getListingData,
    isLoading: isListingLoading,
    isError: isListingError,
  } = useQuery({
    queryKey: ["getListing"],
    queryFn: ListingService.getListing,
  })

  const onSubmit = () => {
    console.log({ errors, values: getValues() })
  }

  const onCancel = () => {
    reset()
    setIsFilterDialogOpen(false)
  }

  const onViewDetail = (id: number) => {
    setSelectedListingId(id)
  }

  return (
    <>
      <div className="container mx-auto flex flex-col gap-4 py-10">
        <div className="flex flex-row">
          <Button
            className="ml-auto"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            Apply Filters <Funnel />
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          {getListingData?.data.map((item) => (
            <ListingCard
              landSize={30000}
              price={item.price}
              suburb={item.suburbs}
              title={item.title}
              onViewDetail={() => {
                onViewDetail(item.id)
              }}
            />
          ))}
        </div>
      </div>

      <Dialog open={isFilterDialogOpen} onOpenChange={onCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
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
                          setValueAs: (val) =>
                            val === "" ? undefined : Number(val),
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
                          setValueAs: (val) =>
                            val === "" ? undefined : Number(val),
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
                          setValueAs: (val) =>
                            val === "" ? undefined : Number(val),
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
                          setValueAs: (val) =>
                            val === "" ? undefined : Number(val),
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedListingId}
        // todoo make function for this
        onOpenChange={() => setSelectedListingId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Property Details</DialogTitle>
          </DialogHeader>
          <div className="no-scrollbar max-h-[70vh] w-full overflow-y-auto p-1">
            <PropertyDetail id={selectedListingId} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default App
