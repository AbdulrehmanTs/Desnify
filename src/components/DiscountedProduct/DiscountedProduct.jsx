import React from 'react'
import Plus from '../../assets/Products/plus.svg'
import BlackShirt from '../../assets/Products/blackShirt.svg'

const DiscountedProduct = ({prod}) => {
    return (

        <div className="w-[500px] ml-2 md:w-[300px] md:ml-0 max-w-xs   overflow-hidden p-2">
            {/* Product Image Section */}
            <div className="relative">
                {/* <img src={`${BlackShirt}`} alt="Product" className="bg-[#F3F3F3] w-full h-auto rounded-2xl min-h-72" /> */}
                <img src={`${prod.images[0].imageUrl}`} alt="Product" className="bg-[#F3F3F3] w-full h-auto rounded-2xl min-h-72" />
                {/* Wishlist Icon at Top-Right */}
                <div className=' flex justify-center  bg-[#51BC74] rounded-[10px] absolute top-3 left-3 w-14 h-6 cursor-pointer'>
                    <p className='text-center text-white'>-13%</p>
                </div>

            </div>

            {/* Product Info */}
            <div className="mt-3 text-center">
                <h2 className="text-lg text-[22px] leading-7 text-[#404040] font-[Oxygen] font-normal ">{prod.name}</h2>
                {/* <p className="text-gray-700 text-sm">$18.00</p> */}
            </div>

            {/* Box & Button Section */}
            <div className="flex justify-between items-center mt-4">
                {/* Box with Quantity */}
                <div className="flex items-center">
                    <p className="text-gray-500 line-through mr-2">${prod.salesPrice}</p>
                    <p className="text-black font-bold">${prod.regPrice}</p>
                </div>

                {/* Order Button */}
                
                <img src={Plus} alt="" />

            </div>
        </div>
    )
}

export default DiscountedProduct
