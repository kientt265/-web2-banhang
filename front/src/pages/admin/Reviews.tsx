import { adminService } from "../../services/api";
import type { Review } from "../../types";
import UseCrud from '../../components/admin/common/UseCrud.tsx';
function AdminReviews() {
    const {
        items: reviews,
        isLoading,
        selectedItem: selectedReview,
        setSelectedItem: setSelectedReview,
        isModalOpen,
        setIsModalOpen,
        handleDelete
    } = UseCrud<Review>(
        'admin-reviews',
        () => adminService.getAllReviews(),
        undefined,
        adminService.deleteReview,
        undefined
    );
    return (
        <div>
            {isLoading}
        </div>
    )
}