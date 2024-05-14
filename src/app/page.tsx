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
        Thank you for agreeing to take part in our study. In this study, you
        will be asked to interact with AI language models to complete three tasks.
        Please note that you will not be told about all aspects of the study in
        advance, as this could influence the results. However, a debriefing will
        be included at the end of the study.
      </p>
      <H3>Time Commitment:</H3>
      <p>
        The task will take about 12 minutes. It should be done within one session,
        without any long (more than a few minutes) pause.
      </p>
      <H3>Rights:</H3>
      <p>
        You can stop participating in this study at any time without giving a
        reason by closing this webpage.
      </p>
      <H3>Technical Requirements:</H3>
      <p className="[&>kbd]:border [&>kbd]:border-b-2 [&>kbd]:border-gray-400 [&>kbd]:bg-gray-200 [&>kbd]:p-0.5 [&>kbd]:rounded-sm ">
        This experiment should be completed on a regular desktop computer. We
        strongly recommend using <i>Google Chrome or the Mozilla Firefox browser</i>{" "}
        for this test.
      </p>
      <H3>Anonymity and Privacy:</H3>
      <p>
        The results of the study will be anonymized and published for research
        purposes. Your identity will be kept strictly confidential.
      </p>
      <H3>Consent:</H3>
      <p>{`By pressing the "Consent & Continue" button, you declare that you have read and understood the information above. You confirm that you will be concentrating on the task and complete it to the best of your abilities.`}</p>
      <p><b>**Please enter your unique Prolific ID before continuing.**</b> </p>      
      <Form />
    </Main>
  );
}
