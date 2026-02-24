import { useUser, type Role, type Group } from "@/contexts/UserContext";
import NeuCard from "./NeuCard";

const roles: Role[] = ["superAdmin", "admin", "user"];
const groups: Group[] = ["IDP", "TIC", "OP", "RE"];

const RoleSwitcher = () => {
  const { user, setRole, setGroup } = useUser();

  return (
    <NeuCard className="p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        🔧 Selector de prueba
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-muted-foreground self-center mr-1">Rol:</span>
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-shadow ${
              user.role === r
                ? "neu-pressed bg-primary/15 text-primary"
                : "neu-card-sm text-foreground hover:bg-primary/5"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground self-center mr-1">Grupo:</span>
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-shadow ${
              user.group === g
                ? "neu-pressed bg-accent/15 text-accent"
                : "neu-card-sm text-foreground hover:bg-accent/5"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </NeuCard>
  );
};

export default RoleSwitcher;
