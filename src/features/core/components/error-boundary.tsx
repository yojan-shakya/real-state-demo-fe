import React, { type ReactNode } from "react"
import {
  Button,
  EmptyPage,
  EmptyPageDescription,
  EmptyPageImage,
  EmptyPageTitle,
} from "./ui"
import somethingWentWrongSvg from "@/assets/something-went-wrong.svg"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorPage />
    }
    return this.props.children
  }
}

const ErrorPage = () => {
  const onReload = () => {
    window.location.reload()
  }
  return (
    <EmptyPage className="mt-10">
      <EmptyPageImage className="w-40 md:w-60" src={somethingWentWrongSvg} />
      <EmptyPageTitle>Something went wrong!</EmptyPageTitle>
      <EmptyPageDescription className="flex flex-col gap-2">
        Please reload the page and if the error persists, contact administrator
        <Button className="self-center" onClick={onReload}>
          Reload the page
        </Button>
      </EmptyPageDescription>
    </EmptyPage>
  )
}
