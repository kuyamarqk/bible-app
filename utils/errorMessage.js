// ErrorMessage.js
import React from 'react';

const ErrorMessage = ({ error, successMessage }) => (
    <div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
);

export default ErrorMessage;
