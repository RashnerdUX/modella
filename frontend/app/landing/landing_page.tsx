import { Link } from "react-router";
import React from "react";
import NavigationBar from "../components/navigation/navigation_bar";
import { StepCard, StepCards } from "./StepCard";
import { FeaturesCardSection } from "./FeaturesCard";
import { ReviewsSection } from "./ReviewsSection";
import { Icons } from "../icons";
import ShowcaseStack from "./ShowcaseStack";
import { HowItWorks } from "./HowItWorks";

export function LandingPage() {
  return (
    <div className="min-h-screen">

      {/* Site Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative bg-background h-[480px] md:h-[600px] overflow-hidden" id="HeroSection">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src="/images/model.jpg" alt="Model background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          {/* Hero Content Overlay */}
          <div className="relative z-10 h-full flex items-center justify-center px-8 sm:px-2 lg:px-16">
            <div className="max-w-5xl w-full text-center py-8">
              <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif mb-4 leading-tight break-words">
                ELEVATE YOUR STYLE
              </h1>
              <p className="hidden sm:block text-white/90 max-w-2xl mx-auto mb-8">
                Discover your best fit with Modella with our digital wardrobe, AI-powered styling suggestions, and more.
              </p>
                <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/register" className="px-6 py-3 rounded-lg font-semibold bg-[#B76E79] text-white hover:bg-primary-700 transition-colors">Get started</Link>
                <Link to="/demo" className="inline-block border border-white/80 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View demo
                </Link>
                </div>
            </div>
          </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative py-16 md:py-24 px-4 md:px-12 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HowItWorks />
          <div className="relative h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center">
            <ShowcaseStack className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* Features Preview*/}
      <section id="features" className="py-8 h-[1000px] md:py-20 bg-[#38250e] overflow-hidden">
        <div className="flex flex-col items-center relative">
            <div className="text-center mb-8 w-2/3">
              <h2 className="text-center text-5xl font-bold text-white mb-2">Why Choose Modella?</h2>
              <p className="text-sm text-center font-semibold text-gray-200"> Modella offers you everything you need to take your style to the next level in a single application. Get access to your personal stylist and shopper whose main goal is to help you look your best every day</p>
            </div>
            <div className="w-4/5 h-full rounded-t-xl">
            <img src="/images/dashboard-preview.png" alt="Dashboard Preview" className="w-full h-full mx-auto mb-8 object-cover rounded-t-xl"/>
            </div>
            <div className="w-[90%] top-180 flex absolute py-4 mx-4 mt-12 md:-mt-16 rounded-xl bg-white">
              <FeaturesCardSection /> 
            </div>
        </div>
      </section>

      {/* Reviews section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 h-[480px] bg-gradient-to-r from-[#F4D3D7] to-[#38250e] flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center mb-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-lg font-medium bg-primary-50 text-primary-700 border border-primary-200">
              <span aria-hidden>✨</span> Ready to Revamp Your Style
            </span>
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-4">Your Personal Stylist Awaits!</h2>
          <p className="text-white text-lg mb-8">Join thousands of users who have changed their wardrobe overnight and have become style icons with Modella.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="inline-block bg-[#B76E79] text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-[#B76E79] transition-colors">
              Start Your Free Trial
            </Link>
            <Link to="/demo" className="inline-block border border-white/80 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center">
              View demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Part 1: 5-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Brand + Social (spans 2) */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold">Modella</h3>
              <p className="text-gray-300">
                Your AI-powered wardrobe planner and personal stylist. Build a cohesive closet,
                get smart outfit suggestions, and simplify what to wear—every day.
              </p>
              <div className="flex items-center gap-3">
                <a aria-label="Twitter" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors">
                  {(() => { const I = Icons.twitter; return <I className="h-4 w-4" />; })()}
                </a>
                <a aria-label="Instagram" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors">
                  {(() => { const I = Icons.instagram; return <I className="h-4 w-4" />; })()}
                </a>
                <a aria-label="LinkedIn" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors">
                  {(() => { const I = Icons.linkedin; return <I className="h-4 w-4" />; })()}
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Part 2: Contact details */}
          <div className="border-t border-white/10 mt-10 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Address */}
              <div className="flex items-start gap-3">
                {(() => { const I = Icons.address; return <I className="h-5 w-5 text-primary-300 mt-1" />; })()}
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-gray-300">123 Fashion Ave, Lagos, NG</div>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-3">
                {(() => { const I = Icons.email; return <I className="h-5 w-5 text-primary-300 mt-1" />; })()}
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:support@modella.app" className="text-gray-300 hover:text-white transition-colors">support@modella.app</a>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-3">
                {(() => { const I = Icons.phone; return <I className="h-5 w-5 text-primary-300 mt-1" />; })()}
                <div>
                  <div className="font-semibold">Phone</div>
                  <a href="tel:+2348000000000" className="text-gray-300 hover:text-white transition-colors">+234 800 000 0000</a>
                </div>
              </div>
            </div>
          </div>

          {/* Part 3: Copyright */}
          <div className="border-t border-white/10 mt-8 pt-8">
            <p className="text-center text-gray-400 text-sm">Copyright of Modella, 2025. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}