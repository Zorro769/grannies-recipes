import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="text-white py-20 bg_gradient ">
            <div className="container mx-auto px-20 lg:px-20 py-20 flex flex-col gap-10 md:flex-row justify-between border-t border-slate-800">
                <div className="flex">
                    <p className="font-bold text-center">
                        Granny's<span className="text-green-500 text-xl">Recipes</span>
                    </p>
                </div>

                <div className="flex flex-col">
                    <p>SOCIAL MEDIA</p>
                    <div className="flex justify-center mt-4 gap-3">
                        <a href='https://www.facebook.com/nltu.edu.ua' target="_blank" className='bg-blue-600 p-1.5 rounded-sm text-white hover:text-gray-500 hover:scale-110'>
                            <FaFacebook size={18} />
                        </a>

                        <a href='https://www.instagram.com/nltu_official/' className='bg-pink-600 p-1.5 rounded-sm text-white hover:text-gray-500 hover:scale-110'>
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center py-10">
                <span className="text-gray-400 leading-10">D&R NLTU &copy; 2023</span>
            </div>
        </footer>
    )
}

export default Footer