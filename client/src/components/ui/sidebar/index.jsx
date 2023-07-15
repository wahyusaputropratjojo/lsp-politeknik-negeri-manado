// Packages
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate, redirect } from "react-router-dom";

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
import HomeLine from "../../../assets/icons/untitled-ui-icons/line/components/HomeLine";
import Archive from "../../../assets/icons/untitled-ui-icons/line/components/Archive";
import LayoutAlt04 from "../../../assets/icons/untitled-ui-icons/line/components/LayoutAlt04";
import DotsVertical from "../../../assets/icons/untitled-ui-icons/line/components/DotsVertical";
import User01 from "../../../assets/icons/untitled-ui-icons/line/components/User01";
import LogIn02 from "../../../assets/icons/untitled-ui-icons/line/components/LogIn02";
import LogOut02 from "../../../assets/icons/untitled-ui-icons/line/components/LogOut02";
import ChevronRight from "../../../assets/icons/untitled-ui-icons/line/components/ChevronRight";
import ChevronLeft from "../../../assets/icons/untitled-ui-icons/line/components/ChevronLeft";
import FileAttachment04 from "../../../assets/icons/untitled-ui-icons/line/components/FileAttachment04";
import UserLeft01 from "../../../assets/icons/untitled-ui-icons/line/components/UserLeft01";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");
  const [visible, setVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (auth) return await axios.get(`/user/${auth?.id}`);
    },
    onSuccess: (data) => {
      const { role } = data.data.data;
      const { nama_lengkap } = data.data.data;

      setNama(nama_lengkap);
      setRole(role);
    },
    enabled: !!auth,
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      axios.delete("/auth/logout");
    },
  });

  const logOut = async () => {
    navigate(0);
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
          "flex h-full w-72 flex-col gap-12 rounded-lg bg-white p-8",
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
          {!isMinimized && (
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              <LSP className="h-10" />
            </button>
          )}
          {isMinimized && (
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              <PoliteknikNegeriManado className="h-10" />
            </button>
          )}
        </header>
        <nav className="flex h-full max-h-full flex-col gap-4">
          <div>
            <Navigation to="/" isMinimized={isMinimized}>
              <HomeLine className="text-lg" />
              {!isMinimized && <span>Beranda</span>}
            </Navigation>
            {/* <Navigation to="/dashboard" isMinimized={isMinimized}>
              <LayoutAlt04 className="text-lg" />
              {!isMinimized && <span>Dashboard</span>}
            </Navigation>
            <Navigation to="/skema-sertifikasi" isMinimized={isMinimized}>
              <Archive className="text-lg" />
              {!isMinimized && <span>Skema Sertifikasi</span>}
            </Navigation> */}
          </div>

          {auth?.role === "Administrator" && (
            <div>
              <Navigation
                to="/manajemen-asesi/tinjau-persyaratan"
                isMinimized={isMinimized}
              >
                <FileAttachment04 className="text-lg" />
                {!isMinimized && <span>Tinjau Persyaratan</span>}
              </Navigation>
              <Navigation
                to="/manajemen-asesi/penentuan-asesor"
                isMinimized={isMinimized}
              >
                <UserLeft01 className="text-lg" />
                {!isMinimized && <span>Penentuan Asesor</span>}
              </Navigation>
            </div>
          )}
        </nav>
        <footer className="flex flex-col gap-4">
          {auth ? (
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage src="http://localhost:3000/uploads/new-profile-1024px-7-10-2023-23-57-40-819-2659.png" />
                <AvatarFallback>
                  <User01 className="text-xl" />
                </AvatarFallback>
              </Avatar>
              {!isMinimized && (
                <div className="flex items-center justify-between gap-2">
                  <div className="w-36">
                    <p className="truncate font-anek-latin text-lg font-semibold text-secondary-500">
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
          ) : (
            <Button
              className="items-center gap-2"
              content={isMinimized && "icon"}
              onClick={() => navigate("/masuk")}
            >
              <LogIn02 className="p-0 text-lg" />
              <span hidden={isMinimized}>Masuk</span>
            </Button>
          )}
        </footer>
      </section>
      <div className="absolute -right-2 top-0 flex h-8 w-8 translate-x-full rounded-lg bg-white">
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
        <div className="absolute -right-4 bottom-0 z-50 flex h-min translate-x-full flex-col gap-2 rounded-lg bg-white p-4">
          <Button size="sm" variant="error" className="gap-2" onClick={logOut}>
            <LogOut02 />
            Keluar
          </Button>
        </div>
      )}
    </>
  );
};
