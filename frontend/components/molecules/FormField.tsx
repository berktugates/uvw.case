import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { FormFieldProps, FormFieldSelectProps } from '@/types';

const isSelectField = (props: FormFieldProps): props is FormFieldSelectProps => {
  return 'options' in props;
};

export const FormField = (props: FormFieldProps) => {
  const { id, label, required = false, error } = props;

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="mt-1">
        {isSelectField(props) ? (
          <Select
            id={id}
            value={props.value}
            onChange={props.onChange}
            options={props.options}
            placeholder={props.placeholder}
            required={required}
          />
        ) : (
          <Input
            id={id}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={required}
            min={props.min}
            max={props.max}
            minLength={props.minLength}
          />
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

