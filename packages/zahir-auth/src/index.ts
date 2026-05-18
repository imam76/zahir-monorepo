export { AuthProviderIcon, SignIn, SignUp, UserButton } from "@repo/ui/auth";
export type {
  AuthProviderAction,
  SignInProps,
  SignInValues,
  SignUpProps,
  SignUpValues,
  UserButtonProps,
  UserButtonUser,
} from "@repo/ui/auth";
export {
  createBrowserSessionStorage,
  createZahirAuthClient,
} from "./client.js";
export type {
  CreateZahirAuthClientOptions,
  ZahirAuthClient,
  ZahirAuthSession,
  ZahirAuthStorage,
  ZahirAuthUser,
  ZahirSignInOptions,
} from "./client.js";
export { useZahirAuth, ZahirAuthProvider } from "./provider.js";
export type {
  ZahirAuthContextValue,
  ZahirAuthProviderProps,
} from "./provider.js";
export {
  deleteZahirUserSession,
  getZahirUserSession,
  postZahirSession,
} from "./session.js";
export type { ZahirAuthKeys, ZahirSessionResponse } from "./session.js";
