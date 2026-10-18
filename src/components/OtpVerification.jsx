import { useState, useEffect } from 'react';
import api from '../services/api';

const OtpVerification = ({ email, onVerifySuccess }) => {
  const [step, setStep] = useState(1); // 1 = Send OTP, 2 = Verify OTP
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Timer for Resend OTP
  const [timer, setTimer] = useState(0);

  // Timer countdown logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      // Backend API Call to send OTP
      await api.post('/auth/send-otp', { email });
      
      setStep(2);
      setTimer(30); // 30 seconds resend timer
      setSuccessMsg(`OTP sent successfully to ${email}`);
    } catch (err) {
      setError("OTP bhejne mein error aaya. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP.");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Backend API Call to verify OTP
      const response = await api.post('/auth/verify-otp', { email, otp });
      
      // Check if backend returned success (adjust based on your backend response)
      if (response.data.success || response.status === 200) {
        setSuccessMsg("OTP Verified Successfully!");
        // Thodi der baad parent component ko success signal bhejenge
        setTimeout(() => {
          onVerifySuccess();
        }, 1000);
      } else {
        setError("Invalid OTP. Please check and try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP ya OTP expire ho gaya hai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', maxWidth: '400px' }}>
      <h3 style={{ marginTop: 0, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🔒 Security Verification Required
      </h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
        To edit your profile details, please verify your identity. We will send a One-Time Password (OTP) to <strong>{email}</strong>.
      </p>

      {/* Success Message */}
      {successMsg && (
        <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>
          {successMsg}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {/* Step 1: Send Button */}
      {step === 1 && (
        <button 
          onClick={handleSendOtp} 
          disabled={loading} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: loading ? '#94a3b8' : '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            fontWeight: 'bold',
            fontSize: '15px'
          }}
        >
          {loading ? 'Sending OTP...' : 'Send OTP to Email'}
        </button>
      )}

      {/* Step 2: Enter OTP Form */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Enter 6-digit OTP" 
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} // Sirf numbers allow karega
            style={{ 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #cbd5e1', 
              letterSpacing: '4px', 
              textAlign: 'center', 
              fontSize: '20px', 
              fontWeight: 'bold',
              outline: 'none'
            }}
          />
          
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              padding: '12px', 
              backgroundColor: loading ? '#94a3b8' : '#10b981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              fontWeight: 'bold',
              fontSize: '15px'
            }}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          {/* Resend OTP Link */}
          <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
            Didn't receive OTP? 
            {timer > 0 ? (
              <span style={{ color: '#94a3b8', marginLeft: '5px' }}>Resend in {timer}s</span>
            ) : (
              <button 
                type="button" 
                onClick={handleSendOtp} 
                style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px' }}
              >
                Resend Now
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default OtpVerification;