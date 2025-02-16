"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/Admin/data-table";
import { PageWrapper } from "@/components/Admin/page-wrapper";
import { columns } from "./columns";
import { IPhotoCarouselSchema } from "@/models/PhotoCarousel";
import { Row } from "@tanstack/react-table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import AddNewPhotoCarousel from "@/components/Admin/AddNewPhotoCarousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

// interface AddNewPhotoCarouselProps {
//   onSave: (data: IPhotoCarouselSchema) => void;
//   onClose: () => void;
// }

const PhotoCarouselPage = () => {
  const [photos, setPhotos] = useState<IPhotoCarouselSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await fetch("/api/photo-carousel", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleDelete = async (rows: Row<IPhotoCarouselSchema>[]) => {
    const photoIds = rows.map((row) => row.original._id);

    if (!confirm(`Are you sure you want to delete ${photoIds.length} photo(s)?`)) return;

    try {
      await Promise.all(
        photoIds.map(async (id) => {
          const response = await fetch(`/api/photo-carousel/${id}`, { method: "DELETE" });
          if (!response.ok) {
            throw new Error(`Failed to delete photo with ID: ${id}`);
          }
        })
      );
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => !photoIds.includes(photo._id)));
    } catch (error) {
      console.error("Error deleting photos:", error);
    }
  };

  const handleAddNew = () => {
    setIsAddNewOpen(true);
  };

  const handleAddNewClose = () => {
    setIsAddNewOpen(false);
  };

  const handleAddNewSave = async (newPhoto: IPhotoCarouselSchema) => {
    try {
      const response = await fetch("/api/photo-carousel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPhoto),
      });
      const addedPhoto = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, addedPhoto]);
      handleAddNewClose();
    } catch (error) {
      console.error("Error adding new photo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-2 py-4 md:p-6">
        <DashboardBreadcrumb />

        <div className="w-full max-w-full md:max-w-7xl mx-auto mt-4">
          <Card className="border-none shadow-md">
            <PageWrapper>
              <CardHeader className="space-y-4 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-xl line-clamp-1">Photo Carousel</CardTitle>
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition w-full md:w-auto"
                    onClick={handleAddNew}
                  >
                    <Plus className="size-5 mr-2" />
                    Add New
                  </button>
                </div>
              </CardHeader>

              <CardContent className="p-2 md:p-6">
                {loading ? (
                  <p className="text-center text-gray-500">Loading photos...</p>
                ) : photos.length === 0 ? (
                  <p className="text-center text-gray-500">No photos found.</p>
                ) : (
                  <DataTable
                    columns={columns}
                    data={photos}
                    filterKey="description"
                    onDelete={handleDelete}
                  />
                )}
              </CardContent>
            </PageWrapper>
          </Card>
        </div>
      </div>

      <Sheet open={isAddNewOpen} onOpenChange={setIsAddNewOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto" side="right">
          <SheetHeader>
            <SheetTitle>Add New Photo</SheetTitle>
          </SheetHeader>
          <AddNewPhotoCarousel onSave={handleAddNewSave} onClose={handleAddNewClose} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Photo Carousel</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Photos</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default PhotoCarouselPage;