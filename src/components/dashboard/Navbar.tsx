import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import MenuOverlay from "./MenuOverlay";
import NotificationsPanel from "./NotificationsPanel";
import UserProfileCard from "./UserProfileCard";
import { notifications } from "@/data/mockData";

const Navbar = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 glass-strong">
        <div className="flex items-center justify-between h-16 px-4 md:px-8">
          {/* Left: menu + logo */}
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} className="neu-card-sm p-2.5 rounded-xl hover:neu-pressed transition-shadow">
              <Menu className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-primary tracking-tight hidden sm:block">CorpDash</h1>
          </div>

          {/* Right: notifications + avatar */}
          <div className="flex items-center gap-3">
            <button onClick={() => setNotifOpen(true)} className="neu-card-sm p-2.5 rounded-xl hover:neu-pressed transition-shadow relative">
              <Bell className="h-5 w-5 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <div
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button className="neu-card-sm rounded-full overflow-hidden w-10 h-10 flex items-center justify-center text-sm font-bold text-primary bg-primary/10">
                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </button>
              <UserProfileCard open={profileOpen} onClose={() => setProfileOpen(false)} />
            </div>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};

export default Navbar;
