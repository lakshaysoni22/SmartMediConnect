import React from 'react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dr. James Wilson',
      role: 'Chief of Surgery',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      rating: 5,
      text: 'The doctor portal has drastically reduced our administrative overhead. I can spend more time treating patients and less time clicking buttons.',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Patient',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Managing appointments used to be a nightmare. Medicare\'s patient portal makes it incredibly simple to find a slot that works for me.',
    },
    {
      name: 'Michael Chen',
      role: 'Hospital Administrator',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 4.5,
      text: 'The hospital admin dashboard gives us the bird\'s eye view we\'ve been missing. Resource allocation is now data-driven, not a guessing game.',
    },
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-slate-900 dark:text-white text-3xl">
            Trusted by Healthcare Professionals
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`material-symbols-outlined ${
                      i < Math.floor(testimonial.rating) ? 'fill-current' : ''
                    } text-[20px]`}
                  >
                    {i < Math.floor(testimonial.rating) ? 'star' : i === Math.floor(testimonial.rating) && testimonial.rating % 1 !== 0 ? 'star_half' : 'star'}
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="size-12 rounded-full ring-2 ring-[#137fec]/20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                ></div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}