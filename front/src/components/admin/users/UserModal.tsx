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
    email: '',
    full_name: '',
    phone: '',
    address: '',
    role: 'user'
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...submitData } = formData;
    onSubmit(submitData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Các trường nhập thông tin user */}
        <input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
        {/* ... các trường khác ... */}
        <button type="button" onClick={onClose}>Hủy</button>
        <button type="submit">Lưu</button>
      </form>
    </div>
    
  );
}

export default UserModal;