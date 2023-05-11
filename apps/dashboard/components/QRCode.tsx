import React, { ComponentPropsWithRef, useEffect, useRef } from 'react';
import * as qrCode from 'qrcode';

import { useVectis } from '~/providers';
import { useAccount } from '~/hooks/useAccount';

const QRCode: React.FC<ComponentPropsWithRef<'canvas'>> = ({ ...props }) => {
  const { account } = useAccount();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    qrCode.toCanvas(canvasRef.current, account!.address, { color: { dark: '#566fa1', light: '#fff' } });
  }, []);

  return <canvas {...props} ref={canvasRef} />;
};

export default QRCode;
