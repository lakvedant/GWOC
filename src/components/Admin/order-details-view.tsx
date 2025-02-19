import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Package, InfoIcon } from "lucide-react";
import { IKImage } from "imagekitio-next";

interface Order {
  _id: string;
  createdAt: string;
  orderStatus: string;
  amount: number;
  products: {
    _id: string;
    productId: {
      image: string;
      name: string;
      description: string;
      price: number;
    };
    quantity: number;
  }[];
  instructions?: string;
}

interface DataTableProps {
  order: Order | null;
  disabled?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  const statusMap: { [key: string]: string } = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800"
  };
  return statusMap[status.toLowerCase()] || statusMap.default;
};

const OrderDetailsView: React.FC<DataTableProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-xl overflow-y-auto p-6">
        <SheetHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">Order Details</SheetTitle>
            <Badge variant="outline" className={`${getStatusColor(order.orderStatus)} capitalize px-3 py-1`}>
              {order.orderStatus}
            </Badge>
          </div>
          <SheetDescription className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4" />
            Order ID: {order._id}
          </SheetDescription>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              <span className="text-sm font-medium">
                {order.products.length} {order.products.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="space-y-4">
              {order.products.map((product) => (
                <Card key={product._id} className="overflow-hidden border-gray-200">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                          <IKImage
                            path={product.productId.image}
                            width={400}
                            height={400}
                            alt={product.productId.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-medium text-base sm:text-lg line-clamp-2">
                              {product.productId.name}
                            </h4>
                            <p className="font-semibold text-base sm:text-lg whitespace-nowrap">
                              ₹{(product.productId.price * product.quantity).toFixed(2)}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                            <Badge variant="secondary" className="w-fit">
                              Qty: {product.quantity}
                            </Badge>
                            <span className="hidden sm:inline">•</span>
                            <span>₹{product.productId.price.toFixed(2)} per item</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {order.instructions && (
              <Card className="mt-6">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <InfoIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">Special Instructions</h3>
                      <p className="text-sm text-gray-600">{order.instructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="mt-6 bg-gray-50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{order.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{order.amount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default OrderDetailsView;