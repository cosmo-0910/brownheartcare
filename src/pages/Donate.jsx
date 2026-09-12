import React, { useState } from 'react';

export default function Donate({ setCurrentPage, onAddDonation }) {
  const [currency, setCurrency] = useState('NGN'); // 'NGN' or 'USD'
  const [frequency, setFrequency] = useState('one-time');
  const [selectedPreset, setSelectedPreset] = useState(25000);
  const [customAmount, setCustomAmount] = useState('');

  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'card'
  });
  const [donated, setDonated] = useState(false);

  // Contact form state on Donate page
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: 'donation_receipt',
    message: ''
  });

  const navTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const presetsUSD = [25, 50, 100, 250];
  const presetsNGN = [10000, 25000, 50000, 100000];

  const presets = currency === 'NGN' ? presetsNGN : presetsUSD;

  const currentAmount = customAmount ? Number(customAmount) : selectedPreset;

  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr);
    setCustomAmount('');
    if (newCurr === 'NGN') {
      setSelectedPreset(25000);
    } else {
      setSelectedPreset(50);
    }
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!currentAmount || currentAmount <= 0) return;

    if (onAddDonation) {
      onAddDonation({
        name: donorInfo.name || 'Anonymous Donor',
        email: donorInfo.email || 'donor@example.com',
        amount: currentAmount,
        currency: currency,
        method: donorInfo.paymentMethod === 'card' ? 'Online Card / Stripe' : 'Bank Transfer',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
    setDonated(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="pt-20 pb-20 animate-fadeIn font-sans bg-[#f9f9f9] text-[#1a1c1c]">
      <div className="max-w-[1100px] mx-auto px-4 py-10">
        {/* Top Grid: Hero Copy & Donation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#1a1c1c] tracking-tight">
              Your Gift Saves Hearts
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every contribution helps us provide nutritional stability and healthcare access to those who need it most. Together, we can build a healthier, more resilient community.
            </p>

            <div className="rounded-2xl overflow-hidden shadow-sm h-64 md:h-80 border border-gray-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF3tpnGHsFdJdmNNm3OM3gJaivPTcZg0SfZYxx0BUJydqSEKw4uxQrWM2Yo92CzsWFrMZAKCgQpIE43p0tSs2Gp0SNqJxIHGZ59TrmD22LN3e5Furl56eRWjYPuKjHipBl8ntmp10qxE-A_J51-mXBXNbE8QhM5rwZ_-8vg6qh6pcj2aaQJeMmskt5oZO92Q_dXGor8lKGXAf-stXzzFwKgDEo7Huga2FWWvYG-1W2b7SDhWy2ysHstQ" 
                alt="Volunteer checking beneficiary wellness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Secure Donation Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-t-4 border-[#b0004a] space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-xl text-[#1a1c1c]">Make a Secure Donation</h2>

              {/* NGN vs USD Currency Switcher */}
              <div className="flex bg-[#eee] rounded-full p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('NGN')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    currency === 'NGN' ? 'bg-[#b0004a] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ₦ NGN
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange('USD')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    currency === 'USD' ? 'bg-[#b0004a] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  $ USD
                </button>
              </div>
            </div>

            {!donated ? (
              <form onSubmit={handleDonateSubmit} className="space-y-6">
                {/* One-time vs Monthly Toggle */}
                <div className="flex bg-[#eee] rounded-full p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`flex-1 py-2.5 rounded-full transition-all ${
                      frequency === 'one-time' ? 'bg-white text-[#b0004a] shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-2.5 rounded-full transition-all ${
                      frequency === 'monthly' ? 'bg-white text-[#b0004a] shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                {/* Preset Amount Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {presets.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(val);
                        setCustomAmount('');
                      }}
                      className={`py-3 rounded-xl font-heading font-bold text-sm border transition-all ${
                        selectedPreset === val && !customAmount
                          ? 'border-[#b0004a] bg-[#ffd9de]/30 text-[#b0004a] scale-105'
                          : 'border-gray-200 text-gray-700 hover:border-[#b0004a]'
                      }`}
                    >
                      {currency === 'NGN' ? `₦${val.toLocaleString()}` : `$${val}`}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-base">
                    {currency === 'NGN' ? '₦' : '$'}
                  </span>
                  <input
                    type="number"
                    placeholder={`Custom Amount in ${currency}`}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-[#eee] border border-transparent rounded-xl py-3.5 pl-8 pr-4 text-sm font-semibold text-[#1a1c1c] focus:outline-none focus:border-[#b0004a] focus:bg-white"
                  />
                </div>

                {/* Impact Statement */}
                <div className="bg-[#ffd9de]/40 p-4 rounded-xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#b0004a] fill text-xl">favorite</span>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    Your {currency === 'NGN' ? `₦${currentAmount.toLocaleString()}` : `$${currentAmount}`} gift provides comprehensive heart screenings and emergency care.
                  </p>
                </div>

                {/* Donor Details */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <h3 className="font-heading font-bold text-xs text-gray-700 uppercase tracking-wider">Donor Info (Optional for Anonymous)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      className="bg-[#eee] py-2.5 px-3 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:border-[#b0004a]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="bg-[#eee] py-2.5 px-3 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                {/* Donate CTA Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#b0004a] text-white font-heading font-bold text-sm shadow-md hover:bg-[#90003b] transition-all flex items-center justify-center gap-2"
                >
                  <span>Donate {currency === 'NGN' ? `₦${currentAmount.toLocaleString()}` : `$${currentAmount}`} Now</span>
                  <span className="material-symbols-outlined text-base">volunteer_activism</span>
                </button>

                <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>256-Bit Encrypted Payment • Tax Deductible NGO</span>
                </p>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#ffd9de] text-[#b0004a] mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">verified</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#1a1c1c]">Thank You for Your Generosity!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Your gift of <strong>{currency === 'NGN' ? `₦${currentAmount.toLocaleString()}` : `$${currentAmount}`}</strong> has been successfully recorded. An official tax receipt is being sent to your email.
                </p>
                <button
                  onClick={() => setDonated(false)}
                  className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white text-xs font-bold"
                >
                  Make Another Donation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Direct Bank Transfer Account Details Section */}
        <section className="py-12 mb-16 bg-white rounded-3xl p-8 shadow-sm border-2 border-[#b0004a]/30 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="bg-[#ffd9de] text-[#b0004a] px-3 py-1 rounded-full text-xs font-bold">
                Official Direct Bank Transfer
              </span>
              <h2 className="font-heading font-bold text-2xl text-[#1a1c1c] mt-2">
                Donate via Direct Bank Account Transfer
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Prefer to make a direct bank transfer? Use our official foundation account details below.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#ffd9de]/50 text-[#b0004a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {/* Account Details Box 1: Lotus Bank */}
            <div className="bg-[#f9f9f9] p-6 rounded-2xl border border-gray-200 space-y-2 lg:col-span-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b0004a] bg-[#ffd9de] px-2.5 py-0.5 rounded">
                Official NGO Bank Account
              </span>
              <h4 className="font-heading font-bold text-xl text-gray-900 pt-1">Lotus Bank</h4>
              <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 pt-1">
                <p><strong>Account Name:</strong> <span className="text-gray-900 font-bold">Aina Esther Oluwatoyin</span></p>
                <p><strong>Account Number:</strong> <span className="font-mono font-bold text-xl text-[#b0004a] bg-white px-2 py-0.5 rounded border border-[#b0004a]/30 inline-block">1009761198</span></p>
                <p><strong>Bank Name:</strong> <span className="font-semibold text-gray-900">Lotus Bank</span></p>
              </div>
            </div>

            {/* Account Details Box 2: Confirmation Info */}
            <div className="bg-[#f9f9f9] p-6 rounded-2xl border border-gray-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-base text-gray-900">Payment Receipt Confirmation</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  After making your transfer, please send payment notification/receipt to <strong>brownheartcare@gmail.com</strong> or call/WhatsApp <strong>08136374060</strong>.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified_user</span> Official Verified Foundation Account
              </span>
            </div>
          </div>
        </section>


        {/* Where Your Money Goes Section */}
        <section className="py-16 border-t border-gray-200 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Where Your Money Goes</h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              We are committed to transparency and maximizing the impact of every dollar in alignment with global health and nutrition goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">Health & Nutrition Programs (SDG 2 & 3)</span>
                  <span className="text-[#b0004a] font-bold">85%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#b0004a] rounded-full w-[85%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">Community Outreach</span>
                  <span className="text-[#b0004a] font-bold">10%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full w-[10%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">Administration</span>
                  <span className="text-[#b0004a] font-bold">5%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-300 rounded-full w-[5%]"></div>
                </div>
              </div>
            </div>

            {/* SDG Impact Cards */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#ffd9de] text-[#b0004a] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <h4 className="font-heading font-bold text-base text-[#1a1c1c]">Zero Hunger</h4>
              <p className="text-gray-500 text-xs">
                Ensuring nutritional stability for vulnerable groups.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#ffd9de] text-[#b0004a] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>
              <h4 className="font-heading font-bold text-base text-[#1a1c1c]">Good Health</h4>
              <p className="text-gray-500 text-xs">
                Providing life-saving heart screenings and care.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Inquiry Section on Donate Page */}
        <section className="py-16 border-t border-gray-200 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Contact Donor Support</h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Have questions regarding tax receipts, corporate sponsorship, or wire transfer details?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Box */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#1a1c1c]">Foundation HQ</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Brown's Heart Care Foundation<br />
                  124 well-being Boulevard, Suite 400<br />
                  support District, NY 10021
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#1a1c1c]">Phone & Email</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Phone: +1 (800) 555-HEART<br />
                  Email: info@brownsheartcare.org
                </p>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">Send a Direct Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full bg-[#eee] border border-transparent rounded-xl py-2.5 px-3.5 text-xs text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full bg-[#eee] border border-transparent rounded-xl py-2.5 px-3.5 text-xs text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Inquiry Topic</label>
                    <select
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full bg-[#eee] border border-transparent rounded-xl py-2.5 px-3.5 text-xs text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                    >
                      <option value="donation_receipt">Tax Receipt & Donation Confirmation</option>
                      <option value="corporate">Corporate Sponsorship & Matching</option>
                      <option value="in_kind">In-Kind support Supply Donation</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can we assist you with your donation?"
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full bg-[#eee] border border-transparent rounded-xl py-2.5 px-3.5 text-xs text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-[#b0004a] text-white text-xs font-bold shadow-md hover:bg-[#90003b] transition-all"
                  >
                    Submit Inquiry
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#ffd9de] text-[#b0004a] mx-auto flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                  <h4 className="font-heading font-bold text-xl text-[#1a1c1c]">Message Sent</h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    Thank you, {contactData.name}. Our donor care team will respond to {contactData.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="mt-2 text-xs font-bold text-[#b0004a] underline"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer matching Image 4 */}
      <footer className="bg-[#e2e2e2] text-gray-700 py-8 border-t border-gray-300">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span className="font-bold text-[#b0004a] text-sm">Brown's Heart Care</span>
          <div className="flex flex-wrap gap-4 text-gray-600 font-medium">
            <button onClick={() => navTo('donate')} className="hover:underline">Privacy Policy</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Terms of Service</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Contact Us</button>
            <button onClick={() => navTo('donate')} className="hover:underline">NGO Disclosure</button>
          </div>
          <span className="text-gray-500">© 2024 Brown's Heart Care Foundation. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
