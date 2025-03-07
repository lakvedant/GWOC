"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImagekitProviders from "@/components/Admin/Imagekit-Providers";
import {
  Camera,
  Home,
  Package,
  PanelLeft,
  ShoppingCart,
  Star,
  Users2,
  LogOut
} from 'lucide-react';

import Link from 'next/link';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <ImagekitProviders>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav handleLogout={handleLogout} />
        <div className="flex flex-col gap-2 sm:gap-4 sm:py-4 sm:pl-64">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav handleLogout={handleLogout} />
          </header>
          <main>
            {children}
          </main>
        </div>
      </main>
    </ImagekitProviders>
  );
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users2 },
  { href: "/admin/banner", label: "Banners", icon: Camera },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
];

function DesktopNav({ handleLogout }: { handleLogout: () => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex items-center justify-center py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" width={500} height={500} alt="logo" className="rounded-full" />
        </Link>
      </div>
      <nav className="flex flex-col gap-4 px-6 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground mt-auto"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
}

function MobileNav({ handleLogout }: { handleLogout: () => void }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 sm:max-w-xs">
        <nav className="flex min-h-screen flex-col gap-6 p-6">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Image src="/cupcake.png" width={40} height={40} alt="logo" className="rounded-full" />
            </div>
            <span className="text-lg font-semibold">Dashboard</span>
          </Link>

          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground mt-4"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

interface LoginFormProps {
  setIsAuthenticated: (value: boolean) => void;
}

function LoginForm({ setIsAuthenticated }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      // For production, replace with your actual authentication API endpoint
      // This is a simplified example - in a real app, you would call your backend API
      if (email === "admin@example.com" && password === "admin123") {
        // Store authentication token
        localStorage.setItem("adminToken", "sample-token-value");
        setIsAuthenticated(true);
        router.push("/admin");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Image src="/logo.png" width={100} height={100} alt="logo" className="rounded-full" />
          </div>
          <h2 className="mt-6 text-3xl font-bold">Admin Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}