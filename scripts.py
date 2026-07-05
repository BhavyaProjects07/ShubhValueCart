return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 mt-10">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 relative overflow-hidden">

        {/* HEADER — Amazon navy band with Flipkart-blue CTA */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-[#131921] to-[#232f3e]">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="p-2 bg-[#FF9900] rounded-lg shrink-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#131921]" fill="#131921" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight truncate">
                Deal of the Day
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-300 hidden sm:block">
                Handpicked offers, refreshed every 24 hours
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Live countdown pill */}
            <div className="hidden xs:flex flex-col items-end">
              <span className="text-[10px] sm:text-xs text-gray-300 leading-none mb-1">
                Ends in
              </span>
              <span className="font-mono font-bold text-[#FF9900] text-sm sm:text-base tabular-nums bg-black/30 px-2 py-1 rounded-md">
                {formatClock(msLeft)}
              </span>
            </div>

            <button className="bg-[#2874F0] hover:bg-[#1f5ed6] active:scale-95 transition-all text-white px-3 sm:px-5 py-2 rounded-lg font-semibold flex items-center gap-1 text-xs sm:text-base shadow-sm whitespace-nowrap">
              <span className="hidden sm:inline">View All Deals</span>
              <span className="sm:hidden">View All</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-8 relative">

          {/* LEFT BUTTON */}
          {!atStart && (
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            onScroll={updateEdges}
            className="deal-scroll flex overflow-x-auto gap-4 sm:gap-5 scroll-smooth snap-x snap-mandatory pb-3"
          >
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="shrink-0 w-[160px] sm:w-[220px] h-[280px] sm:h-[320px] rounded-xl bg-gray-100 animate-pulse border border-gray-100"
                />
              ))}

            {!loading && visibleDeals.length === 0 && (
              <div className="w-full py-10 text-center text-gray-500 text-sm">
                No deals live right now — check back soon.
              </div>
            )}

            {!loading &&
              visibleDeals.map((deal) => {
                const claimed = hashToRange(deal.id, 34, 91)
                const rating = (hashToRange(deal.id, 38, 50) / 10).toFixed(1)
                const mrp = deal.mrp ?? deal.originalPrice
                const price = deal.price
                const hasDiscount =
                  typeof mrp === "number" &&
                  typeof price === "number" &&
                  mrp > price
                const discountPct = hasDiscount
                  ? Math.round(((mrp - price) / mrp) * 100)
                  : deal.discount

                return (
                  <div
                    key={deal.id}
                    className="relative shrink-0 snap-start rounded-xl border border-gray-200 hover:border-[#FF9900] hover:shadow-lg transition-all duration-200 bg-white overflow-hidden group/card"
                  >
                    {/* Discount ribbon — Flipkart-green corner tag */}
                    {discountPct ? (
                      <div className="absolute top-2 left-2 z-10 bg-[#388E3C] text-white text-[11px] font-bold px-2 py-1 rounded-md shadow-sm">
                        {discountPct}% OFF
                      </div>
                    ) : null}

                    {/* Assured / trust badge */}
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 bg-white/95 text-[#2874F0] text-[10px] font-semibold px-1.5 py-1 rounded-md shadow-sm border border-blue-100">
                      <ShieldCheck className="w-3 h-3" />
                      Assured
                    </div>

                    <div className="group-hover/card:scale-[1.02] transition-transform duration-200">
                      <ProductCard product={deal} isScrollable />
                    </div>

                    {/* Rating strip */}
                    <div className="flex items-center gap-1 px-3 pt-1 text-[11px] text-gray-600">
                      <span className="flex items-center gap-0.5 bg-[#388E3C] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {rating} <Star className="w-2.5 h-2.5" fill="white" />
                      </span>
                      <span>({hashToRange(deal.id, 120, 4800)})</span>
                    </div>

                    {/* Stock urgency bar */}
                    <div className="px-3 pb-3 pt-2">
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FF9900] to-[#cc0c39] rounded-full"
                          style={{ width: `${claimed}%` }}
                        />
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-[#cc0c39] font-semibold mt-1">
                        {claimed}% claimed
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>

          {/* RIGHT BUTTON */}
          {!atEnd && (
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .deal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f3f6;
        }
        .deal-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .deal-scroll::-webkit-scrollbar-track {
          background: #f1f3f6;
          border-radius: 8px;
        }
        .deal-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        .deal-scroll::-webkit-scrollbar-thumb:hover {
          background: #ff9900;
        }
        @media (max-width: 767px) {
          .deal-scroll {
            scrollbar-width: none;
          }
          .deal-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  )