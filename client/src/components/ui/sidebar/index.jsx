// Packages
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

// Context
import { AuthContext } from "../../../context/AuthContext";

// Utils
import { cn } from "../../../utils/cn";
import axios from "../../../utils/axios";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Badge } from "../badge";
import { Button } from "../button";
import { Navigation } from "./Navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu";

// Assets
import LSP from "../../../assets/logo/components/LSP";
import PoliteknikNegeriManado from "../../../assets/logo/components/PoliteknikNegeriManado";
import Archive from "../../../assets/icons/untitled-ui-icons/line/components/Archive";
import LayoutAlt04 from "../../../assets/icons/untitled-ui-icons/line/components/LayoutAlt04";
import UserSquare from "../../../assets/icons/untitled-ui-icons/line/components/UserSquare";
import DotsVertical from "../../../assets/icons/untitled-ui-icons/line/components/DotsVertical";
import User01 from "../../../assets/icons/untitled-ui-icons/line/components/User01";
import LogOut02 from "../../../assets/icons/untitled-ui-icons/line/components/LogOut02";
import ChevronRight from "../../../assets/icons/untitled-ui-icons/line/components/ChevronRight";
import ChevronLeft from "../../../assets/icons/untitled-ui-icons/line/components/ChevronLeft";

export const Sidebar = () => {
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return axios.get(`/user/${auth.id}`);
    },
    onSuccess: (data) => {
      const { role } = data.data.data;
      const { nama } = data.data.data.profil;

      setNama(nama);
      setRole(role);
    },
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      axios.delete("/auth/logout");
    },
  });

  const logOut = async () => {
    mutate();
    setAuth({});
  };

  const profileMenu = (e) => {
    setVisible(!visible);
  };

  const handleMinimized = (e) => {
    setIsMinimized(!isMinimized);
    setVisible(false);
  };

  return (
    <>
      <section
        className={cn(
          "flex h-full w-72 flex-col justify-between gap-11 rounded-2xl bg-white px-8 py-8",
          {
            "w-24 px-6 py-8": isMinimized,
          }
        )}
      >
        <header
          className={cn("flex", {
            "justify-center": isMinimized,
          })}
        >
          {!isMinimized && <LSP className="h-10" />}
          {isMinimized && <PoliteknikNegeriManado className="h-10" />}
        </header>
        <nav className="flex h-full max-h-full flex-col gap-1">
          <Navigation to="/" isMinimized={isMinimized}>
            <LayoutAlt04 className="text-lg" />
            {!isMinimized && <span>Dashboard</span>}
          </Navigation>
          <div>
            <Navigation to="/skema-sertifikasi" isMinimized={isMinimized}>
              <Archive className="text-lg" />
              {!isMinimized && <span>Skema</span>}
            </Navigation>
          </div>
        </nav>
        <footer className="flex flex-col gap-4">
          <hr className="rounded-full border-2 text-secondary-50" />
          <div className="flex items-center justify-between gap-2">
            <Avatar>
              <AvatarImage src="/profil.png" />
              <AvatarFallback>
                <User01 className="text-xl" />
              </AvatarFallback>
            </Avatar>
            {!isMinimized && (
              <div className="flex w-full items-center justify-between gap-2">
                <div>
                  <p className="w-36 truncate font-anek-latin text-lg font-semibold text-secondary-500">
                    {nama}
                  </p>
                  <p className="font-aileron text-xs font-normal text-secondary-500">
                    {role}
                  </p>
                </div>
                <div>
                  <button onClick={profileMenu}>
                    <DotsVertical className="text-lg" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </footer>
      </section>
      <div className="absolute -right-2 top-0 flex h-8 w-8 translate-x-full rounded-xl bg-white">
        <button className="flex h-full w-full items-center justify-center">
          {!isMinimized && (
            <ChevronLeft onClick={handleMinimized} className="text-xl" />
          )}
          {isMinimized && (
            <ChevronRight onClick={handleMinimized} className="text-xl" />
          )}
        </button>
      </div>
      {visible && (
        <div className="absolute -right-4 bottom-0 flex h-min translate-x-full flex-col gap-2 rounded-2xl bg-white px-4 py-4">
          <Button
            size="small"
            variant="error"
            className="flex gap-2"
            onClick={logOut}
          >
            <LogOut02 />
            Keluar
          </Button>
        </div>
      )}
    </>
  );
};
