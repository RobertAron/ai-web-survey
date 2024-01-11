import { OnAScale } from "@/OnAScale";
import { Main, MyLink, PageTitle } from "@/CommonComponents";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="Political Opinions"
        subtitle="Please answer the following questions"
      />
      <form className="space-y-4">
        <OnAScale
          responses={[
            "Strongly Disagree",
            "Disagree",
            "Agree",
            "Strongly Agree",
          ]}
          statements={[
            "If economic globalisation is inevitable, it should primarly serve humanity rather than the interests of trans-national corporations",
            "I'd always support my country, whether it was right or wrong.",
            "No one chooses their country of birth, so it's foolish to be proud of it.",
          ]}
        />
        <MyLink href="/step-12">Next</MyLink>
      </form>
    </Main>
  );
}
