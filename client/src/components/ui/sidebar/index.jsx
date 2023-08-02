// Packages
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

// Context
import { AuthContext } from "../../../context/AuthContext";

// Utils
import { cn } from "../../../utils/cn";
import axios from "../../../utils/axios";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";
import { Navigation } from "./Navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";

// Assets
import { LSP, PoliteknikNegeriManado } from "../../../assets/logo/components";
import {
  BookClosed,
  CalendarCheck02,
  ChevronRight,
  DotsVertical,
  FileAttachment04,
  FileQuestion02,
  HomeLine,
  ImageUserPlus,
  ImageUserDown,
  LogIn02,
  LogOut02,
  User01,
  UserLeft01,
  UsersEdit,
  LayoutAlt02,
} from "./Icons";
import { is } from "date-fns/locale";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);

  const namaLengkap = auth?.nama_lengkap;
  const role = auth?.role;
  const isDisabled = location?.state?.is_disabled;
  const isAsesi = auth?.role === "Asesi";
  const isAsesor = auth?.role === "Asesor";
  const isAdministrator = auth?.role === "Administrator";

  const [visible, setVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const { mutate } = useMutation({
    mutationFn: () => {
      axios.delete("/auth/logout");
    },
  });

  const logOut = () => {
    mutate();
    setAuth(null);
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
          "relative z-[100] flex h-full w-72 flex-col gap-12 rounded-lg bg-white p-8 shadow-lg",
          {
            "w-24 px-6 py-8": isMinimized,
          },
        )}>
        <header
          className={cn("flex", {
            "justify-center": isMinimized,
          })}>
          {!isMinimized && <LSP className="h-10" />}
          {isMinimized && <PoliteknikNegeriManado className="h-10" />}
        </header>
        <nav className="flex h-full max-h-full flex-col gap-1 bg-white">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Navigation to="/" isMinimized={isMinimized} isDisabled={isDisabled}>
                  <HomeLine className="text-lg" />
                  {!isMinimized && <span>Beranda</span>}
                </Navigation>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={24}
                side="right"
                className={cn(
                  "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                  {
                    hidden: !isMinimized,
                  },
                )}>
                <div>
                  <p className="font-aileron text-sm font-semibold">Beranda</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Navigation
                  to="/skema-sertifikasi"
                  isMinimized={isMinimized}
                  isDisabled={isDisabled}>
                  <LayoutAlt02 className="text-lg" />
                  {!isMinimized && <span>Skema Sertifikasi</span>}
                </Navigation>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={24}
                side="right"
                className={cn(
                  "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                  {
                    hidden: !isMinimized,
                  },
                )}>
                <div>
                  <p className="font-aileron text-sm font-semibold">Skema Sertifikasi</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className={cn({ hidden: isAsesor || isAdministrator })}>
                <Navigation to="/pendaftaran" isMinimized={isMinimized} isDisabled={isDisabled}>
                  <ImageUserPlus className="text-lg" />
                  {!isMinimized && <span>Pendaftaran</span>}
                </Navigation>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={24}
                side="right"
                className={cn(
                  "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                  {
                    hidden: !isMinimized,
                  },
                )}>
                <div>
                  <p className="font-aileron text-sm font-semibold">Pendaftaran</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isAsesi && (
            <>
              <TooltipProvider delayDuration={1000} skipDelayDuration={800}>
                <Tooltip>
                  <TooltipTrigger>
                    <Navigation
                      to="/status-pendaftaran"
                      isMinimized={isMinimized}
                      isDisabled={isDisabled}>
                      <FileQuestion02 className="text-lg" />
                      {!isMinimized && <span>Status Pendaftaran</span>}
                    </Navigation>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={24}
                    side="right"
                    className={cn(
                      "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                      {
                        hidden: !isMinimized,
                      },
                    )}>
                    <div>
                      <p className="font-aileron text-sm font-semibold">Status Pendaftaran</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={1000} skipDelayDuration={800}>
                <Tooltip>
                  <TooltipTrigger>
                    <Navigation
                      to="/asesmen-mandiri"
                      isMinimized={isMinimized}
                      isDisabled={isDisabled}>
                      <ImageUserDown className="text-lg" />
                      {!isMinimized && <span>Asesmen Mandiri</span>}
                    </Navigation>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={24}
                    side="right"
                    className={cn(
                      "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                      {
                        hidden: !isMinimized,
                      },
                    )}>
                    <div>
                      <p className="font-aileron text-sm font-semibold">Asesmen Mandiri</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={1000} skipDelayDuration={800}>
                <Tooltip>
                  <TooltipTrigger>
                    <Navigation
                      to="/uji-kompetensi"
                      isMinimized={isMinimized}
                      isDisabled={isDisabled}>
                      <BookClosed className="text-lg" />
                      {!isMinimized && <span>Uji Kompetensi</span>}
                    </Navigation>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={24}
                    side="right"
                    className={cn(
                      "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                      {
                        hidden: !isMinimized,
                      },
                    )}>
                    <div>
                      <p className="font-aileron text-sm font-semibold">Uji Kompetensi</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {isAsesor && (
            <>
              <TooltipProvider delayDuration={1000} skipDelayDuration={800}>
                <Tooltip>
                  <TooltipTrigger>
                    <Navigation
                      to="/jadwal-asesmen"
                      isMinimized={isMinimized}
                      isDisabled={isDisabled}>
                      <CalendarCheck02 className="text-lg" />
                      {!isMinimized && <span>Jadwal Asesmen</span>}
                    </Navigation>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={24}
                    side="right"
                    className={cn(
                      "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                      {
                        hidden: !isMinimized,
                      },
                    )}>
                    <div>
                      <p className="font-aileron text-sm font-semibold">Jadwal Asesmen</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={1000} skipDelayDuration={800}>
                <Tooltip>
                  <TooltipTrigger>
                    <Navigation
                      to="/evaluasi-asesi"
                      isMinimized={isMinimized}
                      isDisabled={isDisabled}>
                      <UsersEdit className="text-lg" />
                      {!isMinimized && <span>Evaluasi Asesi</span>}
                    </Navigation>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={24}
                    side="right"
                    className={cn(
                      "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                      {
                        hidden: !isMinimized,
                      },
                    )}>
                    <div>
                      <p className="font-aileron text-sm font-semibold">Evaluasi Asesi</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {isAdministrator && (
            <>
              <TooltipProvider delayDuration={1000} skipDelayDuration={800}>
                <Tooltip>
                  <TooltipTrigger>
                    <Navigation
                      to="/tinjau-persyaratan"
                      isMinimized={isMinimized}
                      isDisabled={isDisabled}>
                      <FileAttachment04 className="text-lg" />
                      {!isMinimized && <span>Tinjau Persyaratan</span>}
                    </Navigation>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={24}
                    side="right"
                    className={cn(
                      "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                      {
                        hidden: !isMinimized,
                      },
                    )}>
                    <div>
                      <p className="font-aileron text-sm font-semibold">Tinjau Persyaratan</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={1000} skipDelayDuration={800}>
                <Tooltip>
                  <TooltipTrigger>
                    <Navigation
                      to="/penentuan-asesor"
                      isMinimized={isMinimized}
                      isDisabled={isDisabled}>
                      <UserLeft01 className="text-lg" />
                      {!isMinimized && <span>Penentuan Asesor</span>}
                    </Navigation>
                  </TooltipTrigger>
                  <TooltipContent
                    sideOffset={24}
                    side="right"
                    className={cn(
                      "flex h-12 w-max items-center rounded-s-none bg-primary-500 shadow-lg",
                      {
                        hidden: !isMinimized,
                      },
                    )}>
                    <div>
                      <p className="font-aileron text-sm font-semibold">Penentuan Asesor</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
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
                      {namaLengkap}
                    </p>
                    <p className="font-aileron text-xs font-normal text-secondary-500">{role}</p>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <button>
                          <DotsVertical className="text-lg" />
                        </button>
                      </DropdownMenuTrigger>
                      {!isDisabled && (
                        <DropdownMenuContent
                          side="right"
                          sideOffset={40}
                          className="border-none shadow-none">
                          <DropdownMenuItem>
                            <Button size="sm" variant="error" className="gap-2" onClick={logOut}>
                              <LogOut02 />
                              Keluar
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      )}
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              className="items-center gap-2"
              size="sm"
              content={isMinimized && "icon"}
              onClick={() => navigate("/masuk")}>
              <LogIn02 className="p-0 text-lg" />
              <span hidden={isMinimized}>Masuk</span>
            </Button>
          )}
        </footer>
        <div className="absolute right-0 top-12 flex h-16 w-6 translate-x-full rounded-e-lg bg-primary-500 shadow-lg transition-colors hover:bg-primary-600">
          <button
            className="flex h-full w-full items-center justify-center"
            onClick={handleMinimized}>
            <ChevronRight
              className={cn("text-xl text-secondary-500 transition-all duration-300 ease-in-out", {
                "rotate-180": !isMinimized,
              })}
            />
          </button>
        </div>
      </section>
    </>
  );
};
