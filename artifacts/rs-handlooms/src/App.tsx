import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  Heart,
  Instagram,
  Layers,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Category = 'all' | 'silks' | 'everyday' | 'gifting';
type ReviewFilter = 'all' | 'silks' | 'value';

const collections = [
  {
    id: '01',
    name: 'Silk stories',
    note: 'Kanjivaram, Mysore & soft silk',
    tag: 'For the occasion',
    tone: 'bg-[#19334d]',
    image: '/silk-lake.jpg',
    category: 'silks' as Category,
  },
  {
    id: '02',
    name: 'Everyday drapes',
    note: 'Easy cottons with a little shine',
    tag: 'For every day',
    tone: 'bg-[#8f443d]',
    image: '/loom-detail.jpg',
    category: 'everyday' as Category,
  },
  {
    id: '03',
    name: 'Gifts with a story',
    note: 'Thoughtful pieces, honestly priced',
    tag: 'For someone dear',
    tone: 'bg-[#c5a35e]',
    image: '/silk-lake.jpg',
    category: 'gifting' as Category,
  },
];

const reviews = [
  {
    quote: 'A lovely variety of silks and artificial clothing. The collection is good and the prices are the best I found around here.',
    name: 'Sowmya R.',
    detail: 'Local guide · visited recently',
    filter: 'silks' as ReviewFilter,
  },
  {
    quote: 'Value for money, without feeling like a compromise. They took time to explain the weave and helped me find exactly what I wanted.',
    name: 'Lakshmi K.',
    detail: 'Neighbourhood shopper',
    filter: 'value' as ReviewFilter,
  },
  {
    quote: 'Good collection and warm service. It feels nice to buy from a shop that remembers the people behind the saree.',
    name: 'Anitha S.',
    detail: 'Verified visit',
    filter: 'all' as ReviewFilter,
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContactOpen(false);
        setMobileMenu(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const visibleCollections = activeCategory === 'all'
    ? collections
    : collections.filter((item) => item.category === activeCategory);
  const visibleReviews = reviewFilter === 'all'
    ? reviews
    : reviews.filter((review) => review.filter === reviewFilter || review.filter === 'all');

  const openDirections = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=R%20S%20Handlooms%201st%20main%2017th%20Cross%20Rd%20Agrahara%20Layout%20Bengaluru',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => {
      setContactOpen(false);
      setSent(false);
    }, 2200);
  };

  return (
    <main className="noise min-h-[100dvh] overflow-x-hidden bg-[#f1eadf] text-[#213047]">
      <header className="sticky top-0 z-40 border-b border-[#d9ccb9]/80 bg-[#f1eadf]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="group flex items-center gap-3 text-left"
            data-testid="button-brand-top"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-[#213047] font-data text-[11px] font-bold tracking-[-.1em] transition-colors group-hover:bg-[#c6a45e]">
              RS
            </span>
            <span>
              <span className="block font-display text-[18px] leading-none text-[#213047]">R S Handlooms</span>
              <span className="mt-1 block font-data text-[8px] uppercase tracking-[.2em] text-[#93615b]">Bengaluru · Since the beginning</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {[
              ['The edit', 'collection'],
              ['Our way', 'story'],
              ['Neighbourhood notes', 'reviews'],
              ['Come by', 'visit'],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-data text-[10px] uppercase tracking-[.16em] text-[#596270] transition-colors hover:text-[#93615b]"
                data-testid={`link-nav-${id}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="hidden items-center gap-2 border border-[#213047] px-4 py-2.5 font-data text-[10px] uppercase tracking-[.14em] transition-all hover:bg-[#213047] hover:text-[#f1eadf] sm:flex"
              data-testid="button-header-enquiry"
            >
              <MessageCircle size={14} strokeWidth={1.6} />
              Enquire
            </button>
            <button
              type="button"
              onClick={() => setMobileMenu((value) => !value)}
              className="flex h-10 w-10 items-center justify-center border border-[#d1c2ad] md:hidden"
              aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
              data-testid="button-mobile-menu"
            >
              {mobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="border-t border-[#d9ccb9] bg-[#f1eadf] px-5 py-5 md:hidden" aria-label="Mobile navigation">
            <div className="grid gap-1">
              {[
                ['The edit', 'collection'],
                ['Our way', 'story'],
                ['Neighbourhood notes', 'reviews'],
                ['Come by', 'visit'],
              ].map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center justify-between border-b border-[#d9ccb9] py-3 font-data text-[10px] uppercase tracking-[.15em]"
                  data-testid={`link-mobile-nav-${id}`}
                >
                  {label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenu(false);
                  setContactOpen(true);
                }}
                className="mt-3 flex items-center gap-2 bg-[#213047] px-4 py-3 text-left font-data text-[10px] uppercase tracking-[.15em] text-[#f1eadf]"
                data-testid="button-mobile-enquiry"
              >
                <MessageCircle size={14} />
                Start an enquiry
              </button>
            </div>
          </nav>
        )}
      </header>

      <section id="top" className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:min-h-[calc(100dvh-72px)] md:grid-cols-[1.02fr_.98fr] md:gap-8 md:py-20 lg:px-12 lg:pb-24">
        <div className="relative z-10 max-w-[680px]">
          <div className="reveal flex items-center gap-3 font-data text-[10px] uppercase tracking-[.2em] text-[#93615b]">
            <span className="h-[1px] w-10 bg-[#93615b]" />
            A neighbourhood silk house
          </div>
          <h1 className="reveal reveal-delay-1 mt-7 max-w-[680px] font-display text-[clamp(3.5rem,8.5vw,7.8rem)] leading-[.9] tracking-[-.055em] text-[#213047]">
            Sarees that
            <span className="block pl-[.18em] text-[#93615b]">stay with you.</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-[470px] text-[15px] leading-7 text-[#596270]">
            Come for the colour. Stay for the story. At R S Handlooms, beautiful silk, easy cotton and honest advice meet under one roof in Agrahara Layout.
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId('collection')}
              className="group flex items-center gap-4 bg-[#213047] px-5 py-3.5 font-data text-[10px] uppercase tracking-[.16em] text-[#f1eadf] transition-colors hover:bg-[#93615b]"
              data-testid="button-browse-collection"
            >
              Browse the edit
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </button>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="flex items-center gap-2 px-3 py-3 font-data text-[10px] uppercase tracking-[.16em] text-[#596270] transition-colors hover:text-[#93615b]"
              data-testid="button-hero-enquiry"
            >
              <Phone size={15} strokeWidth={1.5} />
              Ask what is in store
            </button>
          </div>
          <div className="reveal reveal-delay-3 mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#d9ccb9] pt-5">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl">4.8</span>
              <span className="flex gap-0.5 text-[#b18435]">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}
              </span>
              <span className="font-data text-[9px] uppercase tracking-[.12em] text-[#727875]">26 reviews</span>
            </div>
            <span className="hidden h-5 w-px bg-[#d9ccb9] sm:block" />
            <div className="flex items-center gap-2 font-data text-[9px] uppercase tracking-[.14em] text-[#727875]">
              <Clock3 size={14} className="text-[#93615b]" />
              Open 24 hours
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[570px] md:justify-self-end">
          <div className="absolute -right-5 -top-8 h-40 w-40 rounded-full border border-[#c6a45e]/50 sm:-right-10 sm:-top-12 sm:h-60 sm:w-60" />
          <div className="absolute -bottom-7 -left-4 z-20 hidden w-44 bg-[#213047] p-5 text-[#f1eadf] sm:block lg:-left-12">
            <div className="mb-10 flex items-center justify-between">
              <Sparkles size={18} className="text-[#c6a45e]" />
              <span className="font-data text-[9px] uppercase tracking-[.14em] text-[#c6a45e]">A note from us</span>
            </div>
            <p className="font-display text-[19px] leading-[1.18]">Every weave holds a little bit of somebody’s day.</p>
          </div>
          <div className="relative aspect-[.82] overflow-hidden bg-[#19334d] shadow-[20px_24px_0_#d9ccb9] sm:aspect-[.9]">
            <img src="/silk-lake.jpg" alt="Indigo silk saree folded on a weaving table" className="h-full w-full object-cover opacity-90 mix-blend-screen" />
            <div className="fabric-shimmer absolute -left-1/2 top-1/3 h-1/3 w-[190%] rotate-[-24deg] bg-[#c6a45e]/25 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#19334d]/85 via-transparent to-[#19334d]/10" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#f1eadf]">
              <div>
                <p className="font-data text-[9px] uppercase tracking-[.2em] text-[#d9bb78]">The material of memory</p>
                <p className="mt-2 font-display text-3xl">Silk, up close.</p>
              </div>
              <span className="font-data text-[11px]">01 / 04</span>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-[#d9ccb9] bg-[#e9ddcb] py-3">
        <div className="marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...Array(2)].flatMap((_, groupIndex) => [
            'Honest prices',
            'Silks with a story',
            'Delivery available',
            'A little closer to the weaver',
            'Bengaluru, 560064',
          ].map((item, index) => (
            <span key={`${groupIndex}-${index}`} className="flex items-center gap-8 font-data text-[10px] uppercase tracking-[.18em] text-[#93615b]">
              {item}
              <span className="text-[#c6a45e]">◆</span>
            </span>
          )))}
        </div>
      </div>

      <section id="collection" className="mx-auto max-w-[1320px] scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[.2em] text-[#93615b]">01 / The edit</p>
            <h2 className="mt-5 max-w-[560px] font-display text-5xl leading-[.98] tracking-[-.04em] sm:text-6xl">A good saree knows what it wants to be.</h2>
          </div>
          <p className="max-w-[320px] text-sm leading-6 text-[#596270]">Not an endless catalogue. Just a considered selection for the day, the wedding and all the days in between.</p>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-[#d9ccb9] pb-4">
          {([
            ['all', 'Everything'],
            ['silks', 'Silks'],
            ['everyday', 'Everyday'],
            ['gifting', 'Gifting'],
          ] as [Category, string][]).map(([category, label]) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-data text-[10px] uppercase tracking-[.15em] transition-colors ${activeCategory === category ? 'bg-[#213047] text-[#f1eadf]' : 'text-[#727875] hover:text-[#213047]'}`}
              data-testid={`button-filter-${category}`}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto hidden items-center gap-2 font-data text-[9px] uppercase tracking-[.12em] text-[#727875] sm:flex">
            <ShoppingBag size={13} />
            Delivered across Bengaluru
          </span>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visibleCollections.map((item, index) => (
            <article key={item.id} className={`group relative ${index === 1 ? 'md:mt-12' : ''}`} data-testid={`card-collection-${item.id}`}>
              <div className={`relative aspect-[.86] overflow-hidden ${item.tone}`}>
                <img src={item.image} alt={`${item.name} from R S Handlooms`} className="h-full w-full object-cover opacity-75 mix-blend-screen transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#182940]/85 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 border border-[#f1eadf]/50 px-2 py-1 font-data text-[9px] uppercase tracking-[.14em] text-[#f1eadf]">{item.tag}</span>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#f1eadf]">
                  <div>
                    <h3 className="font-display text-3xl">{item.name}</h3>
                    <p className="mt-1 text-xs text-[#ded2c3]">{item.note}</p>
                  </div>
                  <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-b border-[#d9ccb9] pb-3 font-data text-[9px] uppercase tracking-[.14em] text-[#727875]">
                <span>Explore in store</span>
                <span>0{index + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="scroll-mt-20 bg-[#213047] text-[#f1eadf]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-[.8fr_1.2fr] md:gap-20 lg:px-12 lg:py-32">
          <div className="relative order-2 md:order-1">
            <div className="absolute -left-4 -top-4 h-full w-full border border-[#c6a45e]/60" />
            <div className="relative aspect-[.95] overflow-hidden bg-[#8f443d]">
              <img src="/loom-detail.jpg" alt="Hands weaving silk on a traditional handloom" className="h-full w-full object-cover opacity-80 mix-blend-screen" />
              <div className="absolute inset-0 bg-[#19334d]/20" />
              <div className="absolute bottom-5 left-5 font-data text-[9px] uppercase tracking-[.16em] text-[#f0dca7]">A closer look / 02</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="font-data text-[10px] uppercase tracking-[.2em] text-[#d9bb78]">02 / Our way</p>
            <h2 className="mt-5 max-w-[630px] font-display text-5xl leading-[.95] tracking-[-.04em] text-[#f1eadf] sm:text-6xl">Less noise. More feeling.</h2>
            <div className="mt-8 grid max-w-[600px] gap-6 text-[15px] leading-7 text-[#c5cbd0]">
              <p>We are a small, independent clothing store in Agrahara Layout. The kind of place where you can touch the border, ask the same question twice and take your time deciding.</p>
              <p>Our collection brings together familiar silk traditions and everyday pieces at prices that feel fair — for you and for the people whose hands made them.</p>
            </div>
            <div className="mt-10 grid max-w-[560px] grid-cols-2 gap-6 border-t border-[#566174] pt-6 sm:grid-cols-3">
              {[
                [<Layers size={18} />, 'Many weaves', 'Silk to easy cotton'],
                [<Heart size={18} />, 'Honest advice', 'No hard selling'],
                [<Users size={18} />, 'Closer to craft', 'Supporting weavers'],
              ].map(([icon, title, detail]) => (
                <div key={title as string} className="flex flex-col gap-2">
                  <span className="text-[#c6a45e]">{icon}</span>
                  <span className="font-data text-[10px] uppercase tracking-[.12em] text-[#f1eadf]">{title}</span>
                  <span className="text-xs text-[#aeb8c0]">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 md:grid-cols-[.85fr_1.15fr] md:items-start">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[.2em] text-[#93615b]">03 / The little things</p>
            <h2 className="mt-5 max-w-[430px] font-display text-5xl leading-[.98] tracking-[-.04em] sm:text-6xl">Make space for the right one.</h2>
          </div>
          <div className="grid border-t border-[#d9ccb9]">
            {[
              ['01', 'A slower browse', 'No rushed decisions. Pull up a chair, see the colours in daylight and let the right saree make itself known.'],
              ['02', 'Delivery, when you need it', 'Found your piece but cannot carry it home today? Delivery is available — ask us about your pin code.'],
              ['03', 'Prices that make sense', 'We keep the edit thoughtful and the pricing clear, so a beautiful saree stays within reach.'],
            ].map(([number, title, copy]) => (
              <div key={number} className="grid gap-5 border-b border-[#d9ccb9] py-7 sm:grid-cols-[60px_210px_1fr] sm:items-start">
                <span className="font-data text-[11px] text-[#c6a45e]">{number}</span>
                <h3 className="font-display text-2xl leading-tight">{title}</h3>
                <p className="max-w-[380px] text-sm leading-6 text-[#596270]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-20 bg-[#e9ddcb]">
        <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="font-data text-[10px] uppercase tracking-[.2em] text-[#93615b]">04 / Neighbourhood notes</p>
              <h2 className="mt-5 max-w-[620px] font-display text-5xl leading-[.98] tracking-[-.04em] sm:text-6xl">The nicest things people say are specific.</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl">4.8</span>
              <div>
                <span className="flex gap-0.5 text-[#b18435]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} fill="currentColor" />)}</span>
                <span className="mt-1 block font-data text-[9px] uppercase tracking-[.12em] text-[#727875]">26 reviews</span>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-[#d1c2ad] pb-4">
            {([
              ['all', 'All notes'],
              ['silks', 'Silk & variety'],
              ['value', 'Value for money'],
            ] as [ReviewFilter, string][]).map(([filter, label]) => (
              <button
                type="button"
                key={filter}
                onClick={() => setReviewFilter(filter)}
                className={`px-4 py-2 font-data text-[10px] uppercase tracking-[.14em] transition-colors ${reviewFilter === filter ? 'bg-[#93615b] text-[#f1eadf]' : 'text-[#727875] hover:text-[#213047]'}`}
                data-testid={`button-review-filter-${filter}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <article key={review.name} className="flex min-h-[260px] flex-col justify-between border border-[#d1c2ad] bg-[#f1eadf] p-6 transition-transform hover:-translate-y-1" data-testid={`card-review-${index}`}>
                <div>
                  <Quote size={24} className="text-[#c6a45e]" />
                  <p className="mt-6 font-display text-[23px] leading-[1.2] text-[#213047]">“{review.quote}”</p>
                </div>
                <div className="mt-8 flex items-end justify-between border-t border-[#d9ccb9] pt-4">
                  <div>
                    <p className="font-data text-[10px] uppercase tracking-[.13em]">{review.name}</p>
                    <p className="mt-1 text-xs text-[#727875]">{review.detail}</p>
                  </div>
                  <Check size={16} className="text-[#93615b]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="scroll-mt-20 bg-[#8f443d] text-[#f1eadf]">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1.05fr_.95fr] md:items-end lg:px-12 lg:py-32">
          <div>
            <p className="font-data text-[10px] uppercase tracking-[.2em] text-[#f0dca7]">05 / Come by</p>
            <h2 className="mt-5 max-w-[600px] font-display text-5xl leading-[.94] tracking-[-.04em] sm:text-7xl">The best way to know a saree is to meet it.</h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openDirections}
                className="group flex items-center gap-4 bg-[#f1eadf] px-5 py-3.5 font-data text-[10px] uppercase tracking-[.15em] text-[#213047] transition-colors hover:bg-[#c6a45e]"
                data-testid="button-get-directions"
              >
                <Compass size={16} />
                Get directions
                <ExternalLink size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="flex items-center gap-2 border border-[#f1eadf]/60 px-5 py-3.5 font-data text-[10px] uppercase tracking-[.15em] text-[#f1eadf] transition-colors hover:border-[#f1eadf] hover:bg-[#f1eadf]/10"
                data-testid="button-visit-enquiry"
              >
                <MessageCircle size={15} />
                Ask before you come
              </button>
            </div>
          </div>
          <div className="border-t border-[#c77468] pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div className="grid gap-6">
              <div className="flex gap-4">
                <MapPin size={19} className="mt-1 shrink-0 text-[#f0dca7]" />
                <div>
                  <p className="font-data text-[10px] uppercase tracking-[.14em] text-[#f0dca7]">Find us here</p>
                  <p className="mt-2 max-w-[290px] text-sm leading-6 text-[#f3dcd1]">1st main, 17th Cross Rd, Agrahara Layout, Bengaluru, Karnataka 560064</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3 size={19} className="mt-1 shrink-0 text-[#f0dca7]" />
                <div>
                  <p className="font-data text-[10px] uppercase tracking-[.14em] text-[#f0dca7]">Open every hour</p>
                  <p className="mt-2 text-sm leading-6 text-[#f3dcd1]">Open 24 hours · Delivery available</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone size={19} className="mt-1 shrink-0 text-[#f0dca7]" />
                <div>
                  <p className="font-data text-[10px] uppercase tracking-[.14em] text-[#f0dca7]">Call ahead</p>
                  <p className="mt-2 text-sm leading-6 text-[#f3dcd1]">Ask about today’s colours and new arrivals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#213047] text-[#f1eadf]">
        <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-10 border-b border-[#566174] pb-10 md:flex-row">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-[#c6a45e] font-data text-[11px] font-bold tracking-[-.1em] text-[#c6a45e]">RS</span>
                <span className="font-display text-2xl">R S Handlooms</span>
              </div>
              <p className="mt-5 max-w-[300px] text-sm leading-6 text-[#aeb8c0]">A neighbourhood silk house for beautiful sarees, fair prices and a little more time with the weave.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3">
              <div className="flex flex-col gap-3">
                <span className="font-data text-[9px] uppercase tracking-[.16em] text-[#c6a45e]">Explore</span>
                <a href="#collection" className="text-sm text-[#d9e0e2] hover:text-[#c6a45e]" data-testid="link-footer-collection">The edit</a>
                <a href="#story" className="text-sm text-[#d9e0e2] hover:text-[#c6a45e]" data-testid="link-footer-story">Our way</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-data text-[9px] uppercase tracking-[.16em] text-[#c6a45e]">Visit</span>
                <a href="#visit" className="text-sm text-[#d9e0e2] hover:text-[#c6a45e]" data-testid="link-footer-visit">Find us</a>
                <button type="button" onClick={() => setContactOpen(true)} className="text-left text-sm text-[#d9e0e2] hover:text-[#c6a45e]" data-testid="button-footer-enquiry">Enquire</button>
              </div>
              <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
                <span className="font-data text-[9px] uppercase tracking-[.16em] text-[#c6a45e]">Follow the thread</span>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#d9e0e2] hover:text-[#c6a45e]" data-testid="link-instagram"><Instagram size={15} /> Instagram</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 font-data text-[9px] uppercase tracking-[.13em] text-[#8694a0] sm:flex-row">
            <span>© {new Date().getFullYear()} R S Handlooms · Bengaluru</span>
            <span>Clothing store · Delivery available</span>
          </div>
        </div>
      </footer>

      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#172335]/65 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
          <div className="relative w-full max-w-[520px] bg-[#f1eadf] p-6 shadow-2xl sm:p-9">
            <button type="button" onClick={() => setContactOpen(false)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-[#596270] hover:text-[#213047]" aria-label="Close enquiry" data-testid="button-close-enquiry"><X size={18} /></button>
            <p className="font-data text-[10px] uppercase tracking-[.2em] text-[#93615b]">A quick note</p>
            <h2 id="enquiry-title" className="mt-4 font-display text-4xl leading-none">What are you looking for?</h2>
            {sent ? (
              <div className="mt-8 border border-[#d1c2ad] bg-[#e9ddcb] p-5">
                <Check className="text-[#93615b]" />
                <p className="mt-4 font-display text-2xl">Message noted.</p>
                <p className="mt-2 text-sm leading-6 text-[#596270]">We’ll keep your request ready when you visit R S Handlooms.</p>
              </div>
            ) : (
              <form onSubmit={submitEnquiry} className="mt-7 grid gap-4">
                <label className="grid gap-2 font-data text-[9px] uppercase tracking-[.15em] text-[#727875]">
                  Your name
                  <input required name="name" className="border border-[#d1c2ad] bg-[#f7f1e7] px-3 py-3 font-sans text-sm normal-case tracking-normal text-[#213047] outline-none focus:border-[#93615b]" placeholder="Tell us what to call you" data-testid="input-enquiry-name" />
                </label>
                <label className="grid gap-2 font-data text-[9px] uppercase tracking-[.15em] text-[#727875]">
                  What can we help with?
                  <textarea required name="message" rows={3} className="resize-none border border-[#d1c2ad] bg-[#f7f1e7] px-3 py-3 font-sans text-sm normal-case tracking-normal text-[#213047] outline-none focus:border-[#93615b]" placeholder="Silk for a wedding, everyday cotton, a gift..." data-testid="input-enquiry-message" />
                </label>
                <button type="submit" className="mt-2 flex items-center justify-center gap-3 bg-[#213047] px-5 py-3.5 font-data text-[10px] uppercase tracking-[.16em] text-[#f1eadf] transition-colors hover:bg-[#93615b]" data-testid="button-submit-enquiry">
                  <Send size={15} />
                  Send enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;