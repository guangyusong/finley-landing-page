import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from './components/AnimatedSection';
import Counter from './components/Counter';
import HeroParallax from './components/HeroParallax';
import MobileNav from './components/MobileNav';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-orange-50/30 via-orange-50/10 to-white text-slate-900 overflow-x-hidden">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,rgb(15,23,42)_1px,transparent_0)] bg-[size:40px_40px]"></div>

      <MobileNav />

      <section className="relative min-h-screen flex items-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection delay={0.2}>
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4 py-2 rounded-full text-sm font-medium text-orange-900 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                </span>
                Average approval in 3-5 days
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Your dream home,{' '}
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">simplified</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Get approved for your mortgage in days, not weeks. We combine modern technology with personalized support to make homeownership simple and fast.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" className="group relative px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full font-semibold text-lg overflow-hidden hover:shadow-xl hover:shadow-orange-600/25 hover:scale-105 transition-all text-center">
                  Start Your Application
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <Link href="/calculator" className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-full font-semibold text-lg hover:border-orange-600 hover:shadow-lg transition-all text-center">Calculate Payment</Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="font-medium">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="font-medium">Bank-level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span className="font-medium">No Hidden Fees</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <HeroParallax>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10">
                  <div className="aspect-[5/4] relative">
                    <Image src="/hero-home.webp" alt="Happy family with their new home" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-slate-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Approval Time</div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">3-5 Days</div>
                      </div>
                      <div className="text-5xl">⚡</div>
                    </div>
                  </div>
                </div>
              </HeroParallax>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3">
                  <Counter value={3} />
                </div>
                <div className="text-lg sm:text-xl text-slate-900 font-semibold mb-2">Days Average</div>
                <div className="text-sm sm:text-base text-slate-500">From application to approval</div>
              </div>
              <div>
                <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3">
                  $<Counter value={500} />M+
                </div>
                <div className="text-lg sm:text-xl text-slate-900 font-semibold mb-2">Mortgages Funded</div>
                <div className="text-sm sm:text-base text-slate-500">Helping families achieve their dreams</div>
              </div>
              <div>
                <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3">
                  4.<Counter value={9} />★
                </div>
                <div className="text-lg sm:text-xl text-slate-900 font-semibold mb-2">Customer Rating</div>
                <div className="text-sm sm:text-base text-slate-500">Trusted by thousands of homeowners</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="how-it-works" className="relative py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900">Simple, transparent process</h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">We&apos;ve streamlined the mortgage process to be fast and straightforward, without sacrificing quality or care.</p>
            </div>
          </AnimatedSection>

          <div className="space-y-24">
            <AnimatedSection delay={0.1}>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block bg-orange-100 text-orange-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">Step 1</div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Quick Application</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">Answer a few simple questions online. Our smart form guides you through each step with clear explanations. Most people complete it in under 10 minutes.</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">No jargon or confusing terms</span></li>
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Save and resume anytime</span></li>
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Bank-level security for your information</span></li>
                  </ul>
                </div>
                <div className="relative h-96 rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
                  <Image src="/step-application.webp" alt="Online mortgage application" fill className="object-cover" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative h-96 rounded-3xl border-2 border-orange-200 shadow-xl overflow-hidden">
                  <Image src="/step-analysis.webp" alt="Smart mortgage analysis" fill className="object-cover" />
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block bg-orange-100 text-orange-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">Step 2</div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Smart Analysis</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">Our technology quickly reviews your application and matches you with the best mortgage options. Behind the scenes, our expert team verifies everything.</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Compare rates from multiple lenders</span></li>
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Real-time status updates</span></li>
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Dedicated support team available</span></li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block bg-orange-100 text-orange-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">Step 3</div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Get Your Keys</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">Receive your approval in just days with competitive rates. We handle all the paperwork and coordinate with everyone involved to make closing day smooth.</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Clear breakdown of all costs</span></li>
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Digital document signing</span></li>
                    <li className="flex items-start gap-3"><svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg><span className="text-slate-600">Continued support after closing</span></li>
                  </ul>
                </div>
                <div className="relative h-96 rounded-3xl border-2 border-green-200 shadow-xl overflow-hidden">
                  <Image src="/step-keys.webp" alt="Receiving house keys" fill className="object-cover" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="why-us" className="relative py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900">Why families choose us</h2>
              <p className="text-lg sm:text-xl text-slate-600">We&apos;re faster without cutting corners</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Traditional Lenders</div>
                    <div className="text-3xl font-bold text-slate-900">4-6 Weeks</div>
                  </div>
                  <div className="text-5xl">🐌</div>
                </div>
                <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full w-full"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-orange-900 mb-1 font-semibold">Garrison</div>
                    <div className="text-3xl font-bold text-slate-900">3-5 Days</div>
                  </div>
                  <div className="text-5xl">⚡</div>
                </div>
                <div className="relative h-3 bg-orange-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="stories" className="relative py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900">What our customers say</h2>
              <p className="text-lg sm:text-xl text-slate-600">Hear from homeowners who trusted us with their biggest decision</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-slate-200">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-slate-700 mb-8 leading-relaxed font-medium">&quot;Applied on Monday, had my approval by Thursday. The team was incredibly helpful and kept me updated every step of the way. Couldn&apos;t be happier with our new home!&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center text-white font-bold text-xl">SM</div>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Miller</div>
                    <div className="text-sm text-slate-500">First-time homebuyer, Toronto</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-slate-200">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-slate-700 mb-8 leading-relaxed font-medium">&quot;After struggling with two other lenders, Garrison made it so simple. Clear communication, competitive rates, and incredibly fast. This is how mortgages should work.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center text-white font-bold text-xl">JC</div>
                  <div>
                    <div className="font-semibold text-slate-900">James Chen</div>
                    <div className="text-sm text-slate-500">Refinancing, Mississauga</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-32 px-6 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">Ready to start your journey home?</h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">Join thousands of families who chose the faster, simpler path to homeownership.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="px-8 sm:px-10 py-4 sm:py-5 bg-white text-orange-700 rounded-full font-bold text-lg sm:text-xl hover:shadow-2xl hover:scale-105 transition-all inline-block">Start Your Application</a>
              <a href="mailto:mortgages@garrisonco.ca" className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg sm:text-xl hover:bg-white/10 transition-all inline-block">Talk to an Expert</a>
            </div>
            <div className="mt-8 text-white/80 text-sm">Free consultation • No commitment • Get answers in 24 hours</div>
            <div className="mt-2 text-white/80 text-sm">Or call <a href="tel:+16475582300" className="underline hover:text-white">647 558 2300</a></div>
          </AnimatedSection>
        </div>
      </section>

      <section id="contact" className="relative py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">Get Started Today</h2>
              <p className="text-lg text-slate-600">Fill out the form below and we&apos;ll be in touch within 24 hours</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>

      <footer className="relative bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="relative h-8 w-auto mb-4">
                <Image src="/garrison-logo-light.png" alt="Garrison Capital" width={140} height={32} className="h-full w-auto" />
              </div>
              <p className="text-sm leading-relaxed">Making homeownership accessible through fast, transparent, and caring mortgage solutions.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/calculator" className="hover:text-white transition-colors">Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
                <li><Link href="/licenses" className="hover:text-white transition-colors">Licenses</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Garrison. License #13362. All rights reserved.</p>
            <p className="mt-2 text-slate-500">Licensed to operate in Ontario, Canada.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

