"use client";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { UseFormRegister } from "react-hook-form";

type ExtractPropertyKey<T> = T extends UseFormRegister<
  Record<infer Key, Record<string, any>>
>
  ? Key
  : never;
type OnAScaleProps<
  T extends UseFormRegister<Record<string, Record<string, any>>>
> = {
  responses: string[];
  statements: { label: string; id: string }[];
  sectionKey: ExtractPropertyKey<T>;
  register: T;
};

export function OnAScale<T extends UseFormRegister<any>>(
  props: OnAScaleProps<T>
) {
  return props.statements.map((statement) => {
    const registerKey = `${props.sectionKey as string}.${statement.id}`;
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
            {props.responses.map((response, index) => {
              const uniqueID = `${statement.id}-${response}`;
              return (
                <Label
                  className="flex items-center text-lg gap-1"
                  htmlFor={uniqueID}
                  key={uniqueID}
                >
                  <RadioGroupItem
                    id={uniqueID}
                    value={response}
                  />
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
