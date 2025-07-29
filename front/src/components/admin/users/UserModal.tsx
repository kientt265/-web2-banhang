import { useState, useEffect } from 'react';
import type { User } from '../../../types';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
}

function UserModal({ user, onClose, onSubmit }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    full_name: '',
    address: '',
    role: 'user'
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, created_at, updated_at, ...submitData } = formData;
    onSubmit(submitData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className="modal bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {user ? 'Chỉnh sửa thông tin người dùng': ''}
        </h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter username"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700" htmlFor="full_name">Full Name:</label>
            <input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={e => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Enter full name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address:</label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter address"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700" htmlFor="role">Role:</label>
            <select
              id="role"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value as "user" | "admin" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="button-group">
            <button type="button" onClick={onClose} className="btn-cancel bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
              Hủy
            </button>
            <button type="submit" className="btn-submit bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mx-3">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default UserModal;