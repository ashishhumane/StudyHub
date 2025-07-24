import { BookOpen, MessageCircle, FileText, Zap, Users, Shield, ArrowRight, Star } from 'lucide-react';
import { Link } from "react-router"

function Landing({}) {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold text-zinc-800">StudyHub</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-zinc-800 hover:text-blue-600 transition-colors">Features</a>
                            <a href="#how-it-works" className="text-zinc-800 hover:text-blue-600 transition-colors">How it Works</a>
                            {/* <a href="#pricing" className="text-zinc-800 hover:text-blue-600 transition-colors">Pricing</a> */}
                            <div className="flex items-center space-x-3">
                                <Link to='/auth'  className="text-zinc-800 hover:text-blue-600 transition-colors font-medium">
                                    Login
                                </Link>
                                <Link to='/auth' className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="text-zinc-800 hover:text-blue-600">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
                            <Star className="h-4 w-4 mr-2" />
                            AI-Powered Study Assistant
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-zinc-800 mb-6">
                            Transform Your Learning with
                            <span className="text-blue-600 block">StudyHub</span>
                        </h1>
                        <p className="text-xl text-zinc-600 mb-8 max-w-3xl mx-auto">
                            Create intelligent notes, get AI-powered summaries, and chat with your study materials.
                            The ultimate platform for students who want to learn smarter, not harder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to='/auth' className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg">
                                Start Learning Free
                                <ArrowRight className="inline h-5 w-5 ml-2" />
                            </Link>
                            <button className="border-2 border-gray-300 text-zinc-800 px-8 py-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all font-semibold text-lg">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-zinc-800 mb-4">
                            Everything You Need to Excel
                        </h2>
                        <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                            Powerful features designed to enhance your learning experience and boost your academic performance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Smart Notes */}
                        <div className="bg-gray-200 rounded-xl p-8 hover:shadow-lg transition-all transform hover:-translate-y-1">
                            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-800 mb-4">Smart Notes</h3>
                            <p className="text-zinc-600 mb-6">
                                Create and organize your notes with our intelligent editor. Auto-formatting,
                                tagging, and smart search make finding information effortless.
                            </p>
                            <ul className="text-zinc-600 space-y-2">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                    Rich text editing
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                    Auto-organization
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                    Smart search
                                </li>
                            </ul>
                        </div>

                        {/* AI Summarization */}
                        <div className="bg-gray-200 rounded-xl p-8 hover:shadow-lg transition-all transform hover:-translate-y-1">
                            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <Zap className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-800 mb-4">AI Summarization</h3>
                            <p className="text-zinc-600 mb-6">
                                Get instant summaries of your readings, lectures, and notes. Our AI understands
                                context and extracts key concepts automatically.
                            </p>
                            <ul className="text-zinc-600 space-y-2">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                                    Instant summaries
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                                    Key concept extraction
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                                    Multiple formats
                                </li>
                            </ul>
                        </div>

                        {/* AI Chat */}
                        <div className="bg-gray-200 rounded-xl p-8 hover:shadow-lg transition-all transform hover:-translate-y-1">
                            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                <MessageCircle className="h-6 w-6 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-800 mb-4">AI Study Chat</h3>
                            <p className="text-zinc-600 mb-6">
                                Chat with your study materials! Ask questions, get explanations, and receive
                                personalized study recommendations from our AI tutor.
                            </p>
                            <ul className="text-zinc-600 space-y-2">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                                    Interactive Q&A
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                                    Personalized help
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                                    Study recommendations
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-zinc-800 mb-4">
                            How StudyHub Works
                        </h2>
                        <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                            Get started in minutes and transform your study routine with our simple three-step process.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-blue-600">1</span>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-800 mb-4">Create & Upload</h3>
                            <p className="text-zinc-600">
                                Create notes directly in StudyHub or upload your existing study materials,
                                PDFs, and documents to get started.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-green-600">2</span>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-800 mb-4">AI Processing</h3>
                            <p className="text-zinc-600">
                                Our AI analyzes your content, creates summaries, identifies key concepts,
                                and prepares it for interactive learning.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-purple-600">3</span>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-800 mb-4">Learn & Chat</h3>
                            <p className="text-zinc-600">
                                Study with AI-generated summaries and chat with your materials to deepen
                                your understanding and ace your exams.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                            <div className="text-zinc-600">Active Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">1M+</div>
                            <div className="text-zinc-600">Notes Created</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                            <div className="text-zinc-600">Improved Grades</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                            <div className="text-zinc-600">AI Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Learning?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of students who are already studying smarter with StudyHub.
                    </p>
                    <Link to='/auth' className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg">
                        Start Your Free Trial
                        <ArrowRight className="inline h-5 w-5 ml-2" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <BookOpen className="h-8 w-8 text-blue-400" />
                                <span className="text-2xl font-bold">StudyHub</span>
                            </div>
                            <p className="text-gray-400">
                                Empowering students with AI-powered learning tools for academic success.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 StudyHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;