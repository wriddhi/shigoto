"use client";

import React, { useState, useEffect } from "react";
import { Flow } from "@/components/Flow";

export default function Page() {
  const [data, setData] = useState<Credential | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (signal: AbortSignal) => {
    alert("Fetching data");
    navigator.credentials
      .create({
        publicKey: {
          challenge: new Uint8Array([0, 1, 2, 3]),
          rp: { name: "Shigoto" },
          user: {
            id: new Uint8Array(16),
            name: "Wriddhi Hazra",
            displayName: "wriddhi",
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            { type: "public-key", alg: -8 },
            { type: "public-key", alg: -257 },
          ],
        },
        signal,
      })
      .then((newData) => {
        console.log("newData = ", newData);
        setData(newData);
      })
      .catch((err) => {
        console.error("err = ", err.message);
        setError(err.message);
      });
  };

  console.log("data = ", data);

  return (
    <div className="w-screen h-screen">
      {/* <Flow /> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <button
        className="bg-black text-white p-2 rounded font-bold"
        onClick={() => {
          fetchData(new AbortController().signal);
        }}
      >
        Fetch Data
      </button>
    </div>
  );
}
