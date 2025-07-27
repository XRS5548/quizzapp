"use client"

import React, { useState, useRef, useEffect } from "react"
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop
) {
  const ctx = canvas.getContext("2d")!
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio

  canvas.width = crop.width * pixelRatio
  canvas.height = crop.height * pixelRatio

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = "high"

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  )
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  )
}

export default function CropperButton({ onSuccess, aspect = 1,Text="Upload And Crop" ,Varient='default'}: { onSuccess: (url: string) => void, aspect?: number ,Text:string ,Varient:string }) {
  const [open, setOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!

  useEffect(() => {
    if (!open) {
      setImageSrc(null)
      setCrop(undefined)
      setCompletedCrop(undefined)
    }
  }, [open])

  useEffect(() => {
    if (
      imgRef.current &&
      canvasRef.current &&
      completedCrop?.width &&
      completedCrop?.height
    ) {
      canvasPreview(imgRef.current, canvasRef.current, completedCrop)
    }
  }, [completedCrop])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageSrc(reader.result?.toString() || null)
    reader.readAsDataURL(file)
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, aspect))
  }

  const onUploadToCloudinary = () => {
    if (!canvasRef.current || !completedCrop) return

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return

      const formData = new FormData()
      formData.append("file", blob)
      formData.append("upload_preset", uploadPreset)

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        onSuccess(data.secure_url)
        setOpen(false)
      } catch (err) {
        console.error("❌ Upload error", err)
        alert("Upload failed.")
      }
    }, "image/png")
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={""} size={"lg"} variant={Varient}>{Text}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader className={""}>
          <AlertDialogTitle className={""}>Upload and Crop Image</AlertDialogTitle>
          <AlertDialogDescription className={""}>Select and crop an image to upload</AlertDialogDescription>
        </AlertDialogHeader>

        <Input type="file"  accept="image/*" onChange={onSelectFile} className="mb-4" />

        {imageSrc && (
          <div className="max-h-[60vh] overflow-y-auto">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className="mb-4"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                onLoad={onImageLoad}
                crossOrigin="anonymous"
                className="max-w-full"
              />
            </ReactCrop>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`border w-full max-w-xs mx-auto mb-4 ${completedCrop ? 'block' : 'hidden'}`}
        />

        <AlertDialogFooter className={""}>
          <AlertDialogCancel className={""}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={""} onClick={onUploadToCloudinary}>Upload</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}