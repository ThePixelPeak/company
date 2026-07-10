export default function About({ data, isEditable, onUpdate }) {
  return (
    <section className="w-full py-6 md:py-24" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 w-full flex justify-center relative z-10">
        <div className="max-w-3xl text-center">
          <h2 
            className={`text-[clamp(2rem,6vw,4.5rem)] font-black tracking-tighter mb-8 text-white leading-tight ${isEditable ? 'cursor-text outline-none hover:bg-white/5 rounded' : ''}`}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => isEditable && onUpdate?.('about', 'title', e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: data?.title || "We don't follow trends.<br/><span class='text-teal-400'>We code them.</span>" }}
          />
          <p 
            className={`text-[clamp(1.125rem,4vw,1.25rem)] text-slate-400 leading-relaxed font-medium ${isEditable ? 'cursor-text outline-none hover:bg-white/5 rounded p-1' : ''}`}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => isEditable && onUpdate?.('about', 'description', e.currentTarget.textContent)}
          >
            {data?.description || "At Pixelpeak, we view marketing as an engineering discipline."}
          </p>
        </div>
      </div>
    </section>
  );
}
