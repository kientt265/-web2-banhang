import { useState } from "react";
import { authAtom } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { reviewService } from "../../services/api";
import ReviewButton from "./ReviewButton";


interface CreateReviewModalProps {
    product_id: number;
    isOpen: boolean;
    onClose: () => void;
}
interface Review {
    product_id: number;
    rating: number;
    comment: string;
}

function CreateReviewModal({ product_id, isOpen, onClose }: CreateReviewModalProps) {
    const [review, setReview] = useState<Review>({
        product_id: product_id,
        rating: 0,
        comment: '',
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [auth] = useAtom(authAtom);
    const navigate = useNavigate();

    const handleCreateReview = async () => {
        if (!auth.token) {
            navigate('/login');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await reviewService.createReview({
                product_id: review.product_id,
                rating: review.rating,
                comment: review.comment
            });
            onClose();
            alert('Create review successfully');
            navigate('/order');
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Đánh giá:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={review.rating}
                        onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nội dung:</label>
                    <textarea
                        value={review.comment}
                        onChange={(e) => setReview({ ...review, comment: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    />
                </div>
                <div className="mt-4">
                    <ReviewButton
                        handleCreateReview={handleCreateReview}
                        loading={loading}
                    />
                    <button
                        onClick={onClose}
                        className="p-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateReviewModal;