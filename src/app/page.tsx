import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col p-2 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:pt-2">
      <h1 className="text-3xl font-extrabold">Consent Form</h1>
      <h2 className="text-2xl font-bold">Study Information</h2>
      <h3>Aim:</h3>
      <p>In the present experiment, we examine...</p>
      <h3>Time Commitment:</h3>
      <p>
        The task takes around _ minutes. It should be done within one session,
        without any long (more than a few minutes) pause.
      </p>
      <h3>Rights:</h3>
      <p>
        You can stop participating in the study at any time without giving a
        reason (by closing or refreshing this website).
      </p>
      <h3>Technical Requirements</h3>
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
      <h3>Anonymity and Privacy:</h3>
      <p>
        The results of the study are to be used and published for research
        purposes. The data do not provide any information about you personally.
        Your identity will be kept strictly confidential.
      </p>
      <h3>Content:</h3>
      <p>{`By pressing the "Consent & Continue" button, you declare that you have read and understood the information above. You confirm that you will be concentrating on the task and complete it to the best of your abilities.`}</p>
      <Link
        href="/step-1"
        className="bg-gray-300 hover:bg-gray-400 focus-visible:bg-gray-400 border border-gray-600 font-bold p-2 self-center"
      >
        Consent & Continue
      </Link>
    </main>
  );
}
