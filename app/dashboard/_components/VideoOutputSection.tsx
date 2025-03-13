// app/_components/VideoOutputSection.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PROPS {
  videoUrl: string;
  prompt: string;
}

function VideoOutputSection({ videoUrl, prompt }: PROPS) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Generated Video</CardTitle>
      </CardHeader>
      <CardContent>
        {videoUrl ? (
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                autoPlay
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium">Prompt:</h3>
              <p className="text-sm text-gray-600">{prompt}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md">
            <p className="text-gray-500">Your generated video will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default VideoOutputSection;