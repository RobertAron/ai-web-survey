import { Main, MyLink, PageTitle } from "@/CommonComponents";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export default function Home() {
  return (
    <Main>
      <PageTitle title="Consent Form" subtitle="Information about the study:" />
      <H3>Aim:</H3>
      <p>In the present experiment, we examine...</p>
      <H3>Time Commitment:</H3>
      <p>
        The task takes around _ minutes. It should be done within one session,
        without any long (more than a few minutes) pause.
      </p>
      <H3>Rights:</H3>
      <p>
        You can stop participating in the study at any time without giving a
        reason (by closing or refreshing this website).
      </p>
      <H3>Technical Requirements</H3>
      <p className="[&>kbd]:border [&>kbd]:border-b-2 [&>kbd]:border-gray-400 [&>kbd]:bg-gray-200 [&>kbd]:p-0.5 [&>kbd]:rounded-sm ">
        This experiment should be completed on a regular desktop computer. We
        strongly recommend using Google Chrome or Mozilla Firefox browser for
        this test. Before starting, please switch the browser to fullscreen mode
        press <kbd>F11</kbd> or on mac <kbd>Ctrl</kbd>+ <kbd>Command</kbd> +{" "}
        <kbd>F</kbd>, otherwised it will be switched autmatically following you
        consent. The fullscreen mode should be kept throughout the response time
        experiment (otherwise you get a warning and can only continue after
        switching back to fullscreen).
      </p>
      <H3>Anonymity and Privacy:</H3>
      <p>
        The results of the study are to be used and published for research
        purposes. The data do not provide any information about you personally.
        Your identity will be kept strictly confidential.
      </p>
      <H3>Content:</H3>
      <p>{`By pressing the "Consent & Continue" button, you declare that you have read and understood the information above. You confirm that you will be concentrating on the task and complete it to the best of your abilities.`}</p>
      <MyLink href="/step-1">
        Consent & Continue
      </MyLink>
    </Main>
  );
}
