"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Actions } from "./actions";
import { IPhotoCarouselSchema } from "@/models/PhotoCarousel";
import { IKImage } from "imagekitio-next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<IPhotoCarouselSchema>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-16 h-16 flex justify-center items-center">
        <Link href={process.env.NEXT_PUBLIC_URL_ENDPOINT + row.original.image} target="_blank" rel="noopener noreferrer">
        <IKImage
          path={row.original.image}
          // transformation={[{ width: '64', height: '64' }]}
          width={400}
          height={400}
          alt={row.original.title || "Photo Image"}
          className="rounded object-cover w-full h-full"
        />
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="line-clamp-2 text-gray-600">{row.original.description}</p>
    ),
  },
  {
    accessorKey: "Date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc" ? false : true)}
      >
        Date
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <span className="capitalize">{new Date(row.original.createdAt).toLocaleDateString()}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Actions id={row.original._id?.toString() || ""} onEdit={(id) => console.log("Edit photo:", id)} />
    ),
  },
];