interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-900">
      {children}
    </div>
  );
}
