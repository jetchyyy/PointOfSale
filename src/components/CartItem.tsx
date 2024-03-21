import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import helmetItems from "../data/helmets.json";
import shoesItems from "../data/shoes.json"; // Import shoes data
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  // Find the item in storeItems, helmetItems, or shoesItems
  const regularItem = storeItems.find((item) => item.id === id);
  const helmetItem = helmetItems.find((item) => item.id === id);
  const shoeItem = shoesItems.find((item) => item.id === id); // Find the item in shoesItems

  // Choose the item from storeItems, helmetItems, or shoesItems
  const item = regularItem || helmetItem || shoeItem;

  if (item) {
    return (
      <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img src={item.imgUrl} alt={item.name} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
        <div className="me-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
          &times;
        </Button>
      </Stack>
    );
  }

  return null;
}
