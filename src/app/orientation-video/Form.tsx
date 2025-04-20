"use client";
import { FormSubmit } from "@/CommonComponents";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function Form() {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const remainingRef = useRef<HTMLDivElement>(null!);
  const [canContinue, setCanContinue] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const video = videoRef.current;
    // video.addEventListener("ratechange", () => {
    //   video.playbackRate = 1;
    // });
    video.addEventListener("loadedmetadata", () => {
      const timeLeft = video.duration - video.currentTime;
      console.log(timeLeft);
    });
    video.addEventListener("timeupdate", () => {
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft === 0) setCanContinue(true);
      remainingRef.current.innerText = formatTime(timeLeft);
    });
  }, []);
  const onSubmit = async () =>
    fetch("/orientation-video/api", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => router.push(res.nextPage));
  return (
    <div className="flex flex-col gap-4">
      <video
        controls
        // controls={false}
        width="600"
        ref={videoRef}
        className="border border-black"
      >
        <source
          src="https://pub-353c0d5867f74ae09eae2688cb487ad8.r2.dev/9f36f762-1618-4bf8-94e9-e1a5c2b3e71f.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="flex w-full justify-between">
        <Button onClick={() => videoRef.current.play()}>Play Video</Button>
        <span className="font-mono" ref={remainingRef}>
          4:42
        </span>
      </div>
      <form onSubmit={(e)=>{
        e.preventDefault()
        onSubmit();
      }}>
        <FormSubmit disabled={!canContinue} type="submit" isLoading={false}>
          {!canContinue ? "Finish the video to continue" : "Next"}
        </FormSubmit>
      </form>
    </div>
  );
}
