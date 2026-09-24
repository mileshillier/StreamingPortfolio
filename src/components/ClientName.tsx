import type { Title } from '../data/types';

/** Client logo when one is supplied, otherwise the client's name as text. */
export default function ClientName({ title }: { title: Title }) {
  if (!title.clientLogo) return <>{title.client}</>;
  return <img className="client-logo" src={title.clientLogo} alt={title.client} />;
}
