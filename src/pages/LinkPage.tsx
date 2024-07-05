//LinkPage.tsx
import LoaderCard from "@/components/shared/LoaderCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClientUrl } from "@/lib/utils";
import { useGetClickDataQuery } from "@/services/click";
import { useDeleteUrlMutation, useGetUrlQuery } from "@/services/url";
import { Check, Copy, Download, Link as LinkIcon, Trash } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { Link, useNavigate, useParams } from "react-router-dom";

const CountStatsCard = lazy(() => import("@/components/shared/CountStatsCard"));
const DeviceInfo = lazy(() => import("@/components/shared/DeviceInfo"));
const LocationStats = lazy(() => import("@/components/shared/LocationStats"));

const LinkPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const urlData = useGetUrlQuery(id);
  const [deleteUrl, deleteResult] = useDeleteUrlMutation();
  const [fetchClicks, setFetchClicks] = useState<boolean>(false);
  const { data: clickData } = useGetClickDataQuery(id, { skip: !fetchClicks });

  const [copyText, setCopyText] = useState<Boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (urlData.isError) {
      toast.error((urlData.error as any)?.data.message);
      navigate("/dashboard");
    }
  }, [urlData, navigate]);

  useEffect(() => {
    if (urlData.isSuccess) {
      setFetchClicks(true);
    }
  }, [urlData]);

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${getClientUrl()}/${urlData.data.short_url}`
    );
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 1000);
  };

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

  const deleteLink = async () => {
    await deleteUrl(urlData.data._id);
    navigate("/dashboard");
  };

  if (urlData.data) {
    return (
      <section className="py-6">
        <div className="flex flex-col gap-8 sm:flex-row justify-between items-start">
          <div className="flex flex-col items-start gap-4 rounded-lg sm:w-2/5 ">
            <h4 className="text-3xl font-bold">{urlData.data.title}</h4>
            <Link
              to={`/${urlData.data.short_url}`}
              className="text-blue-600 font-bold text-xl"
            >
              {getClientUrl()}/{urlData.data.short_url}
            </Link>
            <Link
              to={urlData.data.original_url}
              className="break-words md:text-md leading-3 text-xl"
            >
              <LinkIcon size={15} className="inline-block" />{" "}
              {urlData.data.original_url}
            </Link>
            {urlData.data.createdAt && (
              <p className="text-sm text-slate-400 mt-auto">
                {new Date(urlData.data.createdAt).toLocaleString()}
              </p>
            )}
            <div className="flex gap-3">
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
            <div className="w-full max-w-xs ring ring-blue-600 p-1" ref={qrRef}>
              <QRCode
                size={96}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${getClientUrl()}/${urlData.data.short_url}`}
                viewBox={`0 0 96 96`}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          </div>

          <Card className="w-full sm:w-3/5">
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <Suspense fallback={<LoaderCard width="100%" height="120px" />}>
                  <CountStatsCard
                    title="Total Clicks"
                    count={clickData?.length}
                    icon={<LinkIcon />}
                  />
                </Suspense>
                <Suspense fallback={<LoaderCard width="100%" height="120px" />}>
                  <DeviceInfo data={clickData} />
                </Suspense>
              </div>
              <Suspense fallback={<LoaderCard width="100%" height="200px" />}>
                <LocationStats data={clickData} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
  return (
    <div className="py-6">
      <LoaderCard width="100%" height="350px" />
    </div>
  );
};

export default LinkPage;
