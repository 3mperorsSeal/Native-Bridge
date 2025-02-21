import { Field, FieldAttributes } from 'formik';
import { ChangeEvent, InputHTMLAttributes } from 'react';

export function TextField({ classes, ...props }: FieldAttributes<{ classes: string }>) {
  return <Field className={`${defaultInputClasses} ${classes}`} {...props} />;
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (v: string) => void;
  classes?: string;
};

export function TextInput({ onChange, classes, ...props }: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e?.target?.value || '');
  };
  return (
    <input
      type="text"
      autoComplete="off"
      onChange={handleChange}
      className={`${defaultInputClasses} ${classes}`}
      {...props}
    />
  );
}

const defaultInputClasses = ' text-sm  outline-none  bg-black text-white';
