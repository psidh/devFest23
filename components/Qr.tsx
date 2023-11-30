import QRCode from 'react-qr-code';

interface Data {
  email: string
  size: number
}

export default function Qr({ email , size}: Data) {
  return (
    <div>
      <QRCode value={email} size={size} />
    </div>
  );
}