import { TabId } from "../../page";

type TabContentProps = {
  setSelectedTab: (tabId: TabId) => void;
};
export function Join({ setSelectedTab }: TabContentProps) {
  return <div>Join</div>;
}
