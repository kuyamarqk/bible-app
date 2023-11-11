import React from 'react';

interface ErrorMessageProps {
    error: string;  // Specify the type as string or whatever type is appropriate
    successMessage: string;  // Specify the type as string or whatever type is appropriate
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, successMessage }) => {
    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default ErrorMessage;
