import { Funnel } from "lucide-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import emptyPageImageSrc from "@/assets/empty-page-image.svg"
import { ListingService } from "@/services"
import type { FilterListingsType } from "./components/filter/schema"
import { ListingCard, ListingCardSkeleton, PropertyDetail } from "./components"
import { getPagination } from "@/lib"
import { ListingFilter } from "./components/filter/filter"
import {
  Button,
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

function PropertyList() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false)
  const [selectedListingId, setSelectedListingId] = useState<number | null>(
    null
  )

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

  const { data: getListingData, isLoading: isListingLoading } = useQuery({
    queryKey: ["get-listing", searchParams],
    queryFn: () =>
      ListingService.getListing({
        baths: searchParams.baths || undefined,
        beds: searchParams.beds || undefined,
        priceMax: searchParams.priceMax || undefined,
        priceMin: searchParams.priceMin || undefined,
        propertyType: searchParams.propertyType || undefined,
        search: searchParams.title || undefined,
        page: searchParams.page || undefined,
      }),
  })

  const onSubmit = (values: FilterListingsType) => {
    setSearchParams({
      baths: values.bathRooms || null,
      beds: values.bedRooms || null,
      priceMax: values.maxPrice || null,
      priceMin: values.minPrice || null,
      suburb: values.suburb || null,
      title: values.title || null,
      page: 1,
    })
    setIsFilterDialogOpen(false)
  }

  const onFilterClose = () => {
    setIsFilterDialogOpen(false)
  }

  const onViewDetail = (id: number) => {
    setSelectedListingId(id)
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
        <div className="flex flex-row justify-end gap-4">
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
        </div>

        {isListingLoading ? (
          <div className="grid grid-cols-4 gap-x-4 gap-y-6">
            {Array.from({ length: 6 }).map(() => (
              <ListingCardSkeleton />
            ))}
          </div>
        ) : null}
        {!isListingLoading &&
        getListingData &&
        getListingData?.data.length > 0 ? (
          <div>
            <div className="grid grid-cols-4 gap-x-4 gap-y-6">
              {getListingData?.data.map((item) => (
                <ListingCard
                  // todo
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
            <Pagination className="mt-6 w-full">
              <PaginationContent>
                <PaginationPrevious
                  aria-disabled={!getListingData.paginationMeta.hasPrev}
                  onClick={() => {
                    onPaginate(getListingData.paginationMeta.page - 1)
                  }}
                />
                {getPagination(
                  getListingData.paginationMeta.page,
                  getListingData.paginationMeta.totalPages
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
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationNext
                  aria-disabled={!getListingData.paginationMeta.hasNext}
                  onClick={() => {
                    onPaginate(getListingData.paginationMeta.page + 1)
                  }}
                />
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
        {!isListingLoading && getListingData?.data.length === 0 ? (
          <EmptyPage className="mt-10">
            <EmptyPageImage className="w-40 md:w-60" src={emptyPageImageSrc} />
            <EmptyPageTitle>{"No data found"}</EmptyPageTitle>
            <EmptyPageDescription>Try a different filter</EmptyPageDescription>
          </EmptyPage>
        ) : null}
      </div>

      <Dialog open={isFilterDialogOpen} onOpenChange={onFilterClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
          <ListingFilter
            onCancel={onFilterClose}
            onSubmit={onSubmit}
            defaultValues={{
              bathRooms: searchParams.baths || undefined,
              bedRooms: searchParams.beds || undefined,
              maxPrice: searchParams.priceMax || undefined,
              minPrice: searchParams.priceMin || undefined,
              suburb: searchParams.suburb || undefined,
              title: searchParams.title || undefined,
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedListingId}
        onOpenChange={() => setSelectedListingId(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <PropertyDetail id={selectedListingId} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PropertyList
