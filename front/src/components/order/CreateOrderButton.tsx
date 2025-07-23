interface CreateOrderButtonProps {
    onHandleCreateOrder:() => void;
}


function CreateOrderButton({onHandleCreateOrder}: CreateOrderButtonProps) {
    return (
        <button onClick={onHandleCreateOrder} className="bg-green-500 hover:bg-red-500 rounded cursor-pointer mx-2 p-4 " >Thanh toán</button>
    )
}
export default CreateOrderButton;