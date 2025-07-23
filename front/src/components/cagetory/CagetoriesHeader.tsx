import type {Category} from '../../types/index';
import { useNavigate } from 'react-router-dom';

interface CagetoriesHeaderProps {
    categories: Category[];
}

function CagetoriesHeader({ categories }: CagetoriesHeaderProps) {
    const navigate = useNavigate();
    
    return (
      <div className="relative">
            <select
              className="cursor-pointer text-lg font-semibold text-gray-600 hover:text-gray-800 rounded px-2 py-1"
            onChange={(e) => {
                const selectedCategoryId  = e.target.value;
                if (selectedCategoryId ) {
                    navigate(`/Category/${selectedCategoryId}`);
                }
            }}
            >
              <option className='cursor-pointer' value="#">Loại sản phẩm</option>
              {categories?.map((category) => (
                <option className='cursor-pointer' value = {category.id}>{category.name}</option>
              ))}
            </select>
          </div>
    );
};

export default CagetoriesHeader;