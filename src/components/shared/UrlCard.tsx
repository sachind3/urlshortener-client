//UrlCard.tsx
import { getClientUrl } from "@/lib/utils";
import { useDeleteUrlMutation } from "@/services/url";
import { IUrlObj } from "@/types";
import { Check, Copy, Download, Link as LinkIcon, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const UrlCard = ({
  _id,
  title,
  original_url,
  short_url,
  createdAt,
  onDelete,
}: IUrlObj & { onDelete: () => void }) => {
  const [deleteUrl, deleteResult] = useDeleteUrlMutation();
  const [copyText, setCopyText] = useState<Boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const copyLink = () => {
    navigator.clipboard.writeText(`${getClientUrl()}/${short_url}`);
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 1000);
  };

  const deleteLink = async () => {
    await deleteUrl(_id);
    onDelete();
  };

  useEffect(() => {
    if (deleteResult.isSuccess) {
      toast.success("URL deleted successfully");
    } else if (deleteResult.isError) {
      toast.error("Failed to delete URL");
    }
  }, [deleteResult]);

  const downloadImage = () => {
    const qrElement = qrRef.current;
    if (qrElement && canvasRef.current) {
      const svg = qrElement.querySelector("svg");
      if (svg) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "qr_code.png";
          link.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
      }
    }
  };

  return (
    <div className="border rounded-md p-4 flex flex-col md:flex-row gap-3">
      <div className="w-24" ref={qrRef}>
        <QRCode
          size={96}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`${getClientUrl()}/${short_url}`}
          viewBox={`0 0 96 96`}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className="flex flex-col gap-1">
        <Link to={`/link/${_id}`} className="text-lg font-bold inline-block">
          {title}
        </Link>
        <Link
          to={`/link/${_id}`}
          className="break-words text-blue-600 font-bold inline-block"
        >
          {getClientUrl()}/{short_url}
        </Link>

        <Link
          to={`/link/${_id}`}
          className="break-words text-sm md:text-md leading-3 inline-block"
        >
          <LinkIcon size={15} className="inline-block" /> {original_url}
        </Link>
        {createdAt && (
          <p className="text-sm text-slate-400 mt-auto">
            {new Date(createdAt).toLocaleString()}
          </p>
        )}
      </div>
      <div className="flex gap-3 md:ml-auto">
        <Button
          variant="outline"
          size="icon"
          title="Copy"
          onClick={copyLink}
          disabled={deleteResult.isLoading}
        >
          {copyText ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          title="Download"
          onClick={downloadImage}
          disabled={deleteResult.isLoading}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          title="Delete"
          onClick={deleteLink}
          disabled={deleteResult.isLoading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UrlCard;
