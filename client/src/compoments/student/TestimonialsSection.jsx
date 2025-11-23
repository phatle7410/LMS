import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className="pb-14 px-4 sm:px-6 md:px-0">
      <h2 className="text-2xl sm:text-3xl font-medium text-gray-800">
        Đánh Giá
      </h2>

      <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-xl">
        Nghe chia sẻ từ các bậc phụ huynh học viên về hành trình học tập của con em
      </p>

      {/* Grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-4 sm:px-5 py-4 bg-gray-500/10">
              <img
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-base sm:text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80 text-xs sm:text-sm">{testimonial.role}</p>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-5 pt-4 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-4 sm:h-5"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                {testimonial.feedback}
              </p>
            </div>

            <a href="#" className="text-blue-500 underline px-4 sm:px-5 text-sm sm:text-base">
              Đọc Thêm
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
