import { Button, Input, Textarea, Switch } from "@nextui-org/react";
import { TabId } from "../../page";
import { useEffect, useState } from "react";
import { PiLockSimpleOpenDuotone, PiLockSimpleDuotone } from "react-icons/pi";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Api } from "@/constants/endpoints";
import { toast } from "sonner";
import { TOASTS } from "@/constants/toasts";
import { ApiError } from "@/types/api-error";
import { Editor } from "@/components/Editor";
import { RichText } from "@/components/RichText";

type TabContentProps = {
  setSelectedTab: (tabId: TabId) => void;
};

export function Create({ setSelectedTab }: TabContentProps) {
  const [name, setName] = useState("New Workspace");
  const [description, setDescription] = useState("No Description");
  const [isPrivate, setIsPrivate] = useState(true);
  const [html, setHtml] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (name.length > 50) {
      setNameError("Name must be less than 50 characters");
    } else if (name.length < 3) {
      setNameError("Name must be 3 characters or more");
    } else {
      setNameError("");
    }
  }, [name]);

  useEffect(() => {
    if (description.length > 255) {
      setDescriptionError("Description must be less than 255 characters");
    } else {
      setDescriptionError("");
    }
  }, [description]);

  const { mutate: createWorkspace, isPending: isCreating } = useMutation({
    mutationFn: async () => {
      return axios.post(Api.workspaces, {
        name,
        description,
        info: html,
        isPrivate,
      });
    },
    onSuccess: () => {
      toast.success(TOASTS.SUCCESS, {
        description: "Workspace created successfully",
      });
      setSelectedTab("view");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(TOASTS.ERROR, {
        description: error.response?.data?.message,
      });
    },
  });

  const handleCreation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameError || descriptionError) {
      return;
    }
    console.log("Triggering mutation");
    createWorkspace();
  };

  return (
    <form
      onSubmit={handleCreation}
      className="flex flex-col items-start justify-center gap-4 p-4 w-11/12 md:w-2/3 lg:w-1/2 mx-auto"
    >
      <h4 className="font-semibold mb-4 hidden md:flex">Create a workspace.</h4>
      <h5 className="font-semibold mb-4 flex md:hidden">Create a workspace.</h5>
      <Input
        type="text"
        variant="flat"
        label="Workspace Name"
        labelPlacement="outside"
        placeholder="Enter a name to label your workspace"
        value={name}
        onChange={(e) => setName(e.target.value)}
        isInvalid={!!nameError}
        errorMessage={nameError}
        description={`${name.length}/50`}
      />
      <Textarea
        type="text"
        variant="flat"
        label="Workspace Description"
        labelPlacement="outside"
        placeholder="Describe the purpose of this workspace in a few words"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        isInvalid={!!descriptionError}
        errorMessage={descriptionError}
        description={`${description.length}/255`}
      />
      <p className="text-sm flex gap-2">Workspace Info</p>
      <Editor setHtml={setHtml} />
      <RichText html={html} />
      <p className="text-sm flex gap-2">
        Select privacy mode:{" "}
        {isPrivate ? (
          <b className="text-success-400 flex items-center gap-1">
            Private <PiLockSimpleDuotone />
          </b>
        ) : (
          <b className="text-warning-400 flex items-center gap-1">
            Public <PiLockSimpleOpenDuotone />
          </b>
        )}
      </p>
      <Switch
        isSelected={isPrivate}
        color="success"
        onValueChange={() => setIsPrivate(!isPrivate)}
      >
        <span className="text-sm flex gap-2">
          <span>Private</span>
          <i className="text-default-400">{"(recommended)"}</i>
        </span>
      </Switch>
      <p className="text-small text-default-500">
        {isPrivate
          ? "No one else can view or join this workspace unless you invite them"
          : "Anyone can publicly search for and join this workspace"}
      </p>
      <Button
        type="submit"
        isDisabled={!!nameError || !!descriptionError}
        isLoading={isCreating}
        className="text-white bg-black"
        radius="sm"
      >
        Create new Workspace -&gt;
      </Button>
    </form>
  );
}
