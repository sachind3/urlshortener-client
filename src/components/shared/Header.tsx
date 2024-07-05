//Header.tsx
import { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setLogout } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/services/auth";
import { bigEars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Link as LinkIcon, LogOut } from "lucide-react";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout, { isSuccess: logoutIsSuccess, data: logoutData }] =
    useLogoutMutation();

  useEffect(() => {
    if (logoutIsSuccess && logoutData) {
      dispatch(setLogout());
      toast.success(logoutData.message);
    }
  }, [logoutIsSuccess, logoutData, dispatch]);

  const avatar = useMemo(() => {
    return createAvatar(bigEars, {
      size: 128,
      backgroundColor: ["ec4899"],
    }).toDataUri();
  }, []);
  return (
    <header className="py-3 border-b sticky top-0 z-30 bg-background">
      <div className="container mx-auto px-4 flex gap-4 justify-between items-center">
        <Link to="/" className="text-3xl font-black text-gradient">
          LINKLITE
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LinkIcon size={12} className="mr-1" /> My Links
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-500">
                    <LogOut size={12} className="mr-1" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant={"outline"}>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register Now</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};
export default Header;
