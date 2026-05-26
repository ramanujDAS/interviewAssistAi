'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Zap, Brain, Mic, Target, Users, BarChart3, Clock } from 'lucide-react';

export default function Page() {
  type LoggedInUser = { username: string; access_token: string } | null;
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const handleLogin = async () => {
    setLoginSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });
      if (response.ok) {
        let data: any = {};
        try {
          data = await response.json();
        } catch (e) {}
        if (typeof data.access_token === 'string' && typeof data.username === 'string') {
          setLoggedInUser({ username: data.username, access_token: data.access_token });
          setShowLoginModal(false);
          localStorage.setItem("access_token", data.access_token);
          setShowRegisterModal(true)
          setLoginUsername("");
          setLoginPassword("");
        } else {
          alert("❌ Login failed: Invalid response from server.");
        }
      } else {
        alert(`❌ Login failed. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Connection error. Make sure your API server");
    } finally {
      setLoginSubmitting(false);
    }
  };
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerCountryCode, setRegisterCountryCode] = useState('+1');
  const [registerSubmitting, setRegisterSubmitting] = useState(false);

  const isValidEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const isValidPhone = (phoneValue: string) => {
    const phoneRegex = /^[0-9\s\-\+\(\)]{7,15}$/;
    return phoneRegex.test(phoneValue.replace(/\s/g, ''));
  };

  const isValidPassword = (passwordValue: string) => {
    return passwordValue.length >= 6;
  };

  const isValidUsername = (usernameValue: string) => {
    // Username should be 3-20 characters, alphanumeric and underscore/hyphen only
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(usernameValue);
  };

  const handleRegister = async () => {
    setRegisterSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: registerUsername,
          emailId: registerEmail,
          phone: registerCountryCode + registerPhone,
          password: registerPassword
        })
      });

      if (response.ok) {
        alert('✅ Registration successful! Check your email for verification link.');
        setShowRegisterModal(false);
        setRegisterUsername('');
        setRegisterEmail('');
        setRegisterPhone('');
        setRegisterPassword('');
        setRegisterCountryCode('+1');
      } else {
        alert(`❌ Registration failed. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setRegisterSubmitting(false);
    }
  };

  const handleNotifyUs = async () => {
    setIsSubmitting(true);
    try {
      // Use formResponse endpoint instead of viewform
      const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfELCxlkfcgyCs6u3kV3IubpZukfDvZg2bH_7V7LcVMzRfvdA/formResponse';
      
      const formData = new FormData();
      // Replace with your actual Google Form field IDs
      formData.append('entry.955636899', email); // Email field ID
      formData.append('entry.261195788', countryCode + phone); // Phone field ID

      const response = await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      setSubmitMessage('✅ Thank you! We will notify you soon.');
      setEmail('');
      setPhone('');
      setCountryCode('+1');
      setTimeout(() => setSubmitMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('❌ Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryCodes = [
    { code: '+1', country: 'US/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+33', country: 'France' },
    { code: '+49', country: 'Germany' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+61', country: 'Australia' },
    { code: '+55', country: 'Brazil' },
    { code: '+27', country: 'South Africa' },
    { code: '+82', country: 'South Korea' },
    { code: '+65', country: 'Singapore' },
    { code: '+60', country: 'Malaysia' },
    { code: '+66', country: 'Thailand' },
    { code: '+62', country: 'Indonesia' },
    { code: '+63', country: 'Philippines' },
    { code: '+64', country: 'New Zealand' },
    { code: '+31', country: 'Netherlands' },
    { code: '+46', country: 'Sweden' },
    { code: '+47', country: 'Norway' },
    { code: '+41', country: 'Switzerland' },
    { code: '+43', country: 'Austria' },
    { code: '+32', country: 'Belgium' },
    { code: '+45', country: 'Denmark' },
    { code: '+358', country: 'Finland' },
    { code: '+48', country: 'Poland' },
    { code: '+7', country: 'Russia' },
    { code: '+90', country: 'Turkey' },
    { code: '+20', country: 'Egypt' },
    { code: '+234', country: 'Nigeria' },
    { code: '+254', country: 'Kenya' },
    { code: '+1868', country: 'Trinidad & Tobago' },
    { code: '+52', country: 'Mexico' },
    { code: '+56', country: 'Chile' },
    { code: '+57', country: 'Colombia' },
    { code: '+54', country: 'Argentina' },
    { code: '+51', country: 'Peru' },
    { code: '+1876', country: 'Jamaica' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Mic size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">InterviewAI</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <a href="#benefits" className="hover:text-cyan-400 transition">Benefits</a>
            <a href="#pricing" className="hover:text-cyan-400 transition">Pricing</a>
          </div>
          <div className="flex gap-3">
            {loggedInUser ? (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
                  </svg>
                </div>
                <span className="font-semibold text-white text-sm">{loggedInUser.username}</span>
                <a
                  href="mailto:ramanuj3rd@gmail.com"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition text-sm whitespace-nowrap ml-2"
                >
                  Contact Us
                </a>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition text-sm whitespace-nowrap"
                >
                  Register
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-slate-800 border border-slate-600 px-5 py-2 rounded-lg font-semibold text-white hover:border-blue-400 hover:bg-slate-700/70 transition text-sm whitespace-nowrap ml-2"
                >
                  Login
                </button>
                <a
                  href="mailto:ramanuj3rd@gmail.com"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition text-sm whitespace-nowrap ml-2"
                >
                  Contact Us
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <span className="text-sm text-blue-300">🚀 Master Your Next Interview</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Your Realtime
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Interview Coach
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Practice, improve, and ace your interviews with real-time AI feedback, behavioral coaching, and personalized preparation strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {/* <button className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 flex items-center gap-2 justify-center">
                Start Free Trial <ArrowRight size={20} />
              </button> */}
              {/* <button 
                onClick={() => setShowRegisterModal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 flex items-center gap-2 justify-center">
                Register Now <ArrowRight size={20} />
              </button> */}
              <a href="#snapshots" className="border border-slate-600 px-8 py-4 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-800/50 transition flex items-center gap-2 justify-center">
                Watch Demo
              </a>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl hover:border-blue-500/50 transition">
              <Brain size={32} className="text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
              <p className="text-slate-400 text-sm">Real-time assessment of your responses with intelligent insights</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl hover:border-cyan-500/50 transition">
              <Mic size={32} className="text-cyan-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Voice Practice</h3>
              <p className="text-slate-400 text-sm">Practice speaking with voice recognition and articulation feedback</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl hover:border-blue-500/50 transition">
              <Target size={32} className="text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Personalized Path</h3>
              <p className="text-slate-400 text-sm">Custom learning journey based on your career goals and gaps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-slate-700/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to prepare for any interview</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Brain, title: 'AI-Powered Coaching', desc: 'Get instant feedback on your answers with AI-driven insights' },
              { icon: BarChart3, title: 'Performance Analytics', desc: 'Track your progress with detailed performance metrics' },
              { icon: Clock, title: '24/7 Availability', desc: 'Practice anytime, anywhere at your own pace' },
              { icon: Zap, title: 'Screenshot & Ask AI', desc: 'Capture screen snapshots and ask AI questions instantly' }
            ].map((feature, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-200">
                <feature.icon size={40} className="text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 border-y border-slate-700/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold">Why Choose InterviewAI?</h2>
              <p className="text-slate-400 text-lg">Transform your interview preparation with cutting-edge AI technology</p>
              
              {[
                'Practice unlimited mock interviews with AI interviewers',
                'Get real-time feedback on your responses and delivery',
                'Learn from detailed analytics on your performance',
                'Receive personalized tips based on your role and industry',
                'Track progress and celebrate milestones'
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <p className="text-slate-300">{benefit}</p>
                </div>
              ))}
            </div>
            <div className="relative h-96 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl"></div>
              <div className="text-center relative z-10">
                <Zap size={64} className="text-blue-400 mx-auto mb-4" />
                <p className="text-slate-400">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: 'Free', features: ['5 mock interviews/month', 'Basic analytics', 'Email support'] },
              { name: 'Pro', price: '$29', features: ['Unlimited interviews', 'Advanced analytics', 'Priority support', 'Video review'], highlight: true },
              { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Custom coaching', 'Dedicated support', 'API access'] }
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl border transition-all duration-200 p-8 ${
                plan.highlight 
                  ? 'bg-gradient-to-b from-blue-600/20 to-cyan-600/20 border-blue-500/50 md:scale-105' 
                  : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
              }`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-blue-400 mb-6">{plan.price}<span className="text-sm text-slate-400">/mo</span></p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex gap-2 text-slate-300">
                      <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.highlight 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/50' 
                    : 'border border-slate-600 hover:bg-slate-800'
                }`}>
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-slate-700/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-slate-400 mb-8">Join thousands of successful candidates who've used InterviewAI</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-slate-500 transition ${
                  email && !isValidEmail(email) 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-slate-700 focus:ring-blue-500'
                }`}
              />
              {email && !isValidEmail(email) && (
                <p className="text-red-400 text-xs mt-1">⚠️ Please enter a valid email address</p>
              )}
            </div>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                {countryCodes.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code} {item.country}
                  </option>
                ))}
              </select>
              <div className="flex-1">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-slate-500 transition ${
                    phone && !isValidPhone(phone) 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-700 focus:ring-blue-500'
                  }`}
                />
                {phone && !isValidPhone(phone) && (
                  <p className="text-red-400 text-xs mt-1">⚠️ Phone must be 7-15 digits</p>
                )}
              </div>
            </div>
            <button 
              onClick={handleNotifyUs}
              disabled={!isValidEmail(email) || !isValidPhone(phone) || isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Submitting...' : 'Get the app build on mail for trail'}
            </button>
          </div>
          {submitMessage && (
            <div className="mt-4 text-center text-sm font-semibold">
              {submitMessage}
            </div>
          )}
        </div>
      </section>

      {/* Image Snapshot Section */}
      <section id="snapshots" className="py-20 px-6 border-t border-slate-700/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">See InterviewAI in Action</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Get a glimpse of our powerful interview coaching platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Real-time Feedback Screen', desc: 'Get instant insights on your interview performance', image: '/feedback.jpeg' },
              { title: 'Interview Session Screen Interviewer will see', desc: 'Go with AI-powered mock interviews', image: '/interview.png' }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 aspect-video flex items-center justify-center hover:border-blue-500/50 transition-all duration-300 cursor-pointer group-hover:shadow-xl group-hover:shadow-blue-500/20">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300 hidden" id={`placeholder-${i}`}>
                    <div className="relative z-10 text-center h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">📸</span>
                        </div>
                        <p className="text-slate-400 text-sm">Screenshot {i + 1}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                <p className="text-slate-400 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-6">Ready to experience it yourself?</p>
            {/* <a href="https://apps.apple.com/app/interviewai" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 inline-block">
              Download macOS App
            </a> */}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 px-6 border-t border-slate-700/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-slate-400 mb-12">Have questions or need support? We'd love to hear from you!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Email */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0v-1.5a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25v1.5m19.5 0h-1.5V9m-1.5-2.25h-2.25a2.25 2.25 0 00-2.25 2.25v1.5m4.5 0a2.25 2.25 0 002.25-2.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a href="mailto:ramanuj3rd@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition">ramanuj3rd@gmail.com</a>
            </div>

            {/* Address */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Office Address</h3>
              <p className="text-slate-300">Casa Imperia Flat No- B2-406<br />Pune - 411057</p>
            </div>


          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/30 py-12 px-6 text-center text-slate-400">
        <div className="max-w-6xl mx-auto">
          <p className="mb-4">© 2026 InterviewAI. All rights reserved.</p>
          <div className="mb-6 text-sm">
            <p className="font-semibold text-white mb-2">Office Address</p>
            <p>Casa Imperia Flat No- B2-406, Pune - 411057</p>
          </div>
          <div className="flex gap-6 justify-center text-sm">
            <a href="#" className="hover:text-cyan-400 transition">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition">Contact</a>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Login</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Username</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500 transition"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!loginUsername || !loginPassword || loginSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white mt-6"
              >
                {loginSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Register</h2>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">Username</label>
                <input
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  placeholder="3-20 characters, letters, numbers, _, -"
                  className={`w-full bg-slate-700/50 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-slate-500 transition ${
                    registerUsername && !isValidUsername(registerUsername)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-blue-500'
                  }`}
                />
                {registerUsername && !isValidUsername(registerUsername) && (
                  <p className="text-red-400 text-xs mt-1">⚠️ Username must be 3-20 characters (letters, numbers, _, -)</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full bg-slate-700/50 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-slate-500 transition ${
                    registerEmail && !isValidEmail(registerEmail)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-blue-500'
                  }`}
                />
                {registerEmail && !isValidEmail(registerEmail) && (
                  <p className="text-red-400 text-xs mt-1">⚠️ Please enter a valid email</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    value={registerCountryCode}
                    onChange={(e) => setRegisterCountryCode(e.target.value)}
                    className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="Phone number"
                    className={`flex-1 bg-slate-700/50 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-slate-500 transition ${
                      registerPhone && !isValidPhone(registerPhone)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-slate-600 focus:ring-blue-500'
                    }`}
                  />
                </div>
                {registerPhone && !isValidPhone(registerPhone) && (
                  <p className="text-red-400 text-xs mt-1">⚠️ Phone must be 7-15 digits</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={`w-full bg-slate-700/50 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-slate-500 transition ${
                    registerPassword && !isValidPassword(registerPassword)
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-slate-600 focus:ring-blue-500'
                  }`}
                />
                {registerPassword && !isValidPassword(registerPassword) && (
                  <p className="text-red-400 text-xs mt-1">⚠️ Password must be at least 6 characters</p>
                )}
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                disabled={
                  !isValidUsername(registerUsername) ||
                  !isValidEmail(registerEmail) || 
                  !isValidPhone(registerPhone) || 
                  !isValidPassword(registerPassword) || 
                  registerSubmitting
                }
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-white mt-6"
              >
                {registerSubmitting ? 'Registering...' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
