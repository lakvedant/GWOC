// import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = [
    {
        id: 1,
        date: "7 Feb",
        title: "Rose Day",
        description: "Start a love-filled February with the perfect gifts",
        bgColor: "from-pink-100 to-rose-200",
        image: "/api/placeholder/600/400"
    },
    {
        id: 2,
        date: "8 Feb",
        title: "Propose Day",
        description: "Express your love with our special collection",
        bgColor: "from-red-100 to-pink-200",
        image: "/api/placeholder/600/400"
    },
    {
        id: 3,
        date: "9 Feb",
        title: "Chocolate Day",
        description: "Sweeten your love with delicious treats",
        bgColor: "from-rose-100 to-red-200",
        image: "/api/placeholder/600/400"
    },
    {
        id: 4,
        date: "10 Feb",
        title: "Teddy Day",
        description: "Cuddle with love and sweetness",
        bgColor: "from-pink-100 to-red-100",
        image: "/api/placeholder/600/400"
    }
]

  return data;
}

export default async function BannerRoute() {
  noStore();
  const data = await getData();
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex gap-x-2">
          <Link href="/dashboard/banner/create">
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      alt="Product Image"
                      src={item.image}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover h-16 w-16"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banner/${item.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}