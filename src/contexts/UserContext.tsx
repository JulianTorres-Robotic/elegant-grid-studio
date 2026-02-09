import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "superAdmin" | "admin" | "user";
export type Group = "IDP" | "TIC" | "OP" | "RE";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  group: Group;
}

interface UserContextType {
  user: UserProfile;
  setRole: (role: Role) => void;
  setGroup: (group: Group) => void;
}

const defaultUser: UserProfile = {
  id: "1",
  name: "Carlos Mendoza",
  email: "carlos.mendoza@empresa.com",
  avatar: "",
  role: "superAdmin",
  group: "TIC",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const setRole = (role: Role) => setUser((prev) => ({ ...prev, role }));
  const setGroup = (group: Group) => setUser((prev) => ({ ...prev, group }));

  return (
    <UserContext.Provider value={{ user, setRole, setGroup }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
