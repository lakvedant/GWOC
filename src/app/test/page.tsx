'use client'
import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, Copy, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';

const LocalStorageToken = () => {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const getAndDecodeToken = () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setError('No token found in localStorage');
        setToken('');
        setDecodedToken(null);
        return;
      }

      setToken(storedToken);

      // Decode the JWT token (without verification)
      const tokenParts = storedToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        setDecodedToken(payload);
        setError('');
      } else {
        setError('Invalid token format');
      }
    } catch (err) {
      setError('Error decoding token');
      setDecodedToken(null);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  // Check for token on component mount
  useEffect(() => {
    getAndDecodeToken();
  }, []);

  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex gap-2">
        <button
          onClick={getAndDecodeToken}
          className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Token Data
        </button>

        {token && (
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copySuccess ? 'Copied!' : 'Copy Token'}
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 text-red-700 bg-red-100 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {token && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-4 text-green-700 bg-green-100 rounded-lg">
            <Check className="w-5 h-5" />
            <p>Token retrieved successfully!</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Raw Token:</h3>
            <pre className="whitespace-pre-wrap break-words text-sm p-2 bg-white rounded border">
              {token}
            </pre>
          </div>

          {decodedToken && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Decoded Token Payload:</h3>
              <pre className="whitespace-pre-wrap break-words text-sm p-2 bg-white rounded border">
                {JSON.stringify(decodedToken, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default LocalStorageToken;