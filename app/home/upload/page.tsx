"use client";
import React, { useRef, useState } from "react";
import { Button} from "@/components/ui/button";
export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPrediction(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Upload an Image</h2>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
      />
      <Button
        onClick={handleUpload}
        disabled={!selectedFile}
        style={{ marginLeft: 8 }}
      >
         Predict
      </Button>
      {prediction && (
        <div style={{ marginTop: 16 }}>
          <strong>Predicted Shape:</strong> {prediction}
        </div>
      )}
    </div>
  );
}