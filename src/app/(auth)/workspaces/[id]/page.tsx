"use client";

import { RichText } from "@/components/RichText";
import { Sidebar } from "@/components/Sidebar";
import { Api } from "@/constants/endpoints";
import { Workspace } from "@/types/workspace";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: workspace,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["workspace", params.id],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get<Workspace>(Api.workspace(params.id), {
        signal,
      });
      return data;
    },
    initialData: null,
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError && error instanceof AxiosError) {
    console.error(error.response?.data);
    return <p>Errorrrr</p>;
  }

  if (!workspace) {
    return <p>Workspace not found</p>;
  }

  return (
    <section className="flex">
      <Sidebar />
      <main className="flex-1 w-full">
        <h1>{workspace.name}</h1>
        <p>{workspace.description}</p>
        <RichText html={workspace.info} />
      </main>
    </section>
  );
}
