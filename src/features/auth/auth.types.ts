export interface AuthValue {
  user: string | null;
  isLoggedIn: boolean;
  login: (name: string) => void;
  logout: () => void;
}
