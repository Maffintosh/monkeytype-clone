interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <div className="w-[82vw] mx-auto h-screen flex flex-col justify-center items-center font-mono text-neutral-400 bg-neutral-900">
      {children}
    </div>
  );
}
