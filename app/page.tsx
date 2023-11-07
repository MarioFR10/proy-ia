"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUtils } from "./utils";

function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-90 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function Home() {
  const {
    isLoading,
    responseCampaign,
    responseImage,
    createCampaignChat,
    createImages,
  } = useUtils();

  const [inputValue, setInputValue] = useState("");
  const [input2Value, setInput2Value] = useState("");

  function handleInputChange(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    setInputValue(e.target.value);
  }

  function handleInput2Change(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    setInput2Value(e.target.value);
  }

  return (
    <main className="p-24 min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <p className="text-2xl">
            Bienvenido al sistema de marketing automatizado
          </p>

          <p className="text-xl">
            Aquí podrás generar tus campañas de marketing automáticamente
          </p>
          <textarea
            value={inputValue}
            rows={10}
            onChange={handleInputChange}
            placeholder="Ingresa tu petición"
            className="text-black w-1/2 rounded-md p-2"
          />
          <button
            onClick={async () => {
              await createCampaignChat(inputValue);
            }}
            className="rounded-lg p-2 bg-blue-600"
          >
            Generar campaña
          </button>
          {responseCampaign ? (
            <p className="whitespace-pre-line">{responseCampaign}</p>
          ) : (
            <></>
          )}
          <div className="pt-10" />
          <p className="text-xl">Aquí podrás generar tus imagenes</p>
          <textarea
            value={input2Value}
            rows={5}
            onChange={handleInput2Change}
            placeholder="Ingresa tu petición"
            className="text-black w-1/2 rounded-md p-2"
          />
          <button
            onClick={async () => {
              await createImages(input2Value);
            }}
            className="rounded-lg p-2 bg-blue-600"
          >
            Generar imagenes
          </button>

          {responseImage ? (
            <a href={responseImage} download>
              <Image
                src={responseImage}
                alt="Imagen"
                height={200}
                width={200}
              />
            </a>
          ) : (
            <></>
          )}
        </div>
      )}
    </main>
  );
}
