export default function About() {
  return (
    <section className="w-full py-24" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 w-full flex justify-center md:justify-end relative z-10">
        <div className="max-w-2xl text-center md:text-right">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-white leading-tight">
            We don't follow trends.<br/>
            <span className="text-teal-400">We code them.</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            At Pixelpeak, we view marketing as an engineering discipline. By combining big data analytics with cutting-edge front-end architecture, we build digital ecosystems that consistently outmaneuver the competition.
          </p>
        </div>
      </div>
    </section>
  );
}
