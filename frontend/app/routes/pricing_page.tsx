import { Link } from "react-router";
import NavigationBar from "../components/navigation/navigation_bar";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: 0,
      period: "month",
      description: "Perfect for getting started with AI-powered wardrobe management.",
      features: [
        "Upload wardrobe images (limited to 20 items)",
        "Basic outfit suggestions + 5 AI-powered matches",
        "Calendar for planning outfits (limit: 1 week ahead)",
        "Store recommendations (limited to 5 items/day)",
        "No personalization or learning"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "btn-secondary",
      popular: false
    },
    {
      name: "Everyday Style",
      price: 7.99,
      period: "month",
      description: "Ideal for casual and professional styling with personalized AI recommendations.",
      features: [
        "Unlimited wardrobe uploads",
        "AI outfit matching (with ML model)",
        "Personalized suggestions (based on feedback)",
        "Full calendar access",
        "Priority product matching from store inventory",
        "1 virtual try-on/week"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "btn-primary",
      popular: true
    },
    {
      name: "Style Icon",
      price: 19.99,
      period: "month",
      description: "The ultimate styling experience with unlimited features and premium benefits.",
      features: [
        "All features of Everyday Style",
        "Unlimited virtual try-ons (3D model)",
        "AI concierge: outfit suggestions for specific events",
        "Access to style trends and premium recommendations",
        "Styling reports with feedback on outfit rotation",
        "Early access to sales and AI drops"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "btn-primary",
      popular: false
    }
  ];

  const comparisonFeatures = [
    { feature: "Wardrobe Uploads", starter: "20 items max", everyday: "Unlimited", icon: "Unlimited" },
    { feature: "AI Outfit Matching", starter: "Basic + 5 AI", everyday: "Full ML model", icon: "Full ML model" },
    { feature: "Calendar Planning", starter: "1 week ahead", everyday: "Full access", icon: "Full access" },
    { feature: "Store Recommendations", starter: "5 items/day", everyday: "Priority matching", icon: "Priority matching" },
    { feature: "Virtual Try-Ons", starter: "❌", everyday: "1/week", icon: "Unlimited" },
    { feature: "Personalization", starter: "❌", everyday: "✅", icon: "✅" },
    { feature: "AI Concierge", starter: "❌", everyday: "❌", icon: "✅" },
    { feature: "Style Trends", starter: "❌", everyday: "❌", icon: "✅" },
    { feature: "Styling Reports", starter: "❌", everyday: "❌", icon: "✅" },
    { feature: "Early Access", starter: "❌", everyday: "❌", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-primary mb-6">
            Choose Your <span className="text-primary-600">Style Journey</span>
          </h1>
          <p className="text-body mb-8">
            Select the perfect plan to elevate your style and streamline your wardrobe management.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                  plan.popular
                    ? 'border-2 border-primary-600 transform scale-105'
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price === 0 ? '0' : plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    plan.buttonStyle === 'btn-primary'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-secondary text-center mb-12">Plan Comparison</h2>
          
          {/* Mobile Comparison - Stacked */}
          <div className="md:hidden space-y-6">
            {comparisonFeatures.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">{item.feature}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Starter:</span>
                    <span className="text-sm font-medium">{item.starter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Everyday Style:</span>
                    <span className="text-sm font-medium">{item.everyday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Style Icon:</span>
                    <span className="text-sm font-medium">{item.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comparison - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Starter<br />
                    <span className="font-normal text-gray-600">Free</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-primary-50">
                    Everyday Style<br />
                    <span className="font-normal text-gray-600">$7.99/month</span>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Style Icon<br />
                    <span className="font-normal text-gray-600">$19.99/month</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFeatures.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.feature}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{item.starter}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900 bg-primary-25 font-medium">{item.everyday}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-900 font-medium">{item.icon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-secondary text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h4>
              <p className="text-gray-600">Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at your next billing cycle.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial available?</h4>
              <p className="text-gray-600">All paid plans come with a 14-day free trial. No credit card required to start your trial with the Starter plan.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">What happens to my data if I cancel?</h4>
              <p className="text-gray-600">Your wardrobe data is safely stored and you can reactivate anytime. We keep your data for 90 days after cancellation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Style?</h2>
          <p className="text-primary-100 text-lg mb-8">
            Join thousands of users who have simplified their daily routine with AI-powered styling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial
            </Link>
            <Link to="/" className="text-primary-100 hover:text-white px-8 py-4 rounded-lg font-medium transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Modella</h5>
              <p className="text-gray-400 text-sm">Your personal AI stylist for a simplified wardrobe experience.</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Product</h6>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-8 border-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Modella. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}