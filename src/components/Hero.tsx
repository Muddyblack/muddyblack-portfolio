import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover scale-[1.02] transform transition-transform duration-[20s] hover:scale-[1.1]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b dark:from-black/40 dark:via-black/30 dark:to-background
                        from-black/20 via-black/15 to-background/70" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Muddy<span className="text-accent">black</span>
          </h1>
          <div className="space-y-4 max-w-xl">
            <p className="text-xl md:text-2xl text-white dark:text-white/90 font-light">
              Hello There! Welcome to my page
            </p>
          </div>
          <button className="mt-4 px-8 py-3 bg-accent text-white rounded-lg 
                           hover:bg-accent/90 transform transition-all hover:translate-y-[-2px] 
                           hover:shadow-lg hover:shadow-accent/20">
            Let&apos;s Connect
          </button>
        </div>
      </div>
    </section>
  );
}
