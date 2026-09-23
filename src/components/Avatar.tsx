import profile from '../assets/profile.png';

export default function Avatar({ size = 32 }: { size?: number }) {
  return <img className="avatar" src={profile} alt="" width={size} height={size} style={{ width: size, height: size }} />;
}
