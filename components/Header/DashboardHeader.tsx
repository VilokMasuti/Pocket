"use client";

import {
  Wallet,
  Bell,
  Settings,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50   shadow-2xl text-white border-border ">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-foreground flex items-center justify-center">
              <Wallet className="h-4 w-4  cursor-pointer" />
            </div>
            <span className="text-sm font-semibold tracking-tight cursor-pointer">
              Pocket Bank
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <Button size="icon" className="h-8 w-8 cursor-pointer ">
              <Bell className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8 cursor-pointer ">
              <Settings className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 gap-2 px-2 cursor-pointer">
                  <Avatar className="">
                    <Image
                      src={"/p.jpg"}
                      alt="Pic"
                      width={40}
                      height={40}
                      className="  object-fill"
                    />
                  </Avatar>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
