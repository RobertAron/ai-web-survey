import { Main, PageTitle } from "@/CommonComponents";
import React from "react";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export default async function Home() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle title="Consent Form" subtitle="Information about the study:" />
      <p>
        Thank you for agreeing to take part in our survey. In this survey you
        will be asked to interact with AI systems to fulfill two different task.
        Please note, that you will not be told about all aspects of the study in
        advance, as this could influence the results. However, a debriefing will
        be included at the end of the study.
      </p>
      <H3>Time Commitment:</H3>
      <p>
        The task takes around 15 minutes. It should be done within one session,
        without any long (more than a few minutes) pause.
      </p>
      <H3>Rights:</H3>
      <p>
        You can stop participating in the study at any time without giving a
        reason by closing this webpage.
      </p>
      <H3>Technical Requirements</H3>
      <p className="[&>kbd]:border [&>kbd]:border-b-2 [&>kbd]:border-gray-400 [&>kbd]:bg-gray-200 [&>kbd]:p-0.5 [&>kbd]:rounded-sm ">
        This experiment should be completed on a regular desktop computer. We
        strongly recommend using <i>Google Chrome or Mozilla Firefox browser</i>{" "}
        for this test.
      </p>
      <H3>Anonymity and Privacy:</H3>
      <p>
        The results of the study are to be used and published for research
        purposes. The data do not provide any information about you personally.
        Your identity will be kept strictly confidential.
      </p>
      <H3>Consent:</H3>
      <p>{`By pressing the "Consent & Continue" button, you declare that you have read and understood the information above. You confirm that you will be concentrating on the task and complete it to the best of your abilities.`}</p>
      <p><b>**Please enter your unique Prolific ID before continuing.**</b> </p>      
      <Form />
    </Main>
  );
}
