/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const CategoryCard = ({category }) => {
    return (
   <Link to={category.link}>
            <div className="border rounded-lg p-4 flex flex-col items-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-gray-200">
                <img src={category.img} alt={category.name} className="w-20 h-20 object-cover mb-4  transform transition-transform duration-300 " />
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            </div>
   </Link>
    );
};

export default CategoryCard;
