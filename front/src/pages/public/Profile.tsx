import { userService } from '../../services/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../context/auth';
import type { User } from '../../types';

function Profile() {
    const [formData, setFormData] = useState<User>({
        id: 0,
        username: '',
        password: '',
        email: '',
        full_name: '',
        phone: '',
        address: '',
        role: 'user',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [, setAuth] = useAtom(authAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await userService.getProfile();
                setFormData(response.user);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const updateData = {
                username: formData.username,
                email: formData.email,
                password: formData.password || undefined,
                full_name: formData.full_name,
                phone: formData.phone,
                address: formData.address,
            };
            console.log(updateData);
            await userService.updateProfile(updateData);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
        
        setLoading(true);
        setError(null);
        try {
            await userService.deleteAccount();
            setAuth({ token: null, user: null});
            navigate('/login');
            alert('Account deleted successfully.');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Thông tin người dùng</h2>
            
            {loading ? (
                <p className="text-center text-gray-600">Đang tải...</p>
            ) : error ? (
                <p className="text-red-500 text-center mb-4">{error}</p>
            ) : isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <p><strong>Tên đăng nhập:</strong> {formData.username}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Họ tên:</strong> {formData.full_name}</p>
                    <p><strong>Số điện thoại:</strong> {formData.phone}</p>
                    <p><strong>Địa chỉ:</strong> {formData.address}</p>
                    <p><strong>Vai trò:</strong> {formData.role}</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Chỉnh sửa thông tin
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                        >
                            {loading ? 'Đang xử lý...' : 'Xóa tài khoản'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;