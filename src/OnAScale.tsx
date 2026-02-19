"use client";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Path, UseFormRegister } from "react-hook-form";

type KeysThatMapToRecord<T> = {
  [K in keyof T]: T[K] extends Record<string, any> ? K : never;
}[keyof T];

type OnAScaleProps<
  TFormValues extends Record<string, any>,
  TSectionKey extends KeysThatMapToRecord<TFormValues>
> = {
  responses: string[];
  statements: { label: string; id: string }[];
  sectionKey: TSectionKey;
  register: UseFormRegister<TFormValues>;
};

export function OnAScale<
  TFormValues extends Record<string, any>,
  TSectionKey extends KeysThatMapToRecord<TFormValues>
>(props: OnAScaleProps<TFormValues, TSectionKey>) {
  return props.statements.map((statement) => {
    const registerKey = `${props.sectionKey as string}.${statement.id}` as Path<TFormValues>;
    const { onChange, ...restRegister } = props.register(registerKey);
    return (
      <fieldset key={statement.id} className="flex flex-col gap-1">
        <legend className="font-semibold text-xl">{statement.label}</legend>
        <RadioGroup
          onValueChange={(val) =>
            onChange({
              target: { name: registerKey, value: val },
            })
          }
          required
          {...restRegister}
        >
          <div className="grid gap-1">
            {props.responses.map((response) => {
              const uniqueID = `${statement.id}-${response}`;
              return (
                <Label
                  className="flex items-center text-lg gap-1"
                  htmlFor={uniqueID}
                  key={uniqueID}
                >
                  <RadioGroupItem id={uniqueID} value={response} />
                  <span className="font-normal">{response}</span>
                </Label>
              );
            })}
          </div>
        </RadioGroup>
      </fieldset>
    );
  });
}
