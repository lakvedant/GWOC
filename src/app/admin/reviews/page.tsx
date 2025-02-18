"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/Admin/data-table";
import { PageWrapper } from "@/components/Admin/page-wrapper";
import { columns } from "./columns";
import { IReview } from "@/models/Review";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from "next/link";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/admin-reviews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-2 py-4 md:p-6">
        <DashboardBreadcrumb />
        
        <div className="w-full max-w-full md:max-w-7xl mx-auto mt-4">
          <Card className="border-none shadow-md">
            <PageWrapper>
              <CardHeader className="space-y-4 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle className="text-xl line-clamp-1">Reviews</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-2 md:p-6">
                {loading ? (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="text-center p-8 text-gray-500">
                    No reviews found.
                  </div>
                ) : (
                  <DataTable 
                    columns={columns} 
                    data={reviews} 
                    filterKey="userName"
                    onDelete={() => {}}
                  />
                )}
              </CardContent>
            </PageWrapper>
          </Card>
        </div>
      </div>
    </div>
  );
};

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Reviews</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default ReviewsPage;