import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Index = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedVideoUrl, setEditedVideoUrl] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      toast.error("Please upload a video file first.");
      return;
    }

    setIsProcessing(true);
    toast("Video is being processed...");

    // Simulate backend processing
    setTimeout(() => {
      setIsProcessing(false);
      setEditedVideoUrl(videoPreview); // Simulate edited video URL
      toast.success("Video processing complete!");
    }, 5000);
  };

  const handleShare = (platform) => {
    let url = "";
    switch (platform) {
      case "Instagram":
        url = "https://www.instagram.com";
        break;
      case "Facebook":
        url = "https://www.facebook.com";
        break;
      default:
        toast.error(`Unknown platform: ${platform}`);
        return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl text-center">Video Upload and Preview</h1>
      <Input type="file" accept="video/*" onChange={handleVideoUpload} />
      {videoPreview && (
        <video
          src={videoPreview}
          controls
          className="w-full max-w-md mt-4"
        />
      )}
      <Button onClick={handleSubmit} className="mt-4">
        Upload and Process Video
      </Button>
      {isProcessing && (
        <div className="w-full max-w-md mt-4">
          <Progress value={50} />
          <p className="text-center mt-2">Processing...</p>
        </div>
      )}
      {editedVideoUrl && (
        <div className="w-full max-w-md mt-4">
          <video
            src={editedVideoUrl}
            controls
            className="w-full"
          />
          <a
            href={editedVideoUrl}
            download="edited_video.mp4"
            className="mt-2 inline-block text-blue-500"
          >
            Download Edited Video
          </a>
          <div className="flex space-x-2 mt-4">
            <Button onClick={() => handleShare("Instagram")} className="bg-pink-500 text-white">
              Share on Instagram
            </Button>
            <Button onClick={() => handleShare("Facebook")} className="bg-blue-500 text-white">
              Share on Facebook
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;