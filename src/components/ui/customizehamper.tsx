"use client"
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, X, ChevronRight, ShoppingBag, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { IKImage } from 'imagekitio-next';

// Types
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number;
  image: string;
  available: boolean;
  valueForOffer: number;
}

interface BoxType {
  id: string;
  name: string;
  maxDesserts: number;
  maxDips: number;
  basePrice: number;
  image: string;
  description: string;
}

// Constants
const BOX_TYPES: BoxType[] = [
  {
    id: 'large',
    name: 'Luxury Dessert Box',
    maxDesserts: 4,
    maxDips: 3,
    basePrice: 999,
    image: '/largehamp.png',
    description: 'Premium selection for 4-6 people with elegant packaging'
  },
  {
    id: 'small',
    name: 'Classic Dessert Box',
    maxDesserts: 2,
    maxDips: 2,
    basePrice: 599,
    image: '/images/small-box.jpg',
    description: 'Perfect treat for 2-3 people'
  }
];

// Components
const GiftHamperPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialBoxId, setInitialBoxId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openDialogWithBox = (boxId: string) => {
    setInitialBoxId(boxId);
    setIsDialogOpen(true);
  };

  // Filter desserts and dips
  const desserts = products.filter(product => product.category === "Desert" && product.available);
  const dips = products.filter(product => product.category === "Dips" && product.available);

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[30rem] overflow-hidden">
        <Image
          src="/banner.png"
          alt="Gift Hampers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="bg-pink-500 mb-4 w-fit">Customizable Desert Sets</Badge>
          <h1 className="text-5xl font-extrabold text-white mb-6 max-w-2xl tracking-tight">
            Create Your Perfect Dessert Experience
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
            Handpick premium desserts and artisanal dips for any occasion. Each box is carefully packaged to deliver a delightful experience.
          </p>
          <Button
            size="lg"
            onClick={() => setIsDialogOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white w-fit shadow-lg transition-all hover:shadow-pink-200 hover:shadow-xl"
          >
            Create Your Box
            <Gift className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Box Types Preview */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Box Size</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Select the perfect size for your occasion and customize it with our premium desserts and signature dips</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {BOX_TYPES.map((box) => (
            <Card
              key={box.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
              onClick={() => openDialogWithBox(box.id)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={box.image}
                    alt={box.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-3">{box.name}</h3>
                    <p className="text-white/90 mb-4">{box.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <span className="text-2xl font-bold">₹{box.basePrice}</span>
                      <Badge className="bg-pink-500/90 py-1.5 text-sm">
                        {box.maxDesserts} Desserts + {box.maxDips} Dips
                      </Badge>
                    </div>
                    <Button className="mt-6 bg-white text-pink-600 hover:bg-pink-100">
                      Customize Now
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 text-pink-500 animate-spin" />
        </div>
      ) : (
        <CustomizationDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setInitialBoxId(null);
          }}
          initialBoxId={initialBoxId}
          desserts={desserts}
          dips={dips}
        />
      )}
    </div>
  );
};

// Customization Dialog Component
const CustomizationDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialBoxId: string | null;
  desserts: Product[];
  dips: Product[];
}> = ({ isOpen, onClose, initialBoxId, desserts, dips }) => {
  const [step, setStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState<BoxType | null>(null);
  const [selectedDesserts, setSelectedDesserts] = useState<Product[]>([]);
  const [selectedDips, setSelectedDips] = useState<Product[]>([]);

  // Initialize with the provided box when dialog opens
  React.useEffect(() => {
    if (isOpen && initialBoxId) {
      const boxType = BOX_TYPES.find(box => box.id === initialBoxId) || null;
      setSelectedBox(boxType);

      // If it's the large box, skip directly to dessert selection
      if (initialBoxId === 'large') {
        setStep(2); // Go directly to dessert selection
      } else {
        setStep(1);
      }
    }
  }, [isOpen, initialBoxId]);

  const resetSelections = () => {
    setStep(1);
    setSelectedBox(null);
    setSelectedDesserts([]);
    setSelectedDips([]);
  };

  const handleClose = () => {
    onClose();
    resetSelections();
  };

  const calculateTotal = () => {
    if (!selectedBox) return 0;
    
    const dessertsTotal = selectedDesserts.reduce((sum, item) => {
      const discountedPrice = item.price - (item.price * (item.discount / 100));
      return sum + discountedPrice;
    }, 0);
    
    const dipsTotal = selectedDips.reduce((sum, item) => {
      const discountedPrice = item.price - (item.price * (item.discount / 100));
      return sum + discountedPrice;
    }, 0);
    
    return selectedBox.basePrice + dessertsTotal + dipsTotal;
  };

  const displayPrice = (product: Product) => {
    const discountedPrice = product.price - (product.price * (product.discount / 100));
    return (
      <div className="flex items-center gap-2">
        <span className="text-pink-500 font-medium">₹{discountedPrice.toFixed(0)}</span>
        {product.discount > 0 && (
          <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
        )}
      </div>
    );
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Choose Your Box Size
            </DialogTitle>
            <div className="grid md:grid-cols-2 gap-6">
              {BOX_TYPES.map((box) => (
                <button
                  key={box.id}
                  onClick={() => {
                    setSelectedBox(box);
                    setStep(2);
                  }}
                  className={cn(
                    "relative group overflow-hidden rounded-xl border-2 transition-all",
                    selectedBox?.id === box.id
                      ? "border-pink-500 ring-2 ring-pink-500/20"
                      : "border-gray-200 hover:border-pink-200"
                  )}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{box.name}</h3>
                      <p className="text-sm opacity-90">{box.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold">₹{box.basePrice}</span>
                        <Badge className="bg-pink-500">
                          {box.maxDesserts} Desserts + {box.maxDips} Dips
                        </Badge>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Select Your Desserts
            </DialogTitle>
            <p className="text-center text-gray-500">
              Choose up to {selectedBox?.maxDesserts} desserts
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {desserts.map((dessert) => (
                <button
                  key={dessert._id}
                  onClick={() => {
                    if (selectedDesserts.some(d => d._id === dessert._id)) {
                      setSelectedDesserts(selectedDesserts.filter(d => d._id !== dessert._id));
                    } else if (selectedBox && selectedDesserts.length < selectedBox.maxDesserts) {
                      setSelectedDesserts([...selectedDesserts, dessert]);
                    }
                  }}
                  disabled={selectedBox !== null && selectedDesserts.length >= selectedBox.maxDesserts &&
                    !selectedDesserts.some(d => d._id === dessert._id)}
                  className={cn(
                    "relative group rounded-xl overflow-hidden border-2 transition-all",
                    selectedDesserts.some(d => d._id === dessert._id)
                      ? "border-pink-500 ring-2 ring-pink-500/20"
                      : "border-gray-200 hover:border-pink-200"
                  )}
                >
                  <div className="relative aspect-square">
                    <IKImage
                      path={dessert.image}
                      alt={dessert.name}
                      fill
                      className="object-cover"
                    />
                    {dessert.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        {dessert.discount}% OFF
                      </Badge>
                    )}
                    {selectedDesserts.some(d => d._id === dessert._id) && (
                      <div className="absolute top-2 right-2 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{dessert.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dessert.description}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={selectedDesserts.length === 0}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Choose Your Dips
            </DialogTitle>
            <p className="text-center text-gray-500">
              Choose up to {selectedBox?.maxDips} dips
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {dips.map((dip) => (
                <button
                  key={dip._id}
                  onClick={() => {
                    if (selectedDips.some(d => d._id === dip._id)) {
                      setSelectedDips(selectedDips.filter(d => d._id !== dip._id));
                    } else if (selectedBox && selectedDips.length < selectedBox.maxDips) {
                      setSelectedDips([...selectedDips, dip]);
                    }
                  }}
                  disabled={!!selectedBox && selectedDips.length >= selectedBox.maxDips &&
                    !selectedDips.some(d => d._id === dip._id)}
                  className={cn(
                    "relative group rounded-xl overflow-hidden border-2 transition-all",
                    selectedDips.some(d => d._id === dip._id)
                      ? "border-pink-500 ring-2 ring-pink-500/20"
                      : "border-gray-200 hover:border-pink-200"
                  )}
                >
                  <div className="relative aspect-square">
                    <IKImage
                      path={dip.image}
                      alt={dip.name}
                      fill
                      className="object-cover"
                    />
                    {dip.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        {dip.discount}% OFF
                      </Badge>
                    )}
                    {selectedDips.some(d => d._id === dip._id) && (
                      <div className="absolute top-2 right-2 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{dip.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dip.description}</p>
                    <div className="mt-2">{displayPrice(dip)}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={selectedDips.length === 0}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Review Order
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <DialogTitle className="text-2xl font-bold text-center">
              Review Your Order
            </DialogTitle>
            
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-3">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Box Type:</span>
                  <span className="font-medium">{selectedBox?.name}</span>
                </div>
                <div className="border-t pt-2">
                  <span className="text-gray-600">Selected Desserts:</span>
                  <ul className="mt-2 space-y-1">
                    {selectedDesserts.map(dessert => (
                      <li key={dessert._id} className="flex justify-between">
                        <span>{dessert.name}</span>
                        <span>₹{(dessert.price - (dessert.price * (dessert.discount / 100))).toFixed(0)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-2">
                  <span className="text-gray-600">Selected Dips:</span>
                  <ul className="mt-2 space-y-1">
                    {selectedDips.map(dip => (
                      <li key={dip._id} className="flex justify-between">
                        <span>{dip.name}</span>
                        <span>₹{(dip.price - (dip.price * (dip.discount / 100))).toFixed(0)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-2">
                  <span className="text-gray-600">Box Price:</span>
                  <span className="float-right">₹{selectedBox?.basePrice}</span>
                </div>
                <div className="border-t border-dashed pt-3 mt-3">
                  <span className="font-bold text-lg">Total Price:</span>
                  <span className="float-right font-bold text-lg text-pink-600">₹{calculateTotal().toFixed(0)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
              >
                Back
              </Button>
              <Button
                onClick={handleClose}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Add to Cart
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-3xl mx-auto p-6">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default GiftHamperPage;