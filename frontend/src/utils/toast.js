import { toast } from 'react-toastify';

const defaultOptions = {
  position: 'bottom-right',
};

export const showSuccess = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const showError = (message, options = {}) => {
  toast.error(message, { ...defaultOptions, autoClose: 3000, ...options });
};

export const showInfo = (message, options = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const showWarning = (message, options = {}) => {
  toast.warn(message, { ...defaultOptions, ...options });
};

/**
 * Extract error message from an API error response.
 */
export const getErrorMessage = (error, fallback = 'Something went wrong') => {
  return error?.response?.data?.message || error?.message || fallback;
};
