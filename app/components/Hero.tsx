// components/Hero.tsx
export default function Hero() {
  return (
    <section
      id="hero"
      className="reveal h-[80vh] flex flex-col items-center justify-center text-center 
                 bg-gradient-to-b from-black via-[#28003c] to-black"
    >
      <div className="animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          1Day Studio Band
        </h1>
        <p className="text-purple-400 text-lg md:text-xl">
          音楽仲間とつくる、最高の一日。
        </p>
      </div>
    </section>
  );
}
