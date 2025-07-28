import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function UseCrud<T>(
    queryKey: string,
    fetchFn: () => Promise<T[]>,
    updateFn?: (id: number, data: Partial<T>) => Promise<T>,
    deleteFn?: (id: number) => Promise<void>,
    createFn?: (data: Partial<T>) => Promise<T>
) {
    const queryClient = useQueryClient();
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {data: items, isLoading} = useQuery<T[]>({
        queryKey: [queryKey],
        queryFn: fetchFn,
    })

    const createMutation = useMutation({
        mutationFn: createFn ?? (() => Promise.reject(new Error("Tạo mới không được hỗ trợ"))),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKey]});
            setIsModalOpen(false);
            setError(null);
        },
        onError: (error: Error) => {
            setError(error.message);
        }
    });


    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<T> }) =>{
            if (!updateFn) {
                return Promise.reject(new Error("Cập nhật không được hỗ trợ"));
              }
            return updateFn(id, data);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          setIsModalOpen(false);
          setError(null);
        },
        onError: (error: Error) => {
            setError(error.message);
        }
    });
    
    const deleteMutation = useMutation({
        mutationFn: deleteFn ?? (() => Promise.reject(new Error("Xóa không được hỗ trợ"))),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
          setError(null);
        },
        onError: (error: Error) => {
            setError(error.message);
        }
    })

    const handleDelete = async (id: number) => {
        try {
            if (window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
                await deleteMutation.mutateAsync(id);
            }
        } catch (error) {
            console.error('Lỗi khi xóa:', error);
        }
    };
    const isCreateSupported = !!createFn;

    return {
        items,
        isLoading,
        selectedItem,
        setSelectedItem,
        isModalOpen,
        setIsModalOpen,
        createMutation,
        updateMutation,
        handleDelete,
        error,
        isCreateSupported
    };
}

export default UseCrud;