type OnAScaleProps = {
  responses: string[];
  statements: string[];
};

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

function TopicInput({ topic, options }: { topic: string; options: string[] }) {
  return (
    <>
      <Label
        className="text-lg font-semibold border-b p-2 text-start border-slate-500"
        htmlFor="topic1"
      >
        {topic}
      </Label>
      <RadioGroup
        className={`grid-cols-subgrid col-span-${options.length} border-b border-slate-500`}
        style={{
          gridColumn: `span ${options.length} / span ${options.length}`,
        }}
        defaultValue="never"
        id={`${topic}`}
      >
        {options.map((ele, index) => (
          <div className="flex m-auto items-center h-full w-full" key={ele}>
            <RadioGroupItem
              className="m-auto"
              id={`${topic}${index}`}
              value={`${index}`}
              aria-label={ele}
            />
          </div>
        ))}
      </RadioGroup>
    </>
  );
}

export function OnAScale(props: OnAScaleProps) {
  return (
    <div
      className={`grid`}
      style={{
        gridTemplateColumns: `300px repeat(${props.responses.length}, minmax(0, 1fr))`,
      }}
    >
      <div className="border border-slate-500 p-2 text-center">Topic</div>
      {props.responses.map((ele) => (
        <div className="border border-slate-500 p-2 text-center" key={ele}>
          {ele}
        </div>
      ))}
      {props.statements.map((ele) => (
        <TopicInput topic={ele} options={props.responses} key={ele} />
      ))}
    </div>
  );
}
