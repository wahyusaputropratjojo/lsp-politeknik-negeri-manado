import { InputFile } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import Upload04 from "../assets/icons/untitled-ui-icons/line/components/Upload04";
import File06 from "../assets/icons/untitled-ui-icons/line/components/File06";
import { useState } from "react";
import { Alert, AlertDescription } from "../components/ui/alert";

export const Test = () => {
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // const image = URL.createObjectURL(file);

  return (
    <>
      <div className="w-full bg-neutral-500">
        <div className="mx-[auto] flex h-[100vh] max-w-[16rem] items-center justify-center">
          <div className="min-w-[30rem] rounded-lg p-10">
            <Label>Foto Profil</Label>
            <InputFile />
          </div>
        </div>
      </div>
    </>
  );
};
