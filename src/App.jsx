import React, { useState } from 'react';
import {
  Compass, MapPin, Calendar, Clock, Star, Sparkles, Navigation,
  Bed, CheckCircle2, ArrowRight, Play, Terminal, Wrench, Heart, BookmarkCheck, Search
} from 'lucide-react';

// ai tool calling schema

const TRAVEL_TOOLS = [
  {
    name: "planCityTrip",
    description: "Generates itinerary timeline, selects boutique hotels, and calculates map coordinates for a destination.",
    parameters: { destination: "string", days: "number", vibe: "string" }
  }
];

// components

// 1. Sleek Interactive Map (Airbnb Clean Style)
function InteractiveMap({ city, lat, lon, stops = [] }) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.05}%2C${lat - 0.03}%2C${lon + 0.05}%2C${lat + 0.03}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white shadow-xs">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EBEBEB]">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#FF385C]" />
          <h3 className="text-sm font-semibold text-[#222222]">{city}</h3>
        </div>
        <span className="text-xs text-[#717171]">Map & Key Locations</span>
      </div>

      <div className="h-64 w-full bg-[#F7F7F7]">
        <iframe
          title="City Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl}
          className="opacity-95"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 p-3.5 bg-white border-t border-[#EBEBEB] text-xs">
        <span className="text-xs font-medium text-[#717171] mr-1">Highlights:</span>
        {stops.map((stop, i) => (
          <span key={i} className="rounded-full bg-[#F7F7F7] border border-[#EBEBEB] px-2.5 py-1 text-xs text-[#222222]">
            {stop}
          </span>
        ))}
      </div>
    </div>
  );
}

