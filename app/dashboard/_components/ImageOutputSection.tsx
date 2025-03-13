// _components/ImageOutputSection.tsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

interface ImageOutputSectionProps {
  imageUrl: string;
  prompt: string;
}

function ImageOutputSection({ imageUrl, prompt }: ImageOutputSectionProps) {
  const handleDownload = () => {
    if (!imageUrl) return;
    
    // Create an anchor element and set the href attribute to the image URL
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `generated-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Generated Image
          {imageUrl && (
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-md border">
              <img
                src={imageUrl}
                alt={prompt || "Generated image"}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p><strong>Prompt:</strong> {prompt}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-muted rounded-md">
            <p className="text-muted-foreground">Your generated image will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ImageOutputSection;