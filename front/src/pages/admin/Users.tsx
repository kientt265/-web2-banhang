import { adminService } from '../../services/api';
import type { User } from '../../types';
import UserModal from '../../components/admin/users/UserModal';
import UseCrud from '../../components/admin/common/UseCrud.tsx';

function AdminUsers() {
  const {
    items: users,
    isLoading,
    selectedItem: selectedUser,
    setSelectedItem: setSelectedUser,
    isModalOpen,
    setIsModalOpen,
    updateMutation,
    handleDelete,
  } = UseCrud<User>(
    'admin-users',
    () => 
    adminService.getAllUsers(),
    adminService.updateUser,
    adminService.deleteUser,
    undefined
  );

  if (isLoading) return <div>Đang tải...</div>;

  return (
    // <div>
    //   <h1>Quản lý user</h1>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Thao tác</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users?.map((user) => (
    //         <tr key={user.id}>
    //           <td>{user.id}</td><td>{user.username}</td><td>{user.email}</td><td>{user.role}</td>
    //           <td>
    //             <button onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}>Sửa</button>
    //             <button onClick={() => handleDelete(user.id!)}>Xóa</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   {isModalOpen && (
    //     <UserModal
    //       user={selectedUser}
    //       onClose={() => setIsModalOpen(false)}
    //       onSubmit={(data) => {
    //         if (selectedUser) {
    //           updateMutation.mutate({ id: selectedUser.id!, data });
    //         }
    //       }}
    //     />
    //   )}
    // </div>
    <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
      <button
        onClick={() => {
          setSelectedUser(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm sản phẩm mới
      </button>
    </div>

    <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">User Name</th>
            <th className="py-3 px-6 text-left">Full Name</th>
            <th className="py-3 px-6 text-left">Địa chỉ</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users?.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{user.id}</td>
              <td className="py-3 px-6 text-left">{user.username}</td>
              <td className="py-3 px-6 text-left">{user.full_name}</td>
              <td className="py-3 px-6 text-left">{user.address}</td>
              <td className="py-3 px-6 text-left">{user.role}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* {isModalOpen && (
      <UserModal
        product={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          if (selectedUser) {
            updateMutation.mutate({ id: selectedUser.id, data });
          } else {
            createMutation.mutate(data);
          }
        }}
      />
    )} */}
  </div>
  );
}

export default AdminUsers;