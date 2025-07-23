import { cartService } from "../../services/api";
import type { CartItem, Cart } from "../../types";
import CartItemCard from "../../components/cart/CartItemCard.tsx";
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ClearCartButton from '../../components/cart/ClearCartButton.tsx';
import CreateOrderButton from "../../components/order/CreateOrderButton.tsx";
import { useState } from "react";
import CreateOrderModal from "../../components/order/CreateOrderModal.tsx";
function CartList() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: cart, isLoading } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart()
  })
  const { mutate: clearCart } = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('Cleared cart');
    },
    onError: (error: any) => {
      alert(error.message);
    }
  });


  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-4">
      <div className="flex flex-wrap -mx-4">
        {cart?.items?.map((item) => (
          <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6">
            <CartItemCard cartItem={item} />
          </div>
        ))}
      </div>
      <ClearCartButton onClear={() => clearCart()} />
      <CreateOrderButton onHandleCreateOrder={() => setIsModalOpen(true) } />
      <CreateOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default CartList;