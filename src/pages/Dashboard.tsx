//Dashboard.tsx
import CountStatsCard from "@/components/shared/CountStatsCard";
import CreateLink from "@/components/shared/CreateLink";
import FilterInput from "@/components/shared/FilterInput";
import UrlCard from "@/components/shared/UrlCard";
import { useGetAllClickQuery } from "@/services/click";
import { useGetAllUrlQuery } from "@/services/url";
import { IUrlObj } from "@/types";
import { Link, Pointer } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [filterText, setFilterText] = useState<string>("");
  const { data: urlData, isSuccess: urlSuccess } = useGetAllUrlQuery("");
  const {
    data: clickData,
    isSuccess: clickSuccess,
    refetch: refetchClicks,
  } = useGetAllClickQuery("");

  const handleDelete = async () => {
    await refetchClicks();
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  const filteredUrls = urlSuccess
    ? urlData.filter((item: IUrlObj) =>
        item.title.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  return (
    <section className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CountStatsCard
          title="Links Created"
          count={urlSuccess ? urlData.length : 0}
          icon={<Link className="h-4 w-4 text-muted-foreground" />}
        />
        <CountStatsCard
          title="Total Clicks"
          count={clickSuccess ? clickData.length : 0}
          icon={<Pointer className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="flex gap-4 items-center justify-between mt-6">
        <h4 className="text-2xl md:text-4xl font-extrabold leading-normal">
          <span className="text-gradient">My Links</span>
        </h4>
        <CreateLink />
      </div>
      <FilterInput value={filterText} onChange={handleFilterChange} />
      <div className="space-y-2 mt-4">
        {filteredUrls.map((item: IUrlObj) => (
          <UrlCard key={item._id} {...item} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
