import { cartService } from "../../services/api";
import type { CartItem, Cart } from "../../types";
import CartItemCard from "../../components/cart/CartItemCard.tsx";
import { useQuery } from '@tanstack/react-query';

function CartList() {
    const {data: cart, isLoading} = useQuery<Cart>({
        queryKey: ['cart'],
        queryFn: () => cartService.getCart()
    })
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
      </div>
    )
}

export default CartList;