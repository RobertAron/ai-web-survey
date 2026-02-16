"use client";
import { FormSubmit } from "@/CommonComponents";
import { OnAScale } from "@/OnAScale";
import { useAsyncAction } from "@/useAsyncAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

const formTemplate = z.object({
  biasDetection: z.record(z.string()),
  biasDirection: z.record(z.string()),
  knowledge: z.record(z.string()),
  aiEducation: z.record(z.string()),
  aiUse: z.record(z.string()),
  aiTrust: z.record(z.string()),
  manipulationCheck: z.record(z.string()),
});

export function Form({ warningMessage }: { warningMessage: string }) {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<
    z.infer<typeof formTemplate>
  >({
    resolver: zodResolver(formTemplate),
  });

  const biasAnswer = useWatch({
    control,
    name: "biasDetection.group-bias-detection",
  });
  const showBiasDirection =
    biasAnswer === "Likely Yes" || biasAnswer === "Definitely Yes";

  const onSubmit: Parameters<typeof handleSubmit>[0] = async (d) =>
    fetch("/step-10/api", {
      method: "POST",
      body: JSON.stringify(d),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  const { execute, isLoading } = useAsyncAction(onSubmit, {
    keepLoadingOnSuccess: true,
  });

  const trustResponses = [
    "1: Not at all",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7: Extremely",
  ];

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(execute)}>
      <OnAScale
        register={register}
        sectionKey="biasDetection"
        responses={[
          "Definitely No",
          "Likely No",
          "Likely Yes",
          "Definitely Yes",
        ]}
        statements={[
          {
            id: "group-bias-detection",
            label:
              "Do you feel like the AI model you interacted with was politically biased in any way?",
          },
        ]}
      />
      {showBiasDirection && (
        <OnAScale
          register={register}
          sectionKey="biasDirection"
          responses={[
            "Very Liberal",
            "Somewhat Liberal",
            "Somewhat Conservative",
            "Very Conservative",
          ]}
          statements={[
            {
              id: "group-bias-direction",
              label: "If yes, which direction?",
            },
          ]}
        />
      )}
      <OnAScale
        register={register}
        sectionKey="knowledge"
        responses={[
          "I know much less than most",
          "I know a little less than most",
          "I know about the same as most",
          "I know more than most",
          "I know much more than most",
        ]}
        statements={[
          {
            id: "group-ai-knowledge",
            label:
              "Compared to the general public, how knowledgeable are you with AI models?",
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="aiEducation"
        responses={[
          "None",
          "Casual exposure (e.g., reading articles, watching videos)",
          "Some formal education (e.g., a course or lecture)",
          "Extensive formal education (e.g., working toward or earning a related degree)",
        ]}
        statements={[
          {
            id: "group-ai-education",
            label:
              "What level of education or exposure have you had to AI?",
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="aiUse"
        responses={[
          "I never use AI",
          "I use it every now and then",
          "I use it once or twice a week",
          "I use it almost everyday",
        ]}
        statements={[
          {
            id: "group-ai-use",
            label: "How much do you use AI in your daily life?",
          },
        ]}
      />
      <OnAScale
        register={register}
        sectionKey="aiTrust"
        responses={trustResponses}
        statements={[
          {
            id: "group-ai-trust-1",
            label:
              "How much do you agree with this statement: I am confident in the AI assistant I interacted with in this study.",
          },
          {
            id: "group-ai-trust-2",
            label:
              "How much do you agree with this statement: The AI assistant I interacted with in this study is reliable.",
          },
          {
            id: "group-ai-trust-3",
            label:
              "How much do you agree with this statement: I can trust the AI assistant I interacted with in this study.",
          },
        ]}
      />
      <ManipulationCheck register={register} warningMessage={warningMessage} />
      <FormSubmit type="submit" isLoading={isLoading}>
        Next
      </FormSubmit>
    </form>
  );
}

function ManipulationCheck({
  register,
  warningMessage,
}: {
  register: ReturnType<typeof useForm<z.infer<typeof formTemplate>>>["register"];
  warningMessage: string;
}) {
  const registerKey = "manipulationCheck.group-manipulation-check";
  const { onChange, ...restRegister } = register(registerKey);

  const decoyOptions = [
    "CAUTION: AI responses may sound confident even when they are incorrect.",
    "CAUTION: AI outputs should be verified with trusted sources.",
    "CAUTION: AI responses may vary depending on how a question is asked.",
  ];

  const options = [...decoyOptions, warningMessage];

  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="font-semibold text-xl">
        Which warning was shown on the top portion of each of the AI models you
        interacted with?
      </legend>
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
          {options.map((option) => {
            const uniqueID = `manipulation-${option}`;
            return (
              <Label
                className="flex items-center text-lg gap-1"
                htmlFor={uniqueID}
                key={uniqueID}
              >
                <RadioGroupItem id={uniqueID} value={option} />
                <span className="font-normal">{option}</span>
              </Label>
            );
          })}
        </div>
      </RadioGroup>
    </fieldset>
  );
}
