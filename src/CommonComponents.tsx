import React, { ComponentProps } from "react";
import { cn } from "./lib/utils";
import { buttonVariants } from "./components/ui/button";
import Link from "next/link";
import { UrlObject } from "url";
import { Spinner } from "./components/ui/Spinner";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-xl flex flex-col gap-4 py-16 flex-grow">
      {children}
    </main>
  );
}

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="space-y-2 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle !== undefined && <p className="text-gray-500">{subtitle}</p>}
    </header>
  );
}

export function MyLink<RouteInferType>({
  children,
  href,
}: {
  children: React.ReactNode;
  href: __next_route_internal_types__.RouteImpl<RouteInferType> | UrlObject;
}) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants(), "w-full mx-auto font-bold capitalize")}
    >
      {children}
    </Link>
  );
}

export function FormSubmit({
  className,
  isLoading,
  children,
  ...restProps
}: ComponentProps<"button"> & { isLoading?: boolean }) {
  return (
    <button
      {...restProps}
      className={cn(
        buttonVariants(),
        "w-full mx-auto font-bold capitalize",
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
