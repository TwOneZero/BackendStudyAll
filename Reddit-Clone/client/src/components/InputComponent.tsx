import React from 'react';
import cls from 'classnames';
/**
 * 인터페이스로 타입을 지정해놓음
 */
interface InputComponentProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  className = 'mb-2',
  type = 'text',
  placeholder = '',
  error,
  value,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        style={{ minWidth: 300 }}
        className={cls(
          `w-full p-3 transition duration-200 border border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white`,
          {
            'border-red-500': error,
          }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className='font-midium text-red-500'>{error}</small>
    </div>
  );
};
