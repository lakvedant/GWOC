import ImagekitProviders from "@/components/Admin/Imagekit-Providers";

export default function Admin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <ImagekitProviders>
            <main className="container mx-auto px-4 py-8"></main>
        {children}
        </ImagekitProviders>
    </>
  );
}
