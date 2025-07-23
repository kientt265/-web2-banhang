
interface ClearCartButtonProps {
    onClear: () => void;
}

function ClearCartButton({onClear}: ClearCartButtonProps) {

    return (
        <button onClick={onClear} className="bg-purple-600 hover:bg-red-500 cursor-pointer rounded p-4">
            Clear Cart
        </button>
    )
}

export default ClearCartButton;