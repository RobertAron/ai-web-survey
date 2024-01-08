type OnAScaleProps = {
  responses: string[];
  statements: string[];
};

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

export function OnAScale(props: OnAScaleProps) {
  return props.statements.map((statement) => (
    <fieldset key={statement}>
      <legend className="font-semibold text-xl">{statement}</legend>
      <RadioGroup>
        <div className="grid gap-1">
          {props.responses.map((response) => {
            const uniqueID = `${statement}-${response}`;
            return (
              <Label
                className="flex items-center text-lg gap-1"
                htmlFor={uniqueID}
                key={uniqueID}
              >
                <RadioGroupItem id={uniqueID} value={response} />
                <span>{response}</span>
              </Label>
            );
          })}
        </div>
      </RadioGroup>
    </fieldset>
  ));
}
