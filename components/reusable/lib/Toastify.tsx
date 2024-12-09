import { toast, ToastOptions, ToastTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastifyProps = {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  position?: ToastOptions['position'];
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: 'light' | 'dark' | 'colored';
  transition?: ToastTransition;
};

const Toastify = ({
  message,
  type,
  position = 'bottom-right',
  autoClose = 3000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = false,
  draggable = true,
  theme = 'dark',
  transition,
}: ToastifyProps) => {
  toast[type](message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    theme,
    transition,
  });
};
export default Toastify;
