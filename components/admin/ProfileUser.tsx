"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save, X, Upload } from "lucide-react";
import Cropper from "react-easy-crop";
import Modal from "react-modal";
import CropperButton from "../personal/CropperButton";

export default function ProfileUser() {
  const [profile, setProfile] = useState({
    fname: "",
    lname: "",
    email: "",
    bio: "",
    image: ""
  });

  const [editMode, setEditMode] = useState({
    fname: false,
    lname: false,
    email: false,
    bio: false
  });

  const [tempProfile, setTempProfile] = useState(profile);
  const [imageFile, setImageFile] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/userinfo");
      const data = await res.json();
      setProfile(data);
      setTempProfile(data);
    };

    fetchProfile();
  }, []);

  const handleEditToggle = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setTempProfile({ ...profile });
  };

  const handleCancel = (field) => {
    setEditMode({ ...editMode, [field]: false });
    setTempProfile(profile);
  };

  const handleSave = async (field) => {
    const updatedProfile = { ...profile, [field]: tempProfile[field] };
    setProfile(updatedProfile);
    setEditMode({ ...editMode, [field]: false });

    await fetch("/api/updateprofile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: tempProfile[field] })
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
      setCropModalOpen(true);
    };
  };

  const getCroppedImg = async () => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    const croppedFile = await getCroppedImg() as File;

    const formData = new FormData();
    formData.append("image", croppedFile);

    const res = await fetch("/api/updateprofileimage", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setProfile({ ...profile, image: data.image });
    setCropModalOpen(false);
  };

  return (
    <main className="w-full p-6 space-y-8">
      <Modal isOpen={cropModalOpen} onRequestClose={() => setCropModalOpen(false)} ariaHideApp={false}>
        <div className="relative h-96 bg-gray-200">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
            onZoomChange={setZoom}
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button size='m' className={""} variant="ghost" onClick={() => setCropModalOpen(false)}>Cancel</Button>
          <Button variant="default" size='m' className={""} onClick={handleCropSave}>Save</Button>
        </div>
      </Modal>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage className={""} src={profile.image} />
            <AvatarFallback className={""}>
              {profile.fname?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.fname} {profile.lname}</h1>
            <p className="text-muted-foreground text-sm">
              Update your personal details here
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CropperButton
            Varient="outline"
            Text="Change Profile"
            onSuccess={async (url: string) => {
              setProfile((prev) => ({ ...prev, image: url }));

              await fetch("/api/updateprofileimage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: url }),
              });
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          {editMode.fname ? (
            <div className="flex items-center gap-2">
              <Input type={"text"} className={""}
                value={tempProfile.fname}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, fname: e.target.value })
                }
              />
              <Button variant={"default"} className={""} size="sm" onClick={() => handleSave("fname")}> <Save className="w-4 h-4" /> </Button>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleCancel("fname")}> <X className="w-4 h-4" /> </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{profile.fname}</span>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleEditToggle("fname")}> <Pencil className="w-4 h-4" /> </Button>
            </div>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          {editMode.lname ? (
            <div className="flex items-center gap-2">
              <Input type={"text"} className={""}
                value={tempProfile.lname}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, lname: e.target.value })
                }
              />
              <Button variant={"default"} className={""} size="sm" onClick={() => handleSave("lname")}> <Save className="w-4 h-4" /> </Button>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleCancel("lname")}> <X className="w-4 h-4" /> </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{profile.lname}</span>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleEditToggle("lname")}> <Pencil className="w-4 h-4" /> </Button>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          {editMode.email ? (
            <div className="flex items-center gap-2">
              <Input type={"text"} className={""}
                value={tempProfile.email}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, email: e.target.value })
                }
              />
              <Button variant="default" className={""} size="sm" onClick={() => handleSave("email")}> <Save className="w-4 h-4" /> </Button>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleCancel("email")}> <X className="w-4 h-4" /> </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{profile.email}</span>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleEditToggle("email")}> <Pencil className="w-4 h-4" /> </Button>
            </div>
          )}
        </div>

        {/* Bio Field - Full width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Bio</label>
          {editMode.bio ? (
            <div className="flex items-center gap-2">
              <Input className={""}
                type={"text"}
                value={tempProfile.bio}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, bio: e.target.value })
                }
              />
              <Button variant="default" className={""} size="sm" onClick={() => handleSave("bio")}> <Save className="w-4 h-4" /> </Button>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleCancel("bio")}> <X className="w-4 h-4" /> </Button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{profile.bio}</span>
              <Button className={""} size="sm" variant="ghost" onClick={() => handleEditToggle("bio")}> <Pencil className="w-4 h-4" /> </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
