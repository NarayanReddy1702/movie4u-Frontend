import React from 'react'

function AdminFooter() {
  return (
   <>
    <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
                <div className="space-y-4">
                    <img className='w-40 object-cover h-15' src="./movieLogo.png" alt="" />
                    <p className="text-gray-400">Making the world a better place through innovative solutions.</p>
                    <div className="flex space-x-4">
                    
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Projects</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>123 Business Street</li>
                        <li>New York, NY 10001</li>
                        <li>Phone: (555) 123-4567</li>
                        <li>Email: info@company.com</li>
                    </ul>
                </div>

            
                <div>
                    <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                    <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates.</p>
                    <form className="space-y-2">
                        <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition duration-300">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
                <p className="text-center text-gray-400">© 2024 Company Name. All rights reserved.</p>
            </div>
        </div>
    </footer>
   </>
  )
}

export default AdminFooter