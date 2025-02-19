"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, X, ChevronRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

// Types
interface DessertItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
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
const DESSERT_OPTIONS: DessertItem[] = [
    {
        id: 1,
        name: 'Churros',
        price: 199,
        image: '/images/churros.jpg',
        description: 'Crispy Spanish pastries dusted with cinnamon sugar'
    },
    {
        id: 2,
        name: 'Mini Donuts',
        price: 179,
        image: '/images/donuts.jpg',
        description: 'Bite-sized fluffy donuts with sweet glaze'
    },
    {
        id: 3,
        name: 'Vanilla Bites',
        price: 149,
        image: '/images/vanilla-bites.jpg',
        description: 'Delicate vanilla-flavored cake bites'
    },
    {
        id: 4,
        name: 'Brownie Bites',
        price: 199,
        image: '/images/brownie-bites.jpg',
        description: 'Rich, fudgy chocolate brownie squares'
    }
];

const DIP_OPTIONS: DessertItem[] = [
    {
        id: 1,
        name: 'Chocolate Dip',
        price: 99,
        image: '/images/chocolate-dip.jpg',
        description: 'Rich Belgian chocolate dipping sauce'
    },
    {
        id: 2,
        name: 'Hazelnut Dip',
        price: 129,
        image: '/images/hazelnut-dip.jpg',
        description: 'Creamy Nutella-style hazelnut spread'
    },
    {
        id: 3,
        name: 'Tiramisu Dip',
        price: 149,
        image: '/images/tiramisu-dip.jpg',
        description: 'Coffee-flavored mascarpone dip'
    }
];

const BOX_TYPES: BoxType[] = [
    {
        id: 'large',
        name: 'Large Dessert Box',
        maxDesserts: 4,
        maxDips: 3,
        basePrice: 999,
        image: '/largehamp.png',
        description: 'Perfect for sharing with 4-6 people'
    },
    {
        id: 'small',
        name: 'Small Dessert Box',
        maxDesserts: 2,
        maxDips: 2,
        basePrice: 599,
        image: '/images/small-box.jpg',
        description: 'Ideal for 2-3 people'
    }
];

// Components
const GiftHamperPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [initialBoxId, setInitialBoxId] = useState<string | null>(null);

    const openDialogWithBox = (boxId: string) => {
        setInitialBoxId(boxId);
        setIsDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[70vh] overflow-hidden">
                <Image
                    src="/banner.webp"
                    alt="Gift Hampers"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Create Your Perfect Dessert Box
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl">
                        Customize your own gift hamper with our selection of fresh desserts and dips.
                        Perfect for any occasion!
                    </p>
                    <Button
                        size="lg"
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-pink-500 hover:bg-pink-600 text-white w-fit"
                    >
                        Create Your Box
                        <Gift className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Box Types Preview */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Choose Your Box Size</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {BOX_TYPES.map((box) => (
                        <Card
                            key={box.id}
                            className="group cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => openDialogWithBox(box.id)}
                        >
                            <CardContent className="p-0">
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={box.image}
                                        alt={box.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">{box.name}</h3>
                                        <p className="text-white/90 mb-3">{box.description}</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xl font-bold">₹{box.basePrice}</span>
                                            <Badge className="bg-pink-500">
                                                {box.maxDesserts} Desserts + {box.maxDips} Dips
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <CustomizationDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setInitialBoxId(null);
                }}
                initialBoxId={initialBoxId}
            />
        </div>
    );
};

// Customization Dialog Component
const CustomizationDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    initialBoxId: string | null;
}> = ({ isOpen, onClose, initialBoxId }) => {
    const [step, setStep] = useState(1);
    const [selectedBox, setSelectedBox] = useState<BoxType | null>(null);
    const [selectedDesserts, setSelectedDesserts] = useState<DessertItem[]>([]);
    const [selectedDips, setSelectedDips] = useState<DessertItem[]>([]);

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
        const dessertsTotal = selectedDesserts.reduce((sum, item) => sum + item.price, 0);
        const dipsTotal = selectedDips.reduce((sum, item) => sum + item.price, 0);
        return selectedBox.basePrice + dessertsTotal + dipsTotal;
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
                            {DESSERT_OPTIONS.map((dessert) => (
                                <button
                                    key={dessert.id}
                                    onClick={() => {
                                        if (selectedDesserts.some(d => d.id === dessert.id)) {
                                            setSelectedDesserts(selectedDesserts.filter(d => d.id !== dessert.id));
                                        } else if (selectedBox && selectedDesserts.length < selectedBox.maxDesserts) {
                                            setSelectedDesserts([...selectedDesserts, dessert]);
                                        }
                                    }}
                                    disabled={selectedBox !== null && selectedDesserts.length >= selectedBox.maxDesserts &&
                                        !selectedDesserts.some(d => d.id === dessert.id)}
                                    className={cn(
                                        "relative group rounded-xl overflow-hidden border-2 transition-all",
                                        selectedDesserts.some(d => d.id === dessert.id)
                                            ? "border-pink-500 ring-2 ring-pink-500/20"
                                            : "border-gray-200 hover:border-pink-200"
                                    )}
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            src={dessert.image}
                                            alt={dessert.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {selectedDesserts.some(d => d.id === dessert.id) && (
                                            <div className="absolute top-2 right-2 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold">{dessert.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{dessert.description}</p>
                                        <p className="text-pink-500 font-medium mt-2">₹{dessert.price}</p>
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
                            {DIP_OPTIONS.map((dip) => (
                                <button
                                    key={dip.id}
                                    onClick={() => {
                                        if (selectedDips.some(d => d.id === dip.id)) {
                                            setSelectedDips(selectedDips.filter(d => d.id !== dip.id));
                                        } else if (selectedBox && selectedDips.length < selectedBox.maxDips) {
                                            setSelectedDips([...selectedDips, dip]);
                                        }
                                    }}
                                    disabled={!!selectedBox && selectedDips.length >= selectedBox.maxDips &&
                                        !selectedDips.some(d => d.id === dip.id)}
                                    className={cn(
                                        "relative group rounded-xl overflow-hidden border-2 transition-all",
                                        selectedDips.some(d => d.id === dip.id)
                                            ? "border-pink-500 ring-2 ring-pink-500/20"
                                            : "border-gray-200 hover:border-pink-200"
                                    )}
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            src={dip.image}
                                            alt={dip.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {selectedDips.some(d => d.id === dip.id) && (
                                            <div className="absolute top-2 right-2 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold">{dip.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{dip.description}</p>
                                        <p className="text-pink-500 font-medium mt-2">₹{dip.price}</p>
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
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Box Type:</span>
                                <span>{selectedBox?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Desserts:</span>
                                <span>{selectedDesserts.map(d => d.name).join(', ')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Dips:</span>
                                <span>{selectedDips.map(d => d.name).join(', ')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Total Price:</span>
                                <span>₹{calculateTotal()}</span>
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
                                Confirm Order
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