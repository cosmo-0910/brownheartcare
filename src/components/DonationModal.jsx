import React, { useState } from 'react';

export default function DonationModal({ isOpen, onClose }) {
  const [frequency, setFrequency] = useState('one-time');
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'card'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const presets = [25, 50, 100, 250];

  const getImpactMessage = (val) => {
    const num = Number(val) || 0;
    if (num < 30) return `Your $${num} gift provides essential heart health vitamins & nutrition for 2 children.`;
    if (num < 75) return `Your $${num} gift provides a comprehensive cardiac health screening & diagnostic test.`;
    if (num < 150) return `Your $${num} gift covers emergency heart medication for a patient in critical need.`;
    return `Your $${num} gift directly subsidizes life-saving cardiac procedure costs for low-income patients.`;
  };

  const currentAmount = customAmount ? Number(customAmount) : amount;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const resetAndClose = () => {
    setStep(1);
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-modal border-t-4 border-primary relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {!success ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined fill text-xl">favorite</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-on-surface">Make a Fast Donation</h3>
                <p className="text-xs text-secondary">Every dollar directly fuels our medical & food outreach.</p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-surface-container'}`}></div>
              <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-surface-container'}`}></div>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                {/* One-time vs Monthly Toggle */}
                <div className="flex bg-surface-container rounded-full p-1">
                  <button
                    onClick={() => setFrequency('one-time')}
                    className={`flex-1 py-2.5 rounded-full text-xs font-semibold transition-all ${
                      frequency === 'one-time'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    One-time Gift
                  </button>
                  <button
                    onClick={() => setFrequency('monthly')}
                    className={`flex-1 py-2.5 rounded-full text-xs font-semibold transition-all ${
                      frequency === 'monthly'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Monthly Pulse Supporter
                  </button>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-4 gap-2">
                  {presets.map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                      className={`py-3 rounded-xl font-heading font-bold text-sm transition-all border ${
                        amount === val && !customAmount
                          ? 'border-primary bg-primary/10 text-primary shadow-sm'
                          : 'border-outline-variant/60 text-on-surface-variant hover:border-primary hover:text-primary'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-secondary">$</span>
                  <input
                    type="number"
                    placeholder="Enter Custom Amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-surface-container border border-transparent rounded-xl py-3 pl-8 pr-4 text-sm font-medium text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                {/* Impact Statement */}
                <div className="bg-primary-fixed/30 p-3.5 rounded-xl flex items-start gap-3 border border-primary-fixed">
                  <span className="material-symbols-outlined text-primary fill text-lg mt-0.5">volunteer_activism</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                    {getImpactMessage(currentAmount)}
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!currentAmount || currentAmount <= 0}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-heading font-bold text-sm shadow-md hover:shadow-card-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>Continue to Donor Info (${currentAmount})</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-surface-container border border-transparent rounded-xl py-2.5 px-3.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Email Address (for tax receipt)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-surface-container border border-transparent rounded-xl py-2.5 px-3.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                        formData.paymentMethod === 'card'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-outline-variant/60 text-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">credit_card</span>
                      <span>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                        formData.paymentMethod === 'paypal'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-outline-variant/60 text-secondary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                      <span>PayPal / Wallet</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 rounded-full border border-secondary text-secondary font-semibold text-xs hover:bg-surface-container"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-heading font-bold text-sm shadow-md hover:shadow-card-hover transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-spin material-symbols-outlined text-base">progress_activity</span>
                    ) : (
                      <>
                        <span>Complete ${currentAmount} Donation</span>
                        <span className="material-symbols-outlined fill text-sm">lock</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">verified</span>
            </div>
            <h3 className="font-heading font-bold text-2xl text-on-surface">Thank You, {formData.name || 'Kind Supporter'}!</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
              Your donation of <strong className="text-primary">${currentAmount}</strong> has been successfully processed. A tax receipt has been sent to {formData.email}.
            </p>
            <button
              onClick={resetAndClose}
              className="mt-4 px-8 py-3 rounded-full bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-container transition-colors"
            >
              Close & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
