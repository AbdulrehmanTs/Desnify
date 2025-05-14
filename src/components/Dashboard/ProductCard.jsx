
import { ArrowUp, Ellipsis } from 'lucide-react';
import CardShirt from '../../assets/Dashboard/CardShirt.svg'

// const ProductCard = () => {
//     return (
//         <div className="bg-white shadow-md rounded-xl p-4 w-76 2xl:w-[500px] border border-gray-200">
//             {/* Product Image & Menu */}
//             <div className="flex justify-between items-start">
//                 <div className='flex justify-center items-center'>
//                     <img
//                         src={CardShirt} // Replace with actual image URL
//                         alt="Product"
//                         className="w-16 h-16 object-cover rounded-lg"
//                     />
//                     <div>
//                         <h3 className="font-semibold text-gray-900 mt-2">Lorem Ipsum</h3>
//                         <p className="text-gray-500 text-sm">Shirt</p>
//                         <p className="font-bold text-black mt-1">110.40 PKR</p>
//                     </div>
//                 </div>
//                 <div>

//                     <Ellipsis className="text-gray-500 text-xl cursor-pointer" />
//                 </div>


//             </div>

//             {/* Product Details */}


//             {/* Summary Section */}
//             <h4 className="font-semibold text-gray-900 mt-4">Summary</h4>
//             <p className="text-gray-500 text-sm">
//                 Lorem ipsum is placeholder text commonly used in the graphic.
//             </p>

//             {/* Stats Box */}
//             <div className="border border-[#2323214D] rounded-lg p-3 shadow-sm bg-white mt-4">
//                 {/* Sales Row */}
//                 <div className="flex justify-between items-center text-gray-700 text-sm font-medium pb-2 border-b border-[#2323214D]">
//                     <span>Sales</span>
//                     <div className="flex items-center gap-1">
//                         <ArrowUp className="text-orange-500 w-4 h-4" />
//                         <span>1269</span>
//                     </div>
//                 </div>

//                 {/* Remaining Products Row */}
//                 <div className="flex justify-between items-center text-gray-700 text-sm font-medium pt-2">
//                     <span>Remaining Products</span>
//                     <div className="flex items-center gap-1">
//                         <div className="h-1 w-10 bg-orange-500 rounded-full">
//                             <div className="h-1 bg-gray-300 w-full rounded-full"></div>
//                         </div>
//                         <span>1269</span>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default ProductCard;


const ProductCard = () => {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 w-full border border-gray-200">
            <div className="flex justify-between items-start gap-4 flex-wrap">
                <div className='flex items-center gap-3'>
                    <img
                        src={CardShirt}
                        alt="Product"
                        className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-900">Lorem Ipsum</h3>
                        <p className="text-gray-500 text-sm">Shirt</p>
                        <p className="font-bold text-black mt-1">110.40 PKR</p>
                    </div>
                </div>
                <Ellipsis className="text-gray-500 text-xl cursor-pointer" />
            </div>

            <h4 className="font-semibold text-gray-900 mt-4">Summary</h4>
            <p className="text-gray-500 text-sm">
                Lorem ipsum is placeholder text commonly used in the graphic.
            </p>

            <div className="border border-[#2323214D] rounded-lg p-3 shadow-sm bg-white mt-4">
                <div className="flex justify-between items-center text-gray-700 text-sm font-medium pb-2 border-b border-[#2323214D]">
                    <span>Sales</span>
                    <div className="flex items-center gap-1">
                        <ArrowUp className="text-orange-500 w-4 h-4" />
                        <span>1269</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-gray-700 text-sm font-medium pt-2">
                    <span>Remaining Products</span>
                    <div className="flex items-center gap-1">
                        <div className="h-1 w-10 bg-orange-500 rounded-full">
                            <div className="h-1 bg-gray-300 w-full rounded-full"></div>
                        </div>
                        <span>1269</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
