// app/(dashboard)/dashboard/[template-slug]/page.tsx
"use client";
import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import ImageOutputSection from "../../_components/ImageOutputSection";
import VideoOutputSection from "../../_components/VideoOutputSection"; // We'll create this
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { generateImage } from "@/utils/huggingFaceApi";
import { generateVideo } from "@/utils/huggingFaceVideoApi"; // Import the function from your file

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent({ params }: PROPS) {
  const slug = params["template-slug"];
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === slug
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [mediaPrompt, setMediaPrompt] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  
  // Your API key should be stored securely in environment variables
  const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY || "";

  /**
   * Used to generate content from AI
   * @param formData
   * @returns
   */
  const GenerateAIContent = async (formData: any) => {
    setLoading(true);
    
    try {
      // Check which template we're using
      if (slug === "ai-image-generator") {
        const prompt = formData.imagePrompt + 
          (formData.additionalStyles ? `. Style: ${formData.additionalStyles}` : "");
        
        setMediaPrompt(prompt);
        
        // Generate image using Hugging Face API
        const generatedImageUrl = await generateImage(prompt, huggingFaceApiKey);
        setImageUrl(generatedImageUrl);
        
        // Also save the text response from your text AI for context/description
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);
        setAiOutput(result?.response.text());
        
        await SaveInDb(
          JSON.stringify(formData),
          selectedTemplate?.slug,
          result?.response.text(),
          generatedImageUrl
        );
      } 
      else if (slug === "text-to-video-generator") {
        // Combine main prompt and additional details if provided
        const prompt = formData.videoPrompt + 
          (formData.additionalDetails ? `. Additional details: ${formData.additionalDetails}` : "");
        
        setMediaPrompt(prompt);
        
        // Generate video using Hugging Face API
        const generatedVideoUrl = await generateVideo(prompt, huggingFaceApiKey);
        setVideoUrl(generatedVideoUrl);
        
        // Generate text description
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);
        setAiOutput(result?.response.text());
        
        await SaveInDb(
          JSON.stringify(formData),
          selectedTemplate?.slug,
          result?.response.text(),
          undefined,
          generatedVideoUrl
        );
      }
      else {
        // Handle regular text-based templates
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);
        setAiOutput(result?.response.text());
        
        await SaveInDb(
          JSON.stringify(formData),
          selectedTemplate?.slug,
          result?.response.text()
        );
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setAiOutput("There was an error generating the content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (
    formData: any, 
    slug: any, 
    aiResp: string, 
    imageUrl?: string,
    videoUrl?: string
  ) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null, // Make sure this field exists in your schema
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD/MM/yyyy"),
      });
      console.log(result);
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 ">
        {/* FormSection  */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        {/* OutputSection  */}
        <div className="col-span-2">
          {slug === "ai-image-generator" ? (
            <div className="grid grid-cols-1 gap-5">
              <ImageOutputSection imageUrl={imageUrl} prompt={mediaPrompt} />
              <OutputSection aiOutput={aiOutput} />
            </div>
          ) : slug === "text-to-video-generator" ? (
            <div className="grid grid-cols-1 gap-5">
              <VideoOutputSection videoUrl={videoUrl} prompt={mediaPrompt} />
              <OutputSection aiOutput={aiOutput} />
            </div>
          ) : (
            <OutputSection aiOutput={aiOutput} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;