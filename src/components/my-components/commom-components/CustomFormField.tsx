import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  label: string;
  value: string;
}

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  required?: boolean;
  placeholder?: string;
  label?: string;
  control: Control<T>;
  type?: "text" | "email" | "password" | "number" | "select";
  disabled?: boolean;
  className?: string;
  options?: SelectOption[];
}

export const CustomFormField = <T extends FieldValues>({
  name,
  label,
  required,
  control,
  placeholder,
  type = "text",
  disabled = false,
  className,
  options = [],
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>
            {label}
            {required && <span className="text-red-600">*</span>}
          </FieldLabel>

          {type === "select" ? (
            (() => {
              const selectedOption = options.find(
                (option) => option.value === String(field.value),
              );

              return (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <SelectTrigger id={name} aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder={placeholder ?? "Select"}>
                      {selectedOption?.label ?? placeholder ?? "Select"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            })()
          ) : (
            <Input
              {...field}
              type={type}
              disabled={disabled}
              className={className}
              placeholder={placeholder}
              id={name}
              aria-invalid={fieldState.invalid}
            />
          )}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
