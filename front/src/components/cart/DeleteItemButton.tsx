
interface DeleteItemButtonProps {
    onDelete: () => void;
}

function DeleteItemButton({ onDelete }: DeleteItemButtonProps) {
    return (
        <div>
            <button onClick={onDelete} className="bg-red-500 hover:bg-red-700 rounded cursor-pointer">
                Delete
            </button>
        </div>
    );
}

export default DeleteItemButton;