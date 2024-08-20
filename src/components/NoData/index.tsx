import { Card } from "@nextui-org/react";
import { PiCloudWarningDuotone } from "react-icons/pi";

type NoDataProps = {
  title?: string;
  action?: React.ReactNode;
};

export default function NoData({
  title = "No data found",
  action = <></>,
}: NoDataProps) {
  return (
    <Card className="w-full h-full flex-1 p-4">
      <div className="h-full flex flex-col items-center justify-evenly">
        <PiCloudWarningDuotone className="text-[20rem] text-black/50" />
        <h4 className="text-black/50">{title}</h4>
        {action}
      </div>
    </Card>
  );
}
