import { FormSubmit, Main, PageTitle } from "@/CommonComponents";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { deleteUserData } from "@/deleteUserData";
import { cn } from "@/lib/utils";
import { redirectCheck } from "@/redirectCheck";
import { redirect } from "next/navigation";
import React from "react";

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export default async function Home() {
  await redirectCheck();
  async function onDelete(_formData: FormData) {
    "use server";
    console.log("on server?");
    await deleteUserData();
    redirect(`/`);
  }
  return (
    <Main>
      <PageTitle title="Debriefing Form for Participation in a Research Study University of Washington" />
      <p>
        Thank you for your participation in our study! Your participation is
        greatly appreciated!
      </p>
      <H3>Purpose of the Study</H3>
      <p>
        Earlier in our consent form we did not tell you the aim of our study but
        that we would be using deception as part of our experiment. Our study is
        about how biased modern AI models can potentially influence humans. In
        Task 1 and 2, we instructed the models to generate text which was either
        leaning toward a United States Republican or a United States Democrat.
        We were interested in how these bias models could change the opinions of
        the participants.
      </p>
      <p>
        Unfortunately, to properly test our hypothesis, we could not provide you
        with all these details prior to your participation. This ensures that
        your reactions in this study were spontaneous and not influenced by
        prior knowledge about the purpose of the study. We again note that the
        models from Task 1 and Task 2 were altered to generate bias (and
        potentially false) information. If we had told you the actual purposes
        of our study, your ability to accurately rank your opinions could have
        been affected. We regret the deception, but we hope you understand the
        reason for it.
      </p>
      <H3>Confidentiality</H3>
      <p>
        Please note that although the purpose of this study was not revealed
        until now, everything on the consent form is correct. This includes the
        ways in which we will keep your data confidential.
      </p>
      <p>
        Now that you know the true purpose of our study and are fully informed,
        you may decide that you do not want your data used in this research. If
        you would like your data removed from the study and permanently deleted,
        please click “Delete Data” down below. Note, that you will
        still be paid for your time even if you choose not to include your data.
      </p>
      <p>
        Please do not disclose research procedures and/or hypotheses to anyone
        who might participate in this study in the future as this could affect
        the results of the study.
      </p>
      <H3>Useful Contact Information</H3>
      <p>
        If you have any questions or concerns regarding this study, its purpose,
        or procedures, or if you have a research-related problem, please feel
        free to contact the researcher(s), Jillian Fisher (jrfish@uw.edu). If
        you have any questions concerning your rights as a research subject, you
        may contact the University of Washington Human Subject Division (HSD) at
        (206) 543 – 0098 or hsdinfo@uw.edu.
      </p>
      <p>
        If you feel upset after having completed the study or find that some
        questions or aspects of the study triggered distress, talking with a
        qualified clinician may help.
      </p>
      <p className="underline font-semibold">
        *** Once again, thank you for your participation in this study! ***
      </p>
      <div className="flex flex-col gap-2">
      <a
          className={cn(buttonVariants(), "cursor-pointer")}
          href="https://app.prolific.com/submissions/complete?cc=CSZBEP6O"
        >
          Submit Survey
        </a>
        <AlertDialog>
          <AlertDialogTrigger className="underline text-gray-700/90">
            Delete Data
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your submissions</AlertDialogTitle>
              <AlertDialogDescription>
                <b>Reminder: all information is private an completely anonymized.</b> Are you sure you want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex">
              <AlertDialogCancel className="grow" autoFocus>
                Cancel
              </AlertDialogCancel>
              <form action={onDelete} onSubmit={() => window.location.href = "https://app.prolific.com/submissions/complete?cc=CSZBEP6O"}>
                <FormSubmit className="bg-red-600 w-[unset]" type="submit">
                  Delete My Data
                </FormSubmit>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Main>
  );
}
