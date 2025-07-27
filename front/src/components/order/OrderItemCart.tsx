import type {OrderItem} from '../../types/index';

interface OrderItemCartProps {
    orderItem: OrderItem;
}

function OrderItemCart({orderItem}: OrderItemCartProps) {
    return (
        <div className='bg-grey-500 p-3 rounded cursor-pointer'>
            <div className="flex items-center gap-4">
                <img 
                    src={orderItem.image_url || '/placeholder.jpg'} 
                    alt={orderItem.name}
                    className="w-20 h-20 object-cover rounded"
                />
                <div>
                    <p className="font-bold">{orderItem.name}</p>
                    <p>Đơn giá: {Number(orderItem.unit_price).toLocaleString()} VND</p>
                    <p>Số lượng: {orderItem.quantity}</p>
                    <p>Thành tiền: {(Number(orderItem.unit_price) * orderItem.quantity).toLocaleString()} VND</p>
                </div>
            </div>
        </div>
    )
}
// return (
//     <div className="p-4">
//       <div className="flex flex-wrap -mx-4">
//         {products?.map((product) => (
//           <div
//             key={product.id}
//             className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6"
//           >
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
export default OrderItemCart