import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IOrder } from "@/models/Order";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface OrderUpdateData {
  orderStatus: "Pending" | "Accepted" | "Ready" | "Picked" | "Declined";
  instructions: string;
}

interface OrderSliderProps {
  order: IOrder;
  onClose: () => void;
  onSave: (updatedOrder: OrderUpdateData) => void;
}

export const EditOrder: React.FC<OrderSliderProps> = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState<OrderUpdateData>({
    orderStatus: order.orderStatus,
    instructions: order.instructions || "",
  });

  const handleInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedOrder({ ...editedOrder, instructions: e.target.value });
  };

  const handleStatusChange = (value: "Pending" | "Accepted" | "Ready" | "Picked" | "Declined") => {
    setEditedOrder({ ...editedOrder, orderStatus: value });
  };

  const handleSave = () => {
    onSave(editedOrder);
    onClose();
  };

  // Calculate total amount
  const calculateTotal = () => {
    return order.products.reduce((total, product) => {
      const price = product.productId.price || 0;
      return total + (price * product.quantity);
    }, 0);
  };

  return (
    <div className="flex flex-col h-full mt-8">
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-6">
          {/* Order Details (Read-only) */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Order Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Order ID:</div>
              <div className="font-medium">#{order.orderID}</div>
              <div>Customer:</div>
              <div className="font-medium">{order.name}</div>
              <div>Phone:</div>
              <div className="font-medium">{order.phone}</div>
              <div>Amount:</div>
              <div className="font-medium">₹{order.amount.toFixed(2)}</div>
              <div>Payment:</div>
              <div className="font-medium">{order.paymentType}</div>
            </div>
          </div>

          {/* Status Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Order Status</label>
            <Select value={editedOrder.orderStatus} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Ready">Ready</SelectItem>
                <SelectItem value="Picked">Picked</SelectItem>
                <SelectItem value="Declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Special Instructions</label>
            <Textarea
              name="instructions"
              value={editedOrder.instructions}
              onChange={handleInstructionsChange}
              placeholder="Add any special instructions or notes..."
              className="h-32"
            />
          </div>

          {/* Products List - Improved Layout */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Ordered Products</h3>
            <Card className="p-4">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 mb-2 text-sm font-medium text-gray-600">
                <div className="col-span-5">Product</div>
                <div className="col-span-3 text-right">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {/* Products */}
              <div className="space-y-3 overflow-x-auto">
                {order.products.map((product, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-12 gap-4 text-sm items-center py-2 border-b last:border-0"
                  >
                    <div className="col-span-5 font-medium">
                      {product.productId.name}
                    </div>
                    <div className="col-span-3 text-right">
                      ₹{product.productId.price?.toFixed(2)}
                    </div>
                    <div className="col-span-2 text-center">
                      {product.quantity}
                    </div>
                    <div className="col-span-2 text-right font-medium">
                      ₹{((product.productId.price || 0) * product.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 pt-3 border-t grid grid-cols-12 gap-4 text-sm font-medium">
                <div className="col-span-8 text-right">Total Amount:</div>
                <div className="col-span-4 text-right">₹{calculateTotal().toFixed(2)}</div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-6 mb-4">
          <Button className="w-full" onClick={handleSave}>
            Update Order
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};