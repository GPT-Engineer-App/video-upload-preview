import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import axios from "axios";

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

  const handleShare = async (platform) => {
    if (!editedVideoUrl) {
      toast.error("Please process the video first.");
      return;
    }

    let apiUrl = "";
    let formData = new FormData();
    formData.append("video", videoFile);

    switch (platform) {
      case "Instagram":
        apiUrl = "https://graph.instagram.com/v12.0/me/media"; // Corrected URL
        break;
      case "Facebook":
        apiUrl = "https://graph.facebook.com/v12.0/me/videos"; // Placeholder URL
        break;
      default:
        toast.error(`Unknown platform: ${platform}`);
        return;
    }

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual access token
        },
      });

      if (response.status === 200) {
        toast.success(`Video posted to ${platform} successfully!`);
      } else {
        toast.error(`Failed to post video to ${platform}.`);
      }
    } catch (error) {
      console.error(`Error posting video to ${platform}:`, error);
      toast.error(`Error posting video to ${platform}: ${error.message}`);
    }
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