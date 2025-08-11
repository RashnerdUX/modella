import { Link } from "react-router";

export default function NavigationBar(){
        return <nav className="backdrop-blur-sm sticky top-0 z-50 px-8 py-2 sm:px-16">
                {/* This only covers the navigation */}
                <div className="max-w-8xl mx-auto sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                        <span className="heading-secondary !text-xl !text-primary-600">Modella</span>
                        </div>
                            
                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">How It Works</a>
                        <Link to="/pricing" className="text-gray-600 hover:text-primary-600 transition-colors">Pricing</Link>
                        </div>
                            
                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">Login</Link>
                        <Link to="/register" className="btn-primary">Get Started</Link>
                        </div>
                    </div>
                </div>
            </nav>
}