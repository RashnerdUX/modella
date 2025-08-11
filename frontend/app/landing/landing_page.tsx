import { Link } from "react-router";
import NavigationBar from "../components/navigation/navigation_bar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">

      {/* Hero Section */}
      <section className="bg-background" id="HeroSection">
        {/* Navigation */}
        <NavigationBar />
        {/* Hero Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 px-8 sm:px-2 lg:px-16">
            <div className="flex flex-col justify-center items-center max-w-7xl py-8 mx-auto text-center sm:text-left">
                <h1 className="text-6xl font-serif mb-6 text-balance sm:text-7xl">
                    ELEVATE YOUR STYLE
                </h1>
                <p className="hidden sm:block text-body max-w-2xl mb-8">
                    Modella helps you organize your clothes, plan your outfits, and make smarter
                    shopping decisions with AI-powered recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register" className="btn-primary text-lg px-8 py-4">
                        Get Started
                    </Link>
                </div>
            </div>
            <div className="hidden sm:block h-screen">
                <img
                    src="images/model.jpg"
                    alt="Model"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-secondary text-center mb-12">Why Choose Modella?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Digital Wardrobe</h3>
              <p className="text-gray-600">Keep track of all your clothes in one place. Never forget what you own again.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">AI Recommendations</h3>
              <p className="text-gray-600">Get personalized outfit suggestions based on weather, occasion, and your style.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7m-6 0h6m-6 0l6 0" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Outfit Planning</h3>
              <p className="text-gray-600">Plan your outfits ahead of time. Save time and reduce stress in the morning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Wardrobe?</h2>
          <p className="text-primary-100 text-lg mb-8">Join thousands of users who have simplified their daily routine with Modella.</p>
          <Link to="/register" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2024 Modella. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}