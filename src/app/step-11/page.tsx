import { Main, PageTitle } from "@/CommonComponents";
import { redirectCheck } from "@/redirectCheck";
import React from "react";

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export default async function Home() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle
        title="De-brief"
        subtitle="Debriefing Form for Participation in a Research Study University of Washington"
      />
      <H3>Thank you for your participation!</H3>
      <hr />
      <p>
        Thank you for your participation in our study! Your participation is
        grealy appreciated.
      </p>
      <H3>Purpose of the Study</H3>
      <p>
        {" "}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem
        eros, luctus dapibus est ut, tristique tristique orci. Curabitur non
        luctus lacus. Nulla facilisi. Nunc tellus ipsum, consequat vel arcu id,
        pretium vehicula tellus. Fusce vulputate facilisis placerat. Morbi
        rutrum purus non tristique eleifend. Pellentesque ultrices metus et
        sapien blandit, et dapibus ante interdum. Curabitur ac facilisis risus.
        Nulla commodo, enim in mollis porta, nibh odio lacinia ligula, et
        vehicula libero nisi ut ex. Vivamus scelerisque, metus a suscipit
        viverra, enim turpis sagittis massa, ac cursus ipsum risus at risus.
        Suspendisse leo erat, molestie ac imperdiet ac, tincidunt sit amet
        augue. Integer et mi eu purus molestie consectetur vitae non ligula.
        Mauris a velit sit amet lorem varius egestas. Morbi lectus mi, volutpat
        in nisl eget, finibus maximus nisl. Aenean in urna a diam rhoncus
        laoreet. Phasellus semper, enim nec hendrerit ullamcorper, neque libero
        dignissim urna, in cursus augue risus et dui. Morbi posuere augue quis
        ante sodales, nec dapibus eros interdum. Quisque egestas gravida nunc.
        Aliquam volutpat vel justo in malesuada. Aenean aliquet dolor vel magna
        vehicula placerat. Aliquam erat volutpat. Curabitur fermentum enim odio,
        at cursus magna rutrum eu. Ut vel iaculis lorem. Vivamus quis sodales
        justo. Aliquam porttitor arcu congue, porta dui vel, scelerisque augue.
        Nullam condimentum pulvinar accumsan. Aenean dictum quam id dui tempor
        facilisis. Ut auctor ligula felis. Proin mollis interdum diam, viverra
        dictum quam commodo ac.
      </p>
    </Main>
  );
}
