import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <div className="flex-1 w-full h-full grid place-items-center">
      <Spinner
        className="scale-[2]"
        classNames={{
          circle1: "border-b-black",
          circle2: "border-b-black",
        }}
      />
    </div>
  );
}
