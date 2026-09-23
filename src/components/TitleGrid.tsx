import type { Title } from '../data/types';
import TitleCard from './TitleCard';

export default function TitleGrid({ titles }: { titles: Title[] }) {
  return (
    <div className="title-grid">
      {titles.map((t) => (
        <TitleCard key={t.id} title={t} />
      ))}
    </div>
  );
}
