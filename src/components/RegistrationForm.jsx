import { useState } from 'react';

const RegistrationForm = () => {
  const [activeTab, setActiveTab] = useState('vendor');
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '', businessType: '', contactPerson: '', fullName: '',
    phoneNumber: '', businessEmail: '', businessAddress: '', fullBusinessAddress: '',
    firstName: '', lastName: '', bikePlateNumber: '', emailAddress: '',
    homeAddress: '', validIdType: '', preferredService: '',
    password: '', confirmPassword: '',
  });
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: '',
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\-\s]{10,}$/;

    if (isLogin) {
      if (!loginData.email.trim()) newErrors.email = 'Required';
      else if (!emailRegex.test(loginData.email)) newErrors.email = 'Invalid email';
      if (!loginData.password) newErrors.password = 'Required';
      if (!loginData.role) newErrors.role = 'Please select a role';
    } else {
      if (activeTab === 'vendor') {
        if (!formData.businessName.trim()) newErrors.businessName = 'Required';
        if (!formData.businessType.trim()) newErrors.businessType = 'Required';
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Required';
        if (!formData.fullName.trim()) newErrors.fullName = 'Required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
        else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone';
        if (!formData.businessEmail.trim()) newErrors.businessEmail = 'Required';
        else if (!emailRegex.test(formData.businessEmail)) newErrors.businessEmail = 'Invalid email';
        if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Required';
            } else if (activeTab === 'rider') {
        if (!formData.firstName.trim()) newErrors.firstName = 'Required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
        else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone';
        if (!formData.bikePlateNumber.trim()) newErrors.bikePlateNumber = 'Required';
        if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Required';
        else if (!emailRegex.test(formData.emailAddress)) newErrors.emailAddress = 'Invalid email';
        if (!formData.homeAddress.trim()) newErrors.homeAddress = 'Required';
        if (!formData.validIdType) newErrors.validIdType = 'Required';
      } else if (activeTab === 'customer') {
        if (!formData.firstName.trim()) newErrors.firstName = 'Required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Required';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
        else if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Invalid phone';
        if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Required';
        else if (!emailRegex.test(formData.emailAddress)) newErrors.emailAddress = 'Invalid email';
        if (!formData.homeAddress.trim()) newErrors.homeAddress = 'Required';
        if (!formData.preferredService) newErrors.preferredService = 'Required';
      }

      if (!formData.password) newErrors.password = 'Required';
      else if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        console.log('Login submitted:', loginData);
        alert(`Welcome back! Logging in as ${loginData.role}.`);
      } else {
        console.log('Registration submitted:', formData);
        alert('Registration successful! Welcome to RiderHive.');
      }
    }
  };

  const tabs = [
    { id: 'vendor', label: 'Vendor', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'rider', label: 'Rider', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'customer', label: 'Customer', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  const InputField = ({ label, name, type = "text", placeholder, value, error, required = true }) => (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={isLogin ? handleLoginChange : handleInputChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} 
          focus:border-[#1E9AE0] focus:ring-2 focus:ring-[#1E9AE0]/20 focus:bg-white transition-all duration-200 outline-none text-sm`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );

  const SelectField = ({ label, name, options, value, error, required = true }) => (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={isLogin ? handleLoginChange : handleInputChange}
        className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} 
          focus:border-[#1E9AE0] focus:ring-2 focus:ring-[#1E9AE0]/20 focus:bg-white transition-all duration-200 outline-none text-sm`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E9AE0]/30 via-white to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img 
            src={"/riderhive-logo.png"} 
            alt="RiderHive" 
            className="h-14 mx-auto mb-3"
          />
          <h1 className="text-3xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join the hive'}
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {isLogin ? 'Sign in to your account' : 'Pick your role and create your account'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
          {/* Sign Up / Log In Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button 
                onClick={() => { setIsLogin(false); setErrors({}); }}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  !isLogin 
                    ? 'bg-[#1E9AE0] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
              <button 
                onClick={() => { setIsLogin(true); setErrors({}); }}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  isLogin 
                    ? 'bg-[#1E9AE0] text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Log In
              </button>
            </div>
          </div>

          {/* Login Form */}
          {isLogin && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField 
                label="Email Address" 
                name="email" 
                type="email" 
                placeholder="your@email.com" 
                value={loginData.email} 
                error={errors.email} 
              />
              <InputField 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                value={loginData.password} 
                error={errors.password} 
              />
              <SelectField 
                label="Login As" 
                name="role" 
                options={['Vendor', 'Rider', 'Customer']} 
                value={loginData.role} 
                error={errors.role} 
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1E9AE0] focus:ring-[#1E9AE0]" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-[#1E9AE0] hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E9AE0] hover:bg-[#0D7AB8] text-white font-bold py-4 rounded-xl 
                  transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-[#1E9AE0]/25 mt-6 text-sm uppercase tracking-wide"
              >
                 log In
              </button>

              <p className="text-center text-xs text-gray-500 mt-6">
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => { setIsLogin(false); setErrors({}); }}
                  className="text-[#1E9AE0] hover:underline font-medium"
                >
                  Sign up here
                </button>
              </p>
            </form>
          )}

          {/* Registration Form */}
          {!isLogin && (
            <>
              {/* Tabs */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setErrors({}); }}
                    className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl border-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-[#1E9AE0] bg-[#1E9AE0]/5'
                        : 'border-gray-200 hover:border-[#1E9AE0]/50 bg-white'
                    }`}
                  >
                    <div className={`mb-2 ${activeTab === tab.id ? 'text-[#1E9AE0]' : 'text-gray-400'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                      </svg>
                    </div>
                    <span className={`font-semibold text-sm ${activeTab === tab.id ? 'text-[#1E9AE0]' : 'text-gray-600'}`}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {activeTab === 'vendor' && (
                  <>
                    <InputField label="Business Name" name="businessName" placeholder="Enter your business name" value={formData.businessName} error={errors.businessName} />
                    <InputField label="Business Type" name="businessType" placeholder="Restaurant, Retail, etc." value={formData.businessType} error={errors.businessType} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Contact Person" name="contactPerson" placeholder="Contact person name" value={formData.contactPerson} error={errors.contactPerson} />
                      <InputField label="Full Name" name="fullName" placeholder="Your full name" value={formData.fullName} error={errors.fullName} />
                    </div>
                    <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="+1 (555) 000-0000" value={formData.phoneNumber} error={errors.phoneNumber} />
                    <InputField label="Business Email" name="businessEmail" type="email" placeholder="business@example.com" value={formData.businessEmail} error={errors.businessEmail} />
                    <InputField label="Business Address" name="businessAddress" placeholder="Street address" value={formData.businessAddress} error={errors.businessAddress} />
                  </>
                )}

                {activeTab === 'rider' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="First Name" name="firstName" placeholder="First name" value={formData.firstName} error={errors.firstName} />
                      <InputField label="Last Name" name="lastName" placeholder="Last name" value={formData.lastName} error={errors.lastName} />
                    </div>
                    <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="+1 (555) 000-0000" value={formData.phoneNumber} error={errors.phoneNumber} />
                    <InputField label="Bike Plate Number" name="bikePlateNumber" placeholder="ABC 1234" value={formData.bikePlateNumber} error={errors.bikePlateNumber} />
                    <InputField label="Email Address" name="emailAddress" type="email" placeholder="rider@example.com" value={formData.emailAddress} error={errors.emailAddress} />
                    <InputField label="Home Address" name="homeAddress" placeholder="Your home address" value={formData.homeAddress} error={errors.homeAddress} />
                    <SelectField label="Valid ID Type" name="validIdType" options={['Driver\'s License', 'National ID', 'Passport', 'Voter\'s ID']} value={formData.validIdType} error={errors.validIdType} />
                  </>
                )}

                {activeTab === 'customer' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="First Name" name="firstName" placeholder="First name" value={formData.firstName} error={errors.firstName} />
                      <InputField label="Last Name" name="lastName" placeholder="Last name" value={formData.lastName} error={errors.lastName} />
                    </div>
                    <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="+1 (555) 000-0000" value={formData.phoneNumber} error={errors.phoneNumber} />
                    <InputField label="Email Address" name="emailAddress" type="email" placeholder="customer@example.com" value={formData.emailAddress} error={errors.emailAddress} />
                    <InputField label="Home Address" name="homeAddress" placeholder="Your delivery address" value={formData.homeAddress} error={errors.homeAddress} />
                    <SelectField label="Preferred Service" name="preferredService" options={['Grocery Shopping', 'Hive Wash', 'Both']} value={formData.preferredService} error={errors.preferredService} />
                  </>
                )}

                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Password" name="password" type="password" placeholder="••••••••" value={formData.password} error={errors.password} />
                    <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} error={errors.confirmPassword} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E9AE0] hover:bg-[#0D7AB8] text-white font-bold py-4 rounded-xl 
                    transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-[#1E9AE0]/25 mt-6 text-sm uppercase tracking-wide"
                >
                  Create Account
                </button>

                <p className="text-center text-xs text-gray-500 mt-6">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-[#1E9AE0] hover:underline font-medium">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#1E9AE0] hover:underline font-medium">Privacy Policy</a>
                </p>
              </form>
            </>
          )}
        </div>

        {/* Back to site link */}
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-gray-600 hover:text-[#1E9AE0] transition-colors flex items-center justify-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to site</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;