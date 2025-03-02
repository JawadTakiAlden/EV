import { useAuthContext } from "../providers/AuthProvider";

export default function Href(path: string) {
  const { user } = useAuthContext();
  const type = user.type;

  return `/${type}/${path}`;
}
