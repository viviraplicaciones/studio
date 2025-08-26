'use client';

import Image from 'next/image';

const SplashScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
      <div className="overflow-hidden rounded-full shadow-2xl">
        <Image
          src="https://raw.githubusercontent.com/viviraplicaciones/tablaperiodica/refs/heads/main/conexion.gif"
          alt="Cargando animación"
          width={200}
          height={200}
          unoptimized
          priority
        />
      </div>
      <p className="mt-8 text-lg font-semibold text-foreground">
        Cargando Tabla Periódica...
      </p>
    </div>
  );
};

export default SplashScreen;
