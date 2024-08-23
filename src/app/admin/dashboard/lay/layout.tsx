
export const dynamic = "force-dynamic";


export default function ImageLayout({
  children,
  carosal
}: Readonly<{
  children: React.ReactNode;
  carosal: React.ReactNode;
}>) {
  return (
   
      <div className="">
        {children}
        <div>{carosal}</div>
      </div>
    
  );
}
