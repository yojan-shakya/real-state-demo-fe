import { Funnel } from "lucide-react"
import { useContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import emptyPageImage from "@/assets/empty-page-image.svg"
import type { PropertyListFilterType } from "./components/property-list-filter/schema"
import { PropertyListFilter } from "./components/property-list-filter/property-list-filter"
import {
  Button,
  ButtonSkeleton,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  EmptyPage,
  EmptyPageDescription,
  EmptyPageImage,
  EmptyPageTitle,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/features/core/components"
import { AuthContext, getPageNumbers, Label, Skeleton } from "../core"
import { PropertyApi } from "./api"
import {
  PropertyDetail,
  PropertyListCard,
  PropertyListCardSkeleton,
} from "./components"
import { capitalizeFirstLetter } from "@/lib"
import { Switch } from "../core/components/ui/switch"

function PropertyList() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  )

  const { toggleRole, role } = useContext(AuthContext)

  const [searchParams, setSearchParams] = useQueryStates({
    baths: parseAsInteger,
    beds: parseAsInteger,
    priceMin: parseAsInteger,
    priceMax: parseAsInteger,
    propertyType: parseAsString,
    title: parseAsString,
    suburb: parseAsString,
    page: parseAsInteger.withDefault(1),
  })

  const isFilterSet = Object.entries(searchParams)
    .filter(([key, _]) => key !== "page")
    .some(([_, val]) => val !== null)

  const { data: propertyListData, isLoading: isPropertyListLoading } = useQuery(
    {
      queryKey: ["get-property-list", searchParams],
      queryFn: () =>
        PropertyApi.getPropertyList({
          baths: searchParams.baths || undefined,
          beds: searchParams.beds || undefined,
          priceMax: searchParams.priceMax || undefined,
          priceMin: searchParams.priceMin || undefined,
          propertyType: searchParams.propertyType || undefined,
          search: searchParams.title || undefined,
          page: searchParams.page || undefined,
        }),
      throwOnError: true,
    }
  )

  const onSubmit = (values: PropertyListFilterType) => {
    setSearchParams({
      baths: values.bathRooms || null,
      beds: values.bedRooms || null,
      priceMax: values.maxPrice || null,
      priceMin: values.minPrice || null,
      suburb: values.suburb || null,
      title: values.title || null,
      propertyType: values.propertyType || null,
      page: 1,
    })
    setIsFilterDialogOpen(false)
  }

  const onFilterClose = () => {
    setIsFilterDialogOpen(false)
  }

  const onViewDetail = (id: number) => {
    setSelectedPropertyId(id)
  }

  const onPaginate = (page: number) => {
    setSearchParams({
      page,
    })
  }

  const onResetFilters = () => {
    setSearchParams(null)
    setIsFilterDialogOpen(false)
  }

  return (
    <>
      <div className="container mx-auto flex flex-col gap-4 py-10">
        <div className="flex flex-1 flex-row items-center justify-between gap-4">
          {isPropertyListLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <div className="flex items-center space-x-2">
              <Switch
                id="admin-mode"
                checked={role === "admin"}
                onClick={() => toggleRole()}
              />
              <Label htmlFor="admin-mode">Admin Mode</Label>
            </div>
          )}

          <div className="flex gap-2">
            {isPropertyListLoading ? (
              <>
                {isFilterSet && <ButtonSkeleton />}
                <ButtonSkeleton />
              </>
            ) : (
              <>
                {isFilterSet && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    onClick={onResetFilters}
                  >
                    Reset Filters
                  </Button>
                )}

                <Button onClick={() => setIsFilterDialogOpen(true)}>
                  Apply Filters <Funnel />
                </Button>
              </>
            )}
          </div>
        </div>

        {isPropertyListLoading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <PropertyListCardSkeleton key={idx} />
            ))}
          </div>
        ) : null}
        {!isPropertyListLoading &&
        propertyListData &&
        propertyListData?.data.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
              {propertyListData?.data.map((item) => (
                <PropertyListCard
                  key={item.id}
                  landSize={item.landSize}
                  propertyType={capitalizeFirstLetter(item.propertyType)}
                  price={item.price}
                  suburb={item.suburbs}
                  title={item.title}
                  onViewDetail={() => {
                    onViewDetail(item.id)
                  }}
                />
              ))}
            </div>
            <Pagination className="mt-6 w-full">
              <PaginationContent>
                <PaginationPrevious
                  aria-disabled={!propertyListData.paginationMeta.hasPrev}
                  onClick={() => {
                    onPaginate(propertyListData.paginationMeta.page - 1)
                  }}
                />
                {getPageNumbers(
                  propertyListData.paginationMeta.page,
                  propertyListData.paginationMeta.totalPages
                ).map((item, idx) =>
                  item === "..." ? (
                    <PaginationItem key={idx}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={idx}>
                      <PaginationLink
                        onClick={() => {
                          onPaginate(item)
                        }}
                        isActive={item === propertyListData.paginationMeta.page}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationNext
                  aria-disabled={!propertyListData.paginationMeta.hasNext}
                  onClick={() => {
                    onPaginate(propertyListData.paginationMeta.page + 1)
                  }}
                />
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
        {!isPropertyListLoading && propertyListData?.data.length === 0 ? (
          <EmptyPage className="mt-10">
            <EmptyPageImage className="w-40 md:w-60" src={emptyPageImage} />
            <EmptyPageTitle>{"No data found"}</EmptyPageTitle>
            <EmptyPageDescription className="flex flex-col gap-4">
              {isFilterSet ? (
                <>
                  <div>Try a different filter or reset filters</div>
                  <div className="flex gap-2 self-center">
                    <Button
                      variant={"secondary"}
                      type="button"
                      onClick={onResetFilters}
                    >
                      Reset Filters
                    </Button>
                    <Button onClick={() => setIsFilterDialogOpen(true)}>
                      Apply Filters <Funnel />
                    </Button>
                  </div>
                </>
              ) : (
                <div>Please contact administrator</div>
              )}
            </EmptyPageDescription>
          </EmptyPage>
        ) : null}
      </div>

      <Dialog open={isFilterDialogOpen} onOpenChange={onFilterClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
          <PropertyListFilter
            onCancel={onFilterClose}
            onSubmit={onSubmit}
            defaultValues={{
              bathRooms: searchParams.baths || undefined,
              bedRooms: searchParams.beds || undefined,
              maxPrice: searchParams.priceMax || undefined,
              minPrice: searchParams.priceMin || undefined,
              suburb: searchParams.suburb || undefined,
              title: searchParams.title || undefined,
              propertyType: searchParams.propertyType || undefined,
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedPropertyId}
        onOpenChange={() => setSelectedPropertyId(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle hidden></DialogTitle>
          <PropertyDetail id={selectedPropertyId} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PropertyList