// 2. Hotel Card (Airbnb Stay Style)
function HotelCard({ hotel }) {
  const [saved, setSaved] = useState(false);
  const [reserved, setReserved] = useState(false);

  return (
    <div className="group rounded-2xl border border-[#EBEBEB] bg-white p-3.5 shadow-xs hover:shadow-md transition">
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-[#F7F7F7]">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-102"
        />
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#222222] shadow-xs hover:scale-110 transition cursor-pointer"
          aria-label="Save to wishlist"
        >
          <Heart size={16} className={saved ? "fill-[#FF385C] text-[#FF385C]" : "text-[#222222]"} />
        </button>
      </div>

      <div className="pt-3.5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-[#222222] leading-snug">{hotel.name}</h3>
            <p className="text-xs text-[#717171] mt-0.5">{hotel.neighborhood}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#222222] shrink-0">
            <Star size={13} className="fill-[#222222] text-[#222222]" />
            <span>{hotel.rating}</span>
          </div>
        </div>

        <p className="text-xs text-[#717171] line-clamp-2">{hotel.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-[#F0F0F0]">
          <div>
            <span className="text-base font-bold text-[#222222]">{hotel.price}</span>
            <span className="text-xs text-[#717171]"> / night</span>
          </div>

          <button
            onClick={() => setReserved(!reserved)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition cursor-pointer ${
              reserved
                ? 'bg-emerald-600 text-white'
                : 'bg-[#222222] text-white hover:bg-[#FF385C]'
            }`}
          >
            {reserved ? 'Reserved' : 'Reserve'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Curated Day-By-Day Itinerary (Airbnb Experience Style)
function ItineraryTimeline({ days = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white p-6 md:p-8 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#222222]">Daily Itinerary</h3>
          <p className="text-xs text-[#717171] mt-0.5">Handpicked highlights & local experiences</p>
        </div>
        <span className="rounded-full bg-[#F7F7F7] border border-[#EBEBEB] px-3 py-1 text-xs font-semibold text-[#222222]">
          {days.length} Days
        </span>
      </div>

      <div className="mt-6 space-y-8">
        {days.map((d, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#222222] text-[11px] font-bold text-white shrink-0">
                {d.day}
              </span>
              <h4 className="text-sm font-semibold text-[#222222]">{d.title}</h4>
            </div>

            {/* Vertical Connector Line */}
            <div className="relative pl-6 space-y-3.5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#EBEBEB]">
              {d.activities.map((act, i) => (
                <div key={i} className="relative rounded-xl border border-[#EBEBEB] bg-white p-4 shadow-xs transition hover:border-[#DDDDDD] hover:shadow-xs">
                  {/* Timeline Dot Marker */}
                  <span className="absolute -left-[16.5px] top-4.5 h-2 w-2 rounded-full border-2 border-white bg-[#222222]" />

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#222222]">
                        <Clock size={12} className="text-[#717171]" />
                        <span>{act.time}</span>
                      </div>
                      <span className="rounded-full bg-[#F7F7F7] border border-[#EBEBEB] px-2.5 py-0.5 text-[10px] font-medium text-[#717171]">
                        {act.category}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#222222]">{act.spot}</p>
                    <p className="text-xs text-[#717171] leading-relaxed">
                      <span className="font-medium text-[#222222]">Local tip:</span> {act.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Components registration

const COMPONENT_REGISTRY = {
  InteractiveMap,
  HotelCard,
  ItineraryTimeline
};

// Main ui

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [executionTrace, setExecutionTrace] = useState(null);
  const [activeTrip, setActiveTrip] = useState({
    city: "Lisbon, Portugal",
    lat: 38.7223,
    lon: -9.1393,
    stops: ["Belém Tower", "Alfama District", "Time Out Market"],
    hotel: {
      name: "The Lumiares Boutique Hotel & Spa",
      neighborhood: "Bairro Alto",
      price: "$195",
      rating: "4.92",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80",
      description: "Rooftop terrace overlooking the Tagus river with luxury artisanal suites."
    },
    days: [
      {
        day: 1,
        title: "Historic Tram 28 & Alfama Sunset",
        activities: [
          { time: "09:30 AM", spot: "Pastéis de Belém", category: "Food", tip: "Get the warm cinnamon custard tarts early." },
          { time: "02:00 PM", spot: "Castelo de São Jorge", category: "Culture", tip: "Panoramic view over the terracotta rooftops." },
          { time: "06:30 PM", spot: "Miradouro de Santa Luzia", category: "Sightseeing", tip: "Live acoustic Fado music at golden hour." }
        ]
      },
      {
        day: 2,
        title: "Coastal Breeze & Culinary Discovery",
        activities: [
          { time: "11:00 AM", spot: "LX Factory Arts District", category: "Shopping", tip: "Browse independent design print shops." },
          { time: "01:30 PM", spot: "Time Out Market Lisboa", category: "Food", tip: "Try the seared garlic prawns at Henrique Sá Pessoa." },
          { time: "05:00 PM", spot: "Belém Tower Waterfront Walk", category: "Walk", tip: "Grab rental electric bikes by the marina." }
        ]
      }
    ]
  });

  const presets = [
    { label: "3 Days in Lisbon", prompt: "Plan a 3-day romantic weekend in Lisbon with historic sights and boutique hotels under $200" },
    { label: "48h in Tokyo", prompt: "Plan 48 hours in Tokyo focused on Shibuya, digital art, and ramen spots" },
    { label: "Weekend in Rome", prompt: "Plan a weekend in Rome with ancient architecture, Trastevere dining, and boutique stay" }
  ];

  // Tool-Calling Execution Simulator (What a real tool call returns)
  const runAgentTool = (query) => {
    setLoading(true);
    setExecutionTrace(null);

    setTimeout(() => {
      const q = (query || prompt).toLowerCase();
      let payload = activeTrip;

      if (q.includes("tokyo")) {
        payload = {
          city: "Tokyo, Japan",
          lat: 35.6762,
          lon: 139.6503,
          stops: ["Shibuya Sky", "teamLab Planets", "Shinjuku Gyoen"],
          hotel: {
            name: "Trunk Hotel Yoyogi Park",
            neighborhood: "Shibuya",
            price: "$280",
            rating: "4.96",
            image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80",
            description: "Minimalist concrete sanctuary with heated rooftop infinity pool."
          },
          days: [
            {
              day: 1,
              title: "Futuristic Visuals & High-Altitude Views",
              activities: [
                { time: "10:00 AM", spot: "teamLab Planets Toyosu", category: "Exhibition", tip: "Pre-book tickets; barefoot immersion experience." },
                { time: "03:00 PM", spot: "Shibuya Crossing & Hachiko", category: "Sightseeing", tip: "Best view from the 7th floor Starbucks lounge." },
                { time: "07:30 PM", spot: "Omoide Yokocho Alley", category: "Dining", tip: "Cozy 6-seat yakitori stalls under paper lanterns." }
              ]
            }
          ]
        };
      } else if (q.includes("rome")) {
        payload = {
          city: "Rome, Italy",
          lat: 41.9028,
          lon: 12.4964,
          stops: ["Colosseum", "Pantheon", "Trastevere Alleyways"],
          hotel: {
            name: "Chapter Roma Boutique Hotel",
            neighborhood: "Regola",
            price: "$210",
            rating: "4.91",
            image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80",
            description: "Art-deco industrial aesthetic located in the historic Jewish Ghetto quarter."
          },
          days: [
            {
              day: 1,
              title: "Imperial Monuments & Pasta Classics",
              activities: [
                { time: "09:00 AM", spot: "The Colosseum & Forum", category: "Ancient", tip: "Gladiator arena floor entrance bypasses lines." },
                { time: "01:00 PM", spot: "Roscioli Salumeria", category: "Food", tip: "World-class Carbonara; make reservations 2 weeks ahead." },
                { time: "05:00 PM", spot: "Trevi Fountain & Gelato", category: "Walk", tip: "Toss a coin over your left shoulder with right hand." }
              ]
            }
          ]
        };
      }

      setExecutionTrace({
        tool: "planCityTrip",
        args: { destination: payload.city, days: payload.days.length },
        status: "COMPLETED",
        executionTime: "480ms"
      });

      setActiveTrip(payload);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white text-[#222222] font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">

        {/* Top Header */}
        <header className="flex items-center justify-between border-b border-[#EBEBEB] pb-5">
          <div className="flex items-center gap-1.5">
            <img src="/footstep-svg.svg" alt="Footsteps" className="h-6 w-6 object-contain" />
            <span className="text-xl font-bold tracking-tight text-[#222222]">
              AI Travel Planner
            </span>
          </div>
        </header>

        {/* Search Bar & Destination Pills */}
        <div className="space-y-4 max-w-3xl mx-auto pt-2">
          {/* Free-floating Airbnb Capsule */}
          <div className="flex items-center rounded-full border border-[#DDDDDD] bg-white p-2 pl-6 shadow-sm hover:shadow-md transition-shadow focus-within:shadow-md focus-within:border-[#222222]">
            <input
              type="text"
              placeholder="Where to next? (e.g., 3 days in Lisbon, weekend in Rome...)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runAgentTool()}
              className="w-full bg-transparent text-sm font-medium text-[#222222] placeholder:text-[#717171] focus:outline-none"
            />
            <button
              onClick={() => runAgentTool()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF385C] hover:bg-[#E00B41] px-5 py-2.5 text-xs font-bold text-white transition disabled:opacity-50 cursor-pointer shrink-0 shadow-xs"
            >
              <Search size={14} strokeWidth={2.5} />
              <span>Search</span>
            </button>
          </div>

          {/* Clean Category / Destination Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-xs text-[#717171] font-medium mr-1">Inspiration:</span>
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => { setPrompt(p.prompt); runAgentTool(p.prompt); }}
                className="rounded-full border border-[#EBEBEB] bg-[#F7F7F7] hover:bg-white hover:border-[#222222] px-3.5 py-1.5 text-xs font-medium text-[#222222] transition cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="h-64 rounded-2xl bg-[#F0F0F0] animate-pulse" />
            <div className="h-64 rounded-2xl bg-[#F0F0F0] animate-pulse" />
            <div className="md:col-span-2 h-72 rounded-2xl bg-[#F0F0F0] animate-pulse" />
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#EBEBEB] pb-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#222222]">
                Trip Plan for {activeTrip.city}
              </h2>
              <span className="text-xs text-[#717171]">Curated stay & itinerary</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Component 1: Interactive Map */}
              <div className="md:col-span-1">
                <InteractiveMap
                  city={activeTrip.city}
                  lat={activeTrip.lat}
                  lon={activeTrip.lon}
                  stops={activeTrip.stops}
                />
              </div>

              {/* Component 2: Hotel Card */}
              <div className="md:col-span-1">
                <HotelCard hotel={activeTrip.hotel} />
              </div>

              {/* Component 3: Curated Itinerary */}
              <div className="md:col-span-2">
                <ItineraryTimeline days={activeTrip.days} />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-[#EBEBEB] pt-8 pb-12 text-center text-xs text-[#717171]">
          <p>© {new Date().getFullYear()} AI Travel Planner · Designed for thoughtful travel</p>
        </footer>

      </div>
    </div>
  );
}