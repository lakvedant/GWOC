import Banner from "@/components/MenuBanner";
import BakerySidebar from "@/components/MenuSidebar";

export default function Admin({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      <Banner title="Admin Dashboard" description="Manage your bakery items and orders here" />
      <BakerySidebar />
          {children}
      </>
    );
  }