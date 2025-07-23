import { cartService } from '../../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteItemButtonProps {
    productId: number;
}

function DeleteItemButton({ productId }: DeleteItemButtonProps) {
    const queryClient = useQueryClient();

    const { mutate: deleteItem } = useMutation({
        mutationFn: () => cartService.deleteItem(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            alert('Deleted from cart');
        },
        onError: (error: any) => {
            alert(error.message);
        }
    });

    return (
        <div>
            <button onClick={() => deleteItem()} className="bg-red-500 hover:bg-red-700 rounded cursor-pointer">Delete</button>
        </div>
    );
}

export default DeleteItemButton;