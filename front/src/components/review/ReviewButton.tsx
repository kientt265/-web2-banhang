
interface ReviewButtonProps {
    loading: boolean;
    handleCreateReview: () => void;
}

function ReviewButton({loading,handleCreateReview}: ReviewButtonProps) {
    return (
        <button onClick={handleCreateReview} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
           {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>
    )
}

export default ReviewButton;